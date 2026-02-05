"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Vertex shader
const vertexShaderSource = `#version 300 es
in vec4 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = a_position;
  v_texCoord = a_position.xy * 0.5 + 0.5;
}`;

// Fragment shader for ethereal flowing background
// Features: two main marble wisps, flowing veined texture, saturation variation, framing effect
const fragmentShaderSource = `#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform float u_noiseScale;
uniform float u_flowSpeed;
uniform float u_edgeFade;

// Hash for dithering
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                          dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// FBM for marble texture
float fbm(vec2 p, float time) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for (int i = 0; i < 6; i++) {
    value += amplitude * snoise(p * frequency + vec2(0.0, time * 0.02));
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  
  return value;
}

// Domain warping for marble effect
vec2 warp(vec2 p, float time) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0), time),
    fbm(p + vec2(5.2, 1.3), time)
  );
  
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2), time),
    fbm(p + 4.0 * q + vec2(8.3, 2.8), time)
  );
  
  return r;
}

// Marble veining pattern
float marble(vec2 p, float time) {
  vec2 w = warp(p * 0.5, time);
  float n = fbm(p + 2.0 * w, time);
  
  // Create veining effect
  float veins = sin((p.x + p.y * 0.5 + n * 3.0) * 3.14159);
  veins = pow(abs(veins), 0.3);
  
  return mix(n * 0.5 + 0.5, veins, 0.6);
}

// Bayer dithering
float bayerDither(vec2 pos) {
  vec2 p = mod(pos, 8.0);
  float a = mod(p.x + p.y * 2.0, 4.0);
  float b = mod(p.x * 2.0 + p.y, 4.0);
  return (a * 4.0 + b) / 64.0;
}

void main() {
  vec2 uv = v_texCoord;
  float aspect = u_resolution.x / u_resolution.y;
  
  float time = u_time * u_flowSpeed;
  
  // Pixelation for dithered texture
  float pixelSize = 2.0;
  vec2 pixelCoord = uv * u_resolution;
  vec2 pixelUV = floor(pixelCoord / pixelSize) * pixelSize / u_resolution;
  vec2 ditherCoord = floor(pixelCoord / pixelSize);
  
  // Scale for noise
  vec2 noiseUV = vec2(pixelUV.x * aspect, pixelUV.y) * u_noiseScale;
  
  // === LEFT WISP - Curving ribbon that frames the left side ===
  float leftWarp = fbm(noiseUV * 1.2 + vec2(time * 0.02, 0.0), time);
  float leftWarp2 = fbm(noiseUV * 2.0 + vec2(-1.0, time * 0.015), time);
  
  // Main ribbon - curves inward from left edge, flows vertically
  float leftCurveBase = 0.12 + sin(pixelUV.y * 2.5) * 0.08 + leftWarp * 0.1;
  float leftX = pixelUV.x - leftCurveBase;
  
  // Create flowing ribbon shape
  float leftRibbonInner = smoothstep(-0.02, 0.15, leftX);
  float leftRibbonOuter = smoothstep(0.35, 0.1, leftX);
  float leftRibbon = leftRibbonInner * leftRibbonOuter;
  
  // Add multiple thin vertical streaming lines within ribbon
  float leftStream1 = sin(pixelUV.y * 15.0 + leftWarp * 6.0 + pixelUV.x * 10.0) * 0.5 + 0.5;
  float leftStream2 = sin(pixelUV.y * 22.0 + leftWarp2 * 4.0 - pixelUV.x * 7.0) * 0.5 + 0.5;
  float leftStream3 = sin(pixelUV.y * 28.0 + leftWarp * 3.0 + pixelUV.x * 12.0) * 0.5 + 0.5;
  float leftStream4 = sin(pixelUV.y * 35.0 - leftWarp2 * 5.0 + pixelUV.x * 15.0) * 0.5 + 0.5;
  float leftStreams = smoothstep(0.7, 0.96, leftStream1) * 0.6 + 
                      smoothstep(0.72, 0.95, leftStream2) * 0.5 +
                      smoothstep(0.75, 0.97, leftStream3) * 0.4 +
                      smoothstep(0.78, 0.98, leftStream4) * 0.3;
  
  // Marble texture
  float leftMarble = marble(noiseUV + vec2(-2.0, 0.0), time);
  float leftVein = marble(noiseUV * 1.5 + vec2(-1.0, 1.0), time * 0.8);
  
  // Flowing tendrils curving around
  float leftTendril1 = sin(pixelUV.y * 8.0 + leftWarp * 4.0 + pixelUV.x * 12.0) * 0.5 + 0.5;
  leftTendril1 = smoothstep(0.72, 0.98, leftTendril1) * pow(max(0.0, 0.3 - pixelUV.x), 1.3);
  
  float leftTendril2 = sin(pixelUV.y * 14.0 + leftVein * 3.0 - pixelUV.x * 6.0 + time * 0.3) * 0.5 + 0.5;
  leftTendril2 = smoothstep(0.75, 0.98, leftTendril2) * pow(max(0.0, 0.25 - pixelUV.x), 1.5);
  
  // Combine left wisp
  float leftBase = leftRibbon * (0.6 + leftMarble * 0.4 + leftStreams * 0.3);
  float leftTendrils = leftTendril1 * 2.5 + leftTendril2 * 2.0;
  float leftIntensity = leftBase + leftTendrils * 0.5;
  leftIntensity *= smoothstep(0.7, 0.0, pixelUV.x); // Fade toward center
  
  // === RIGHT WISP - Curving ribbon that frames the right side ===
  float rightWarp = fbm(noiseUV * 1.2 + vec2(5.0, time * 0.02), time);
  float rightWarp2 = fbm(noiseUV * 2.0 + vec2(6.0, time * 0.015), time);
  
  // Mirror the curve for right side
  float rightCurveBase = 0.12 + sin((1.0 - pixelUV.y) * 2.5) * 0.08 + rightWarp * 0.1;
  float rightX = (1.0 - pixelUV.x) - rightCurveBase;
  
  // Create flowing ribbon shape
  float rightRibbonInner = smoothstep(-0.02, 0.15, rightX);
  float rightRibbonOuter = smoothstep(0.35, 0.1, rightX);
  float rightRibbon = rightRibbonInner * rightRibbonOuter;
  
  // Add multiple thin vertical streaming lines
  float rightStream1 = sin((1.0 - pixelUV.y) * 15.0 + rightWarp * 6.0 + (1.0 - pixelUV.x) * 10.0) * 0.5 + 0.5;
  float rightStream2 = sin((1.0 - pixelUV.y) * 21.0 + rightWarp2 * 4.0 - (1.0 - pixelUV.x) * 7.0) * 0.5 + 0.5;
  float rightStream3 = sin((1.0 - pixelUV.y) * 27.0 + rightWarp * 3.0 + (1.0 - pixelUV.x) * 12.0) * 0.5 + 0.5;
  float rightStream4 = sin((1.0 - pixelUV.y) * 34.0 - rightWarp2 * 5.0 + (1.0 - pixelUV.x) * 14.0) * 0.5 + 0.5;
  float rightStreams = smoothstep(0.7, 0.96, rightStream1) * 0.6 + 
                       smoothstep(0.72, 0.95, rightStream2) * 0.5 +
                       smoothstep(0.75, 0.97, rightStream3) * 0.4 +
                       smoothstep(0.78, 0.98, rightStream4) * 0.3;
  
  // Marble texture
  float rightMarble = marble(noiseUV + vec2(3.0, 1.0), time * 0.9);
  float rightVein = marble(noiseUV * 1.4 + vec2(4.0, -1.0), time * 0.7);
  
  // Flowing tendrils
  float rightTendril1 = sin((1.0 - pixelUV.y) * 8.0 + rightWarp * 4.0 + (1.0 - pixelUV.x) * 12.0) * 0.5 + 0.5;
  rightTendril1 = smoothstep(0.72, 0.98, rightTendril1) * pow(max(0.0, pixelUV.x - 0.7), 1.3);
  
  float rightTendril2 = sin((1.0 - pixelUV.y) * 13.0 + rightVein * 3.0 - (1.0 - pixelUV.x) * 6.0 + time * 0.25) * 0.5 + 0.5;
  rightTendril2 = smoothstep(0.75, 0.98, rightTendril2) * pow(max(0.0, pixelUV.x - 0.75), 1.5);
  
  // Combine right wisp
  float rightBase = rightRibbon * (0.6 + rightMarble * 0.4 + rightStreams * 0.3);
  float rightTendrils = rightTendril1 * 2.5 + rightTendril2 * 2.0;
  float rightIntensity = rightBase + rightTendrils * 0.5;
  rightIntensity *= smoothstep(0.3, 1.0, pixelUV.x); // Fade toward center
  
  // === FRAME MASK - keep center clear ===
  vec2 center = pixelUV - 0.5;
  center.x *= aspect * 0.6;
  float centerDist = length(center);
  float frameMask = smoothstep(0.08, u_edgeFade, centerDist);
  float innerClear = smoothstep(0.28, 0.1, centerDist);
  
  leftIntensity *= frameMask;
  rightIntensity *= frameMask;
  
  // === DITHERING for pixelated texture (more pronounced) ===
  float dither = bayerDither(ditherCoord);
  float ditherNoise = hash(ditherCoord * 0.25) * 0.35 + dither * 0.65;
  float ditherFine = hash(ditherCoord * 1.5) * 0.3 + bayerDither(ditherCoord * 2.0) * 0.7;
  
  // Create multiple layers of dithered dots
  float leftDot1 = step(dither * 0.25, leftIntensity * 0.45);
  float leftDot2 = step(ditherNoise * 0.35, leftIntensity * 0.3);
  float leftDot3 = step(ditherFine * 0.4, leftIntensity * 0.55);
  float leftDithered = max(max(leftDot1, leftDot2 * 0.8), leftDot3 * 0.6);
  
  // Soft base + dithered overlay
  float leftSoft = leftIntensity * 0.25;
  float leftFinal = leftSoft + leftDithered * leftIntensity * 0.75;
  
  float rightDot1 = step(dither * 0.25, rightIntensity * 0.45);
  float rightDot2 = step(ditherNoise * 0.35, rightIntensity * 0.3);
  float rightDot3 = step(ditherFine * 0.4, rightIntensity * 0.55);
  float rightDithered = max(max(rightDot1, rightDot2 * 0.8), rightDot3 * 0.6);
  
  float rightSoft = rightIntensity * 0.25;
  float rightFinal = rightSoft + rightDithered * rightIntensity * 0.75;
  
  // === SATURATION VARIATION - concentrated in dithered areas ===
  float leftSat = 0.1 + leftDithered * 0.6 + leftFinal * 0.8 + smoothstep(0.45, 0.9, leftVein) * 0.5;
  float rightSat = 0.1 + rightDithered * 0.6 + rightFinal * 0.8 + smoothstep(0.45, 0.9, rightVein) * 0.5;
  leftSat = clamp(leftSat, 0.0, 1.0);
  rightSat = clamp(rightSat, 0.0, 1.0);
  
  // === COLORS ===
  vec3 color = vec3(1.0);
  
  // Left wisp - blue/cyan spectrum
  vec3 leftPale = mix(vec3(1.0), vec3(0.82, 0.9, 0.97), 0.2);
  vec3 leftMid = mix(vec3(1.0), vec3(0.5, 0.72, 0.94), 0.55);
  vec3 leftVivid = vec3(0.3, 0.55, 0.9);
  vec3 leftAccent = vec3(0.4, 0.5, 0.82); // Purple accent for some spots
  
  vec3 leftColor = mix(leftPale, leftMid, pow(leftSat, 0.7));
  leftColor = mix(leftColor, leftVivid, smoothstep(0.5, 0.95, leftSat) * leftDithered);
  // Add purple accent in some spots
  leftColor = mix(leftColor, leftAccent, smoothstep(0.6, 0.95, leftVein) * leftDithered * 0.4);
  
  // Right wisp - purple/lavender spectrum
  vec3 rightPale = mix(vec3(1.0), vec3(0.88, 0.85, 0.96), 0.2);
  vec3 rightMid = mix(vec3(1.0), vec3(0.65, 0.52, 0.88), 0.55);
  vec3 rightVivid = vec3(0.48, 0.35, 0.82);
  vec3 rightAccent = vec3(0.4, 0.55, 0.85); // Blue accent for some spots
  
  vec3 rightColor = mix(rightPale, rightMid, pow(rightSat, 0.7));
  rightColor = mix(rightColor, rightVivid, smoothstep(0.5, 0.95, rightSat) * rightDithered);
  // Add blue accent in some spots
  rightColor = mix(rightColor, rightAccent, smoothstep(0.55, 0.9, rightMarble) * rightDithered * 0.35);
  
  // === COMBINE ===
  color = mix(color, leftColor, leftFinal * 0.92);
  color = mix(color, rightColor, rightFinal * 0.92);
  
  // Ensure center stays white
  color = mix(color, vec3(1.0), innerClear);
  
  // Very subtle vignette
  float vignette = 1.0 - centerDist * 0.03;
  color *= vignette;
  
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

// Convert hex color to RGB values (0-1 range)
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0.6, 0.7, 0.9]; // default blue
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

export interface ShaderBackgroundProps {
  /** Primary color (appears on left side) - hex format */
  color1?: string;
  /** Secondary color (appears on right side) - hex format */
  color2?: string;
  /** Tertiary color (subtle overall tint) - hex format */
  color3?: string;
  /** Scale of the noise pattern (default: 2.0) */
  noiseScale?: number;
  /** Speed of the flowing animation (default: 0.15) */
  flowSpeed?: number;
  /** How far the colors extend from edges (0-1, default: 0.7) */
  edgeFade?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Children to render on top of the background */
  children?: React.ReactNode;
}

export function ShaderBackground({
  color1 = "#5a9fd4", // Blue (left wisp)
  color2 = "#8b7cb8", // Purple/lavender (right wisp)
  color3 = "#c8ddf0", // Pale blue accent
  noiseScale = 1.8,
  flowSpeed = 0.08,
  edgeFade = 0.4,
  className,
  style,
  children,
}: ShaderBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const glRef = React.useRef<WebGL2RenderingContext | null>(null);
  const programRef = React.useRef<WebGLProgram | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const uniformLocationsRef = React.useRef<Record<string, WebGLUniformLocation | null>>({});

  // Convert colors
  const rgb1 = React.useMemo(() => hexToRgb(color1), [color1]);
  const rgb2 = React.useMemo(() => hexToRgb(color2), [color2]);
  const rgb3 = React.useMemo(() => hexToRgb(color3), [color3]);

  // Initialize WebGL
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: true,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.error("WebGL2 not supported");
      return;
    }

    glRef.current = gl;

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    programRef.current = program;

    // Setup position attribute
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    uniformLocationsRef.current = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_color1: gl.getUniformLocation(program, "u_color1"),
      u_color2: gl.getUniformLocation(program, "u_color2"),
      u_color3: gl.getUniformLocation(program, "u_color3"),
      u_noiseScale: gl.getUniformLocation(program, "u_noiseScale"),
      u_flowSpeed: gl.getUniformLocation(program, "u_flowSpeed"),
      u_edgeFade: gl.getUniformLocation(program, "u_edgeFade"),
    };

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, []);

  // Handle resize
  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;

      const gl = glRef.current;
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Render loop
  React.useEffect(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const locations = uniformLocationsRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    let startTime = performance.now();

    const render = () => {
      const currentTime = (performance.now() - startTime) * 0.001;

      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      // Set uniforms
      if (locations.u_time) {
        gl.uniform1f(locations.u_time, currentTime);
      }
      if (locations.u_resolution) {
        gl.uniform2f(locations.u_resolution, canvas.width, canvas.height);
      }
      if (locations.u_color1) {
        gl.uniform3fv(locations.u_color1, rgb1);
      }
      if (locations.u_color2) {
        gl.uniform3fv(locations.u_color2, rgb2);
      }
      if (locations.u_color3) {
        gl.uniform3fv(locations.u_color3, rgb3);
      }
      if (locations.u_noiseScale) {
        gl.uniform1f(locations.u_noiseScale, noiseScale);
      }
      if (locations.u_flowSpeed) {
        gl.uniform1f(locations.u_flowSpeed, flowSpeed);
      }
      if (locations.u_edgeFade) {
        gl.uniform1f(locations.u_edgeFade, edgeFade);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [rgb1, rgb2, rgb3, noiseScale, flowSpeed, edgeFade]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
