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
  
  // Smooth UV for smoke layer (no pixelation)
  vec2 smoothNoiseUV = vec2(uv.x * aspect, uv.y) * u_noiseScale;
  
  // Pixelated UV for dither layer only
  float pixelSize = 2.0;
  vec2 pixelCoord = uv * u_resolution;
  vec2 pixelUV = floor(pixelCoord / pixelSize) * pixelSize / u_resolution;
  vec2 ditherCoord = floor(pixelCoord / pixelSize);
  vec2 ditherNoiseUV = vec2(pixelUV.x * aspect, pixelUV.y) * u_noiseScale;
  
  // Noise for smoke (smooth)
  float leftSmokeWarp = fbm(smoothNoiseUV * 1.0 + vec2(time * 0.02, 0.0), time);
  float leftSmokeWarp2 = fbm(smoothNoiseUV * 1.8 + vec2(-1.0, time * 0.015), time);
  float rightSmokeWarp = fbm(smoothNoiseUV * 1.0 + vec2(5.0, time * 0.02), time);
  float rightSmokeWarp2 = fbm(smoothNoiseUV * 1.8 + vec2(6.0, time * 0.015), time);
  
  // Marble for smoke (smooth)
  float leftSmokeMarble = marble(smoothNoiseUV + vec2(-2.0, 0.0), time);
  float rightSmokeMarble = marble(smoothNoiseUV + vec2(3.0, 1.0), time * 0.9);
  
  // Noise for dither layer (pixelated)
  float leftWarp = fbm(ditherNoiseUV * 1.2 + vec2(time * 0.02, 0.0), time);
  float leftWarp2 = fbm(ditherNoiseUV * 2.0 + vec2(-1.0, time * 0.015), time);
  float rightWarp = fbm(ditherNoiseUV * 1.2 + vec2(5.0, time * 0.02), time);
  float rightWarp2 = fbm(ditherNoiseUV * 2.0 + vec2(6.0, time * 0.015), time);
  
  // Marble textures for dither detail (pixelated)
  float leftMarble = marble(ditherNoiseUV + vec2(-2.0, 0.0), time);
  float leftVein = marble(ditherNoiseUV * 1.5 + vec2(-1.0, 1.0), time * 0.8);
  float rightMarble = marble(ditherNoiseUV + vec2(3.0, 1.0), time * 0.9);
  float rightVein = marble(ditherNoiseUV * 1.4 + vec2(4.0, -1.0), time * 0.7);
  
  // ============================================================
  // LAYER 1: BASE SMOKE LAYER (smooth, soft, pale, flowing wisps)
  // Uses smooth uv coordinates - NO pixelation
  // ============================================================
  
  // Left smoke - soft flowing shape
  float leftSmokeCurve = 0.15 + sin(uv.y * 2.2 + leftSmokeWarp * 0.6) * 0.1;
  float leftSmokeX = uv.x - leftSmokeCurve;
  float leftSmoke = smoothstep(-0.05, 0.2, leftSmokeX) * smoothstep(0.5, 0.15, leftSmokeX);
  leftSmoke *= 0.5 + leftSmokeMarble * 0.5;
  leftSmoke *= smoothstep(0.65, 0.0, uv.x);
  
  // Add smoke tendrils (smooth)
  float leftSmokeTendril1 = sin(uv.y * 6.0 + leftSmokeWarp * 3.0 + uv.x * 8.0) * 0.5 + 0.5;
  leftSmokeTendril1 = smoothstep(0.55, 0.85, leftSmokeTendril1) * pow(max(0.0, 0.35 - uv.x), 1.0);
  
  float leftSmokeTendril2 = sin(uv.y * 4.0 + leftSmokeWarp2 * 2.5 - uv.x * 5.0) * 0.5 + 0.5;
  leftSmokeTendril2 = smoothstep(0.5, 0.8, leftSmokeTendril2) * pow(max(0.0, 0.4 - uv.x), 0.8);
  
  float leftSmokeIntensity = leftSmoke + leftSmokeTendril1 * 0.6 + leftSmokeTendril2 * 0.5;
  
  // Right smoke (smooth)
  float rightSmokeCurve = 0.15 + sin((1.0 - uv.y) * 2.2 + rightSmokeWarp * 0.6) * 0.1;
  float rightSmokeX = (1.0 - uv.x) - rightSmokeCurve;
  float rightSmoke = smoothstep(-0.05, 0.2, rightSmokeX) * smoothstep(0.5, 0.15, rightSmokeX);
  rightSmoke *= 0.5 + rightSmokeMarble * 0.5;
  rightSmoke *= smoothstep(0.35, 1.0, uv.x);
  
  // Right smoke tendrils (smooth)
  float rightSmokeTendril1 = sin((1.0 - uv.y) * 6.0 + rightSmokeWarp * 3.0 + (1.0 - uv.x) * 8.0) * 0.5 + 0.5;
  rightSmokeTendril1 = smoothstep(0.55, 0.85, rightSmokeTendril1) * pow(max(0.0, uv.x - 0.65), 1.0);
  
  float rightSmokeTendril2 = sin((1.0 - uv.y) * 4.0 + rightSmokeWarp2 * 2.5 - (1.0 - uv.x) * 5.0) * 0.5 + 0.5;
  rightSmokeTendril2 = smoothstep(0.5, 0.8, rightSmokeTendril2) * pow(max(0.0, uv.x - 0.6), 0.8);
  
  float rightSmokeIntensity = rightSmoke + rightSmokeTendril1 * 0.6 + rightSmokeTendril2 * 0.5;
  
  // ============================================================
  // LAYER 2: COLORFUL DITHER LAYER (concentrated, saturated dots)
  // ============================================================
  
  // Left dither pattern - thinner, more concentrated streams
  float leftDitherCurve = 0.1 + sin(pixelUV.y * 3.5 + leftWarp * 1.2) * 0.12 + leftWarp2 * 0.08;
  float leftDitherX = pixelUV.x - leftDitherCurve;
  float leftDitherRibbon = smoothstep(-0.02, 0.12, leftDitherX) * smoothstep(0.32, 0.08, leftDitherX);
  
  // Thin streaming lines for dither
  float leftLine1 = sin(pixelUV.y * 18.0 + leftWarp * 7.0 + pixelUV.x * 12.0) * 0.5 + 0.5;
  float leftLine2 = sin(pixelUV.y * 25.0 + leftWarp2 * 5.0 - pixelUV.x * 8.0) * 0.5 + 0.5;
  float leftLine3 = sin(pixelUV.y * 32.0 + leftVein * 4.0 + pixelUV.x * 15.0) * 0.5 + 0.5;
  float leftLine4 = sin(pixelUV.y * 12.0 + leftMarble * 6.0 - pixelUV.x * 6.0) * 0.5 + 0.5;
  
  float leftLines = smoothstep(0.72, 0.97, leftLine1) * 0.7 +
                    smoothstep(0.75, 0.98, leftLine2) * 0.6 +
                    smoothstep(0.78, 0.99, leftLine3) * 0.5 +
                    smoothstep(0.68, 0.92, leftLine4) * 0.4;
  
  float leftDitherIntensity = leftDitherRibbon * (0.4 + leftLines * 0.8);
  leftDitherIntensity *= smoothstep(0.55, 0.0, pixelUV.x);
  
  // Add concentrated spots
  float leftSpot = smoothstep(0.6, 0.95, leftVein) * pow(max(0.0, 0.25 - pixelUV.x), 1.2);
  leftDitherIntensity += leftSpot * 0.8;
  
  // Right dither pattern
  float rightDitherCurve = 0.1 + sin((1.0 - pixelUV.y) * 3.5 + rightWarp * 1.2) * 0.12 + rightWarp2 * 0.08;
  float rightDitherX = (1.0 - pixelUV.x) - rightDitherCurve;
  float rightDitherRibbon = smoothstep(-0.02, 0.12, rightDitherX) * smoothstep(0.32, 0.08, rightDitherX);
  
  // Thin streaming lines for right dither
  float rightLine1 = sin((1.0 - pixelUV.y) * 18.0 + rightWarp * 7.0 + (1.0 - pixelUV.x) * 12.0) * 0.5 + 0.5;
  float rightLine2 = sin((1.0 - pixelUV.y) * 24.0 + rightWarp2 * 5.0 - (1.0 - pixelUV.x) * 8.0) * 0.5 + 0.5;
  float rightLine3 = sin((1.0 - pixelUV.y) * 31.0 + rightVein * 4.0 + (1.0 - pixelUV.x) * 15.0) * 0.5 + 0.5;
  float rightLine4 = sin((1.0 - pixelUV.y) * 11.0 + rightMarble * 6.0 - (1.0 - pixelUV.x) * 6.0) * 0.5 + 0.5;
  
  float rightLines = smoothstep(0.72, 0.97, rightLine1) * 0.7 +
                     smoothstep(0.75, 0.98, rightLine2) * 0.6 +
                     smoothstep(0.78, 0.99, rightLine3) * 0.5 +
                     smoothstep(0.68, 0.92, rightLine4) * 0.4;
  
  float rightDitherIntensity = rightDitherRibbon * (0.4 + rightLines * 0.8);
  rightDitherIntensity *= smoothstep(0.45, 1.0, pixelUV.x);
  
  // Add concentrated spots
  float rightSpot = smoothstep(0.6, 0.95, rightVein) * pow(max(0.0, pixelUV.x - 0.75), 1.2);
  rightDitherIntensity += rightSpot * 0.8;
  
  // ============================================================
  // FRAME MASK - keep center clear
  // ============================================================
  // Use smooth uv for frame mask
  vec2 center = uv - 0.5;
  center.x *= aspect * 0.6;
  float centerDist = length(center);
  float frameMask = smoothstep(0.08, u_edgeFade, centerDist);
  float innerClear = smoothstep(0.25, 0.08, centerDist);
  
  // Apply frame mask to both layers
  leftSmokeIntensity *= frameMask;
  rightSmokeIntensity *= frameMask;
  leftDitherIntensity *= frameMask;
  rightDitherIntensity *= frameMask;
  
  // ============================================================
  // APPLY DITHERING to the dither layer
  // ============================================================
  float dither = bayerDither(ditherCoord);
  float ditherNoise = hash(ditherCoord * 0.2) * 0.3 + dither * 0.7;
  float ditherFine = hash(ditherCoord * 1.8) * 0.25 + bayerDither(ditherCoord * 2.5) * 0.75;
  
  // Multiple dither thresholds for varied dot density
  float leftDot1 = step(dither * 0.2, leftDitherIntensity * 0.4);
  float leftDot2 = step(ditherNoise * 0.3, leftDitherIntensity * 0.28);
  float leftDot3 = step(ditherFine * 0.35, leftDitherIntensity * 0.5);
  float leftDithered = max(max(leftDot1, leftDot2 * 0.85), leftDot3 * 0.7);
  
  float rightDot1 = step(dither * 0.2, rightDitherIntensity * 0.4);
  float rightDot2 = step(ditherNoise * 0.3, rightDitherIntensity * 0.28);
  float rightDot3 = step(ditherFine * 0.35, rightDitherIntensity * 0.5);
  float rightDithered = max(max(rightDot1, rightDot2 * 0.85), rightDot3 * 0.7);
  
  // ============================================================
  // COLORS - separate for each layer
  // ============================================================
  vec3 color = vec3(1.0);
  
  // --- LAYER 1: Smoke colors (very pale, subtle) ---
  vec3 leftSmokeColor = mix(vec3(1.0), vec3(0.88, 0.92, 0.98), 0.15); // Very pale blue tint
  vec3 rightSmokeColor = mix(vec3(1.0), vec3(0.92, 0.9, 0.96), 0.15); // Very pale lavender tint
  
  // Apply smoke layer first (base)
  color = mix(color, leftSmokeColor, leftSmokeIntensity * 0.5);
  color = mix(color, rightSmokeColor, rightSmokeIntensity * 0.5);
  
  // --- LAYER 2: Dither colors (more saturated, concentrated) ---
  // Saturation varies based on intensity and vein patterns
  float leftSat = 0.3 + leftDithered * 0.5 + smoothstep(0.5, 0.9, leftVein) * 0.3;
  float rightSat = 0.3 + rightDithered * 0.5 + smoothstep(0.5, 0.9, rightVein) * 0.3;
  
  // Left dither - blue/cyan with purple accents
  vec3 leftDitherPale = mix(vec3(1.0), vec3(0.7, 0.85, 0.98), 0.35);
  vec3 leftDitherMid = mix(vec3(1.0), vec3(0.45, 0.68, 0.94), 0.65);
  vec3 leftDitherVivid = vec3(0.28, 0.52, 0.9);
  vec3 leftDitherAccent = vec3(0.45, 0.45, 0.85); // Purple accent
  
  vec3 leftDitherColor = mix(leftDitherPale, leftDitherMid, leftSat);
  leftDitherColor = mix(leftDitherColor, leftDitherVivid, smoothstep(0.6, 1.0, leftSat) * leftDithered);
  leftDitherColor = mix(leftDitherColor, leftDitherAccent, smoothstep(0.65, 0.95, leftVein) * leftDithered * 0.5);
  
  // Right dither - purple/lavender with blue accents
  vec3 rightDitherPale = mix(vec3(1.0), vec3(0.85, 0.78, 0.96), 0.35);
  vec3 rightDitherMid = mix(vec3(1.0), vec3(0.62, 0.48, 0.88), 0.65);
  vec3 rightDitherVivid = vec3(0.45, 0.3, 0.82);
  vec3 rightDitherAccent = vec3(0.38, 0.52, 0.88); // Blue accent
  
  vec3 rightDitherColor = mix(rightDitherPale, rightDitherMid, rightSat);
  rightDitherColor = mix(rightDitherColor, rightDitherVivid, smoothstep(0.6, 1.0, rightSat) * rightDithered);
  rightDitherColor = mix(rightDitherColor, rightDitherAccent, smoothstep(0.6, 0.92, rightMarble) * rightDithered * 0.45);
  
  // Apply dither layer on top of smoke
  color = mix(color, leftDitherColor, leftDithered * leftDitherIntensity * 0.95);
  color = mix(color, rightDitherColor, rightDithered * rightDitherIntensity * 0.95);
  
  // Ensure center stays white
  color = mix(color, vec3(1.0), innerClear);
  
  // Very subtle vignette
  float vignette = 1.0 - centerDist * 0.025;
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
