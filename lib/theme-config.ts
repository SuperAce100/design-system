// ============================================================================
// Theme Configuration
// Types, color data, and generation logic for the theming system.
// ============================================================================

// --- Types -------------------------------------------------------------------

export type NeutralScale = "gray" | "stone" | "neutral" | "zinc" | "slate" | "mauve" | "mist" | "olive" | "taupe";

export type PrimaryColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "gray"
  | "stone"
  | "neutral"
  | "zinc"
  | "slate"
  | "mauve"
  | "mist"
  | "olive"
  | "taupe";

export type BackgroundShade = 0 | 1 | 2;
export type FontOption =
  | "system"
  | "geist"
  | "manrope"
  | "hedvig-letters-serif"
  | "schibsted-grotesk"
  | "jetbrains-mono";

export type ThemeConfig = {
  neutral: NeutralScale;
  primary: PrimaryColor;
  radius: number; // rem value: 0 | 0.3 | 0.5 | 0.75 | 1.0
  backgroundShade: BackgroundShade; // 0=white, 1=neutral-50, 2=neutral-100
  shadowDepth: number; // 0–100 slider (controls how dark the shadow is)
  shadowOpacity: number; // 0–100 slider (controls how transparent the shadow is)
  headingFont: FontOption;
  bodyFont: FontOption;
  /** Optional custom primary color as an oklch string (e.g. "oklch(0.6 0.2 250)"). Overrides `primary` when set. */
  customPrimary?: string;
};

export const RADIUS_PRESETS = [0, 0.3, 0.5, 0.75, 1.0] as const;

export const BACKGROUND_PRESETS: { value: BackgroundShade; label: string }[] = [
  { value: 0, label: "White" },
  { value: 1, label: "50" },
  { value: 2, label: "100" },
];

export const FONT_OPTIONS: FontOption[] = [
  "system",
  "geist",
  "manrope",
  "hedvig-letters-serif",
  "schibsted-grotesk",
  "jetbrains-mono",
];

export const FONT_OPTION_LABELS: Record<FontOption, string> = {
  system: "Default System Font",
  geist: "Geist",
  manrope: "Manrope",
  "hedvig-letters-serif": "Hedvig Letters Serif",
  "schibsted-grotesk": "Schibsted Grotesk",
  "jetbrains-mono": "JetBrains Mono",
};

/** Returns display colors for the three background shade options based on the current neutral. */
export function getBackgroundDisplayColors(neutral: NeutralScale): Record<BackgroundShade, string> {
  const n = neutralScales[neutral];
  return {
    0: "oklch(1 0 0)", // white
    1: fmt(n[50]),
    2: fmt(n[100]),
  };
}

export const DEFAULT_CONFIG: ThemeConfig = {
  neutral: "neutral",
  primary: "sky",
  radius: 0.625,
  backgroundShade: 0,
  shadowDepth: 50,
  shadowOpacity: 20,
  headingFont: "system",
  bodyFont: "system",
};

export const NEUTRAL_LABELS: Record<NeutralScale, string> = {
  gray: "Gray",
  stone: "Stone",
  neutral: "Neutral",
  zinc: "Zinc",
  slate: "Slate",
  mauve: "Mauve",
  mist: "Mist",
  olive: "Olive",
  taupe: "Taupe",
};

export const PRIMARY_LABELS: Record<PrimaryColor, string> = {
  red: "Red",
  orange: "Orange",
  amber: "Amber",
  yellow: "Yellow",
  lime: "Lime",
  green: "Green",
  emerald: "Emerald",
  teal: "Teal",
  cyan: "Cyan",
  sky: "Sky",
  blue: "Blue",
  indigo: "Indigo",
  violet: "Violet",
  purple: "Purple",
  fuchsia: "Fuchsia",
  pink: "Pink",
  rose: "Rose",
  gray: "Gray",
  stone: "Stone",
  neutral: "Neutral",
  zinc: "Zinc",
  slate: "Slate",
  mauve: "Mauve",
  mist: "Mist",
  olive: "Olive",
  taupe: "Taupe",
};

// --- Color Data (oklch [L, C, H] tuples) ------------------------------------
// Sourced from Tailwind CSS v4.2 default palette.

type LCH = [number, number, number];
type ColorScale = Record<number, LCH>;

const neutralScales: Record<NeutralScale, ColorScale> = {
  slate: {
    50: [0.9842, 0.0034, 247.86],
    100: [0.9683, 0.0069, 247.9],
    200: [0.9288, 0.0126, 255.51],
    300: [0.869, 0.0198, 252.89],
    400: [0.7107, 0.0351, 256.79],
    500: [0.5544, 0.0407, 257.42],
    600: [0.4455, 0.0374, 257.28],
    700: [0.3717, 0.0392, 257.29],
    800: [0.2795, 0.0368, 260.03],
    900: [0.2077, 0.0398, 265.75],
    950: [0.1288, 0.0406, 264.7],
  },
  gray: {
    50: [0.9846, 0.0017, 247.84],
    100: [0.967, 0.0029, 264.54],
    200: [0.9276, 0.0058, 264.53],
    300: [0.8717, 0.0093, 258.34],
    400: [0.7137, 0.0192, 261.32],
    500: [0.551, 0.0234, 264.36],
    600: [0.446, 0.0234, 264.36],
    700: [0.3729, 0.0306, 259.73],
    800: [0.2781, 0.0296, 256.85],
    900: [0.2101, 0.0318, 264.66],
    950: [0.1296, 0.0274, 261.69],
  },
  zinc: {
    50: [0.9851, 0, 0],
    100: [0.9674, 0.0013, 286.38],
    200: [0.9197, 0.004, 286.32],
    300: [0.8711, 0.0055, 286.29],
    400: [0.7118, 0.0129, 286.07],
    500: [0.5517, 0.0138, 285.94],
    600: [0.4419, 0.0146, 285.79],
    700: [0.3703, 0.0119, 285.81],
    800: [0.2739, 0.0055, 286.03],
    900: [0.2103, 0.0059, 285.89],
    950: [0.1408, 0.0044, 285.82],
  },
  neutral: {
    50: [0.9851, 0, 0],
    100: [0.9702, 0, 0],
    200: [0.9219, 0, 0],
    300: [0.8699, 0, 0],
    400: [0.7155, 0, 0],
    500: [0.5555, 0, 0],
    600: [0.4386, 0, 0],
    700: [0.3715, 0, 0],
    800: [0.2686, 0, 0],
    900: [0.2046, 0, 0],
    950: [0.1448, 0, 0],
  },
  stone: {
    50: [0.9848, 0.0013, 106.42],
    100: [0.9699, 0.0013, 106.42],
    200: [0.9232, 0.0026, 48.72],
    300: [0.8687, 0.0043, 56.37],
    400: [0.7161, 0.0091, 56.26],
    500: [0.5534, 0.0116, 58.07],
    600: [0.4444, 0.0096, 73.64],
    700: [0.3741, 0.0087, 67.56],
    800: [0.2685, 0.0063, 34.3],
    900: [0.2161, 0.0061, 56.04],
    950: [0.1469, 0.0041, 49.25],
  },
  mauve: {
    50: [0.985, 0, 0],
    100: [0.96, 0.003, 325.6],
    200: [0.922, 0.005, 325.62],
    300: [0.865, 0.012, 325.68],
    400: [0.711, 0.019, 323.02],
    500: [0.542, 0.034, 322.5],
    600: [0.435, 0.029, 321.78],
    700: [0.364, 0.029, 323.89],
    800: [0.263, 0.024, 320.12],
    900: [0.212, 0.019, 322.12],
    950: [0.145, 0.008, 326],
  },
  mist: {
    50: [0.987, 0.002, 197.1],
    100: [0.963, 0.002, 197.1],
    200: [0.925, 0.005, 214.3],
    300: [0.872, 0.007, 219.6],
    400: [0.723, 0.014, 214.4],
    500: [0.56, 0.021, 213.5],
    600: [0.45, 0.017, 213.2],
    700: [0.378, 0.015, 216],
    800: [0.275, 0.011, 216.9],
    900: [0.218, 0.008, 223.9],
    950: [0.148, 0.004, 228.8],
  },
  olive: {
    50: [0.988, 0.003, 106.5],
    100: [0.966, 0.005, 106.5],
    200: [0.93, 0.007, 106.5],
    300: [0.88, 0.011, 106.6],
    400: [0.737, 0.021, 106.9],
    500: [0.58, 0.031, 107.3],
    600: [0.466, 0.025, 107.3],
    700: [0.394, 0.023, 107.4],
    800: [0.286, 0.016, 107.4],
    900: [0.228, 0.013, 107.4],
    950: [0.153, 0.006, 107.1],
  },
  taupe: {
    50: [0.986, 0.002, 67.8],
    100: [0.96, 0.002, 17.2],
    200: [0.922, 0.005, 34.3],
    300: [0.868, 0.007, 39.5],
    400: [0.714, 0.014, 41.2],
    500: [0.547, 0.021, 43.1],
    600: [0.438, 0.017, 39.3],
    700: [0.367, 0.016, 35.7],
    800: [0.268, 0.011, 36.5],
    900: [0.214, 0.009, 43.1],
    950: [0.147, 0.004, 49.3],
  },
};

const primaryColors: Record<PrimaryColor, ColorScale> = {
  red: {
    50: [0.9705, 0.0129, 17.38],
    100: [0.9356, 0.0309, 17.72],
    200: [0.8845, 0.0593, 18.33],
    300: [0.8077, 0.1035, 19.57],
    400: [0.7106, 0.1661, 22.22],
    500: [0.6368, 0.2078, 25.33],
    600: [0.5771, 0.2152, 27.33],
    700: [0.5054, 0.1905, 27.52],
    800: [0.4437, 0.1613, 26.9],
    900: [0.3958, 0.1331, 25.72],
    950: [0.2575, 0.0886, 26.04],
  },
  orange: {
    50: [0.9796, 0.0158, 73.68],
    100: [0.9542, 0.0372, 75.16],
    200: [0.9015, 0.073, 70.7],
    300: [0.8366, 0.1165, 66.29],
    400: [0.7576, 0.159, 55.93],
    500: [0.7049, 0.1867, 47.6],
    600: [0.6461, 0.1943, 41.12],
    700: [0.5534, 0.1739, 38.4],
    800: [0.4698, 0.143, 37.3],
    900: [0.4084, 0.1165, 38.17],
    950: [0.2659, 0.0762, 36.26],
  },
  amber: {
    50: [0.9869, 0.0214, 95.28],
    100: [0.9619, 0.059, 95.62],
    200: [0.9243, 0.1151, 95.75],
    300: [0.879, 0.1534, 91.61],
    400: [0.8369, 0.1644, 84.43],
    500: [0.7686, 0.1647, 70.08],
    600: [0.6658, 0.1574, 58.32],
    700: [0.5553, 0.1455, 49],
    800: [0.4732, 0.1247, 46.2],
    900: [0.4137, 0.1054, 45.9],
    950: [0.2791, 0.0742, 45.64],
  },
  yellow: {
    50: [0.9873, 0.0262, 102.21],
    100: [0.9729, 0.0693, 103.19],
    200: [0.9451, 0.1243, 101.54],
    300: [0.9052, 0.1657, 98.11],
    400: [0.8606, 0.1731, 91.94],
    500: [0.7952, 0.1617, 86.05],
    600: [0.6806, 0.1423, 75.83],
    700: [0.5538, 0.1207, 66.44],
    800: [0.4762, 0.1034, 61.91],
    900: [0.421, 0.0897, 57.71],
    950: [0.2857, 0.0639, 53.81],
  },
  lime: {
    50: [0.9857, 0.0311, 120.76],
    100: [0.9669, 0.0659, 122.33],
    200: [0.9382, 0.1217, 124.32],
    300: [0.8972, 0.1786, 126.67],
    400: [0.8493, 0.2073, 128.85],
    500: [0.7681, 0.2044, 130.85],
    600: [0.6482, 0.1754, 131.68],
    700: [0.5322, 0.1405, 131.59],
    800: [0.4528, 0.1129, 130.93],
    900: [0.405, 0.0956, 131.06],
    950: [0.2741, 0.0688, 132.11],
  },
  green: {
    50: [0.9819, 0.0181, 155.83],
    100: [0.9624, 0.0434, 156.74],
    200: [0.925, 0.0806, 155.99],
    300: [0.8712, 0.1363, 154.45],
    400: [0.8003, 0.1821, 151.71],
    500: [0.7227, 0.1921, 149.58],
    600: [0.6271, 0.1699, 149.21],
    700: [0.5273, 0.1371, 150.07],
    800: [0.4479, 0.1083, 151.33],
    900: [0.3925, 0.0896, 152.54],
    950: [0.2664, 0.0628, 152.93],
  },
  emerald: {
    50: [0.9793, 0.0207, 166.11],
    100: [0.9505, 0.0507, 163.05],
    200: [0.9049, 0.0895, 164.15],
    300: [0.8452, 0.1299, 164.98],
    400: [0.7729, 0.1535, 163.22],
    500: [0.6959, 0.1491, 162.48],
    600: [0.596, 0.1274, 163.23],
    700: [0.5081, 0.1049, 165.61],
    800: [0.4318, 0.0865, 166.91],
    900: [0.378, 0.073, 168.94],
    950: [0.2621, 0.0487, 172.55],
  },
  teal: {
    50: [0.9836, 0.0142, 180.72],
    100: [0.9527, 0.0498, 180.8],
    200: [0.91, 0.0927, 180.43],
    300: [0.8549, 0.1251, 181.07],
    400: [0.7845, 0.1325, 181.91],
    500: [0.7038, 0.123, 182.5],
    600: [0.6002, 0.1038, 184.7],
    700: [0.5109, 0.0861, 186.39],
    800: [0.437, 0.0705, 188.22],
    900: [0.3861, 0.059, 188.42],
    950: [0.2773, 0.0447, 192.52],
  },
  cyan: {
    50: [0.9841, 0.0189, 200.87],
    100: [0.9563, 0.0443, 203.39],
    200: [0.9167, 0.0772, 205.04],
    300: [0.8651, 0.1153, 207.08],
    400: [0.7971, 0.1339, 211.53],
    500: [0.7148, 0.1257, 215.22],
    600: [0.6089, 0.1109, 221.72],
    700: [0.5198, 0.0936, 223.13],
    800: [0.45, 0.0771, 224.28],
    900: [0.3982, 0.0664, 227.39],
    950: [0.3018, 0.0541, 229.7],
  },
  sky: {
    50: [0.9771, 0.0125, 236.62],
    100: [0.9514, 0.0252, 236.82],
    200: [0.9014, 0.0555, 230.9],
    300: [0.8276, 0.1013, 230.32],
    400: [0.7535, 0.139, 232.66],
    500: [0.6847, 0.1479, 237.32],
    600: [0.5876, 0.1389, 241.97],
    700: [0.5, 0.1193, 242.75],
    800: [0.4434, 0.124, 240.79],
    900: [0.3912, 0.0845, 240.88],
    950: [0.2935, 0.0632, 243.16],
  },
  blue: {
    50: [0.9705, 0.0142, 254.6],
    100: [0.9319, 0.0316, 255.59],
    200: [0.8823, 0.0571, 254.13],
    300: [0.8091, 0.0956, 251.81],
    400: [0.7137, 0.1434, 254.62],
    500: [0.6231, 0.188, 259.81],
    600: [0.5461, 0.2152, 262.88],
    700: [0.4882, 0.2172, 264.38],
    800: [0.4244, 0.1809, 265.64],
    900: [0.3791, 0.1378, 265.52],
    950: [0.2823, 0.0874, 267.94],
  },
  indigo: {
    50: [0.9619, 0.0179, 272.31],
    100: [0.9299, 0.0334, 272.79],
    200: [0.8699, 0.0622, 274.04],
    300: [0.7853, 0.1041, 274.71],
    400: [0.6801, 0.1583, 276.93],
    500: [0.5854, 0.2041, 277.12],
    600: [0.5106, 0.2301, 276.97],
    700: [0.4568, 0.2146, 277.02],
    800: [0.3984, 0.1773, 277.37],
    900: [0.3588, 0.1354, 278.7],
    950: [0.2573, 0.0861, 281.29],
  },
  violet: {
    50: [0.9786, 0.0142, 308.3],
    100: [0.9433, 0.0284, 294.59],
    200: [0.8943, 0.0549, 293.28],
    300: [0.8112, 0.1013, 293.57],
    400: [0.709, 0.1592, 293.54],
    500: [0.6056, 0.2189, 292.72],
    600: [0.5413, 0.2466, 293.01],
    700: [0.4907, 0.2412, 292.58],
    800: [0.432, 0.2106, 292.76],
    900: [0.3796, 0.1783, 293.74],
    950: [0.2827, 0.1351, 291.09],
  },
  purple: {
    50: [0.9768, 0.0142, 308.3],
    100: [0.9464, 0.0327, 307.17],
    200: [0.9024, 0.0604, 306.7],
    300: [0.8268, 0.1082, 306.38],
    400: [0.7217, 0.1767, 305.5],
    500: [0.6268, 0.2325, 303.9],
    600: [0.5575, 0.2525, 302.32],
    700: [0.4955, 0.2369, 301.92],
    800: [0.4383, 0.1983, 303.72],
    900: [0.3807, 0.1661, 304.99],
    950: [0.2905, 0.1432, 302.72],
  },
  fuchsia: {
    50: [0.9773, 0.0174, 320.06],
    100: [0.952, 0.036, 318.85],
    200: [0.903, 0.0732, 319.62],
    300: [0.833, 0.1322, 321.43],
    400: [0.7477, 0.207, 322.16],
    500: [0.6668, 0.2591, 322.15],
    600: [0.5915, 0.2569, 322.9],
    700: [0.518, 0.2258, 323.95],
    800: [0.4519, 0.1922, 324.59],
    900: [0.4007, 0.1601, 325.61],
    950: [0.2932, 0.1309, 325.66],
  },
  pink: {
    50: [0.9714, 0.0141, 343.2],
    100: [0.9482, 0.0276, 342.26],
    200: [0.8994, 0.0589, 343.23],
    300: [0.8228, 0.1095, 346.02],
    400: [0.7253, 0.1752, 349.76],
    500: [0.6559, 0.2118, 354.31],
    600: [0.5916, 0.218, 0.58],
    700: [0.5246, 0.199, 3.96],
    800: [0.4587, 0.1697, 3.82],
    900: [0.4078, 0.1442, 2.43],
    950: [0.2845, 0.1048, 3.91],
  },
  rose: {
    50: [0.9694, 0.0151, 12.42],
    100: [0.9414, 0.0297, 12.58],
    200: [0.8924, 0.0559, 10],
    300: [0.8097, 0.1061, 11.64],
    400: [0.7192, 0.169, 13.43],
    500: [0.645, 0.2154, 16.44],
    600: [0.5858, 0.222, 17.58],
    700: [0.5143, 0.1978, 16.93],
    800: [0.4546, 0.1713, 13.7],
    900: [0.4103, 0.1502, 10.27],
    950: [0.2708, 0.1009, 12.09],
  },
  slate: {
    50: [0.9842, 0.0034, 247.86],
    100: [0.9683, 0.0069, 247.9],
    200: [0.9288, 0.0126, 255.51],
    300: [0.869, 0.0198, 252.89],
    400: [0.7107, 0.0351, 256.79],
    500: [0.5544, 0.0407, 257.42],
    600: [0.4455, 0.0374, 257.28],
    700: [0.3717, 0.0392, 257.29],
    800: [0.2795, 0.0368, 260.03],
    900: [0.2077, 0.0398, 265.75],
    950: [0.1288, 0.0406, 264.7],
  },
  gray: {
    50: [0.9846, 0.0017, 247.84],
    100: [0.967, 0.0029, 264.54],
    200: [0.9276, 0.0058, 264.53],
    300: [0.8717, 0.0093, 258.34],
    400: [0.7137, 0.0192, 261.32],
    500: [0.551, 0.0234, 264.36],
    600: [0.446, 0.0234, 264.36],
    700: [0.3729, 0.0306, 259.73],
    800: [0.2781, 0.0296, 256.85],
    900: [0.2101, 0.0318, 264.66],
    950: [0.1296, 0.0274, 261.69],
  },
  zinc: {
    50: [0.9851, 0, 0],
    100: [0.9674, 0.0013, 286.38],
    200: [0.9197, 0.004, 286.32],
    300: [0.8711, 0.0055, 286.29],
    400: [0.7118, 0.0129, 286.07],
    500: [0.5517, 0.0138, 285.94],
    600: [0.4419, 0.0146, 285.79],
    700: [0.3703, 0.0119, 285.81],
    800: [0.2739, 0.0055, 286.03],
    900: [0.2103, 0.0059, 285.89],
    950: [0.1408, 0.0044, 285.82],
  },
  neutral: {
    50: [0.9851, 0, 0],
    100: [0.9702, 0, 0],
    200: [0.9219, 0, 0],
    300: [0.8699, 0, 0],
    400: [0.7155, 0, 0],
    500: [0.5555, 0, 0],
    600: [0.4386, 0, 0],
    700: [0.3715, 0, 0],
    800: [0.2686, 0, 0],
    900: [0.2046, 0, 0],
    950: [0.1448, 0, 0],
  },
  stone: {
    50: [0.9848, 0.0013, 106.42],
    100: [0.9699, 0.0013, 106.42],
    200: [0.9232, 0.0026, 48.72],
    300: [0.8687, 0.0043, 56.37],
    400: [0.7161, 0.0091, 56.26],
    500: [0.5534, 0.0116, 58.07],
    600: [0.4444, 0.0096, 73.64],
    700: [0.3741, 0.0087, 67.56],
    800: [0.2685, 0.0063, 34.3],
    900: [0.2161, 0.0061, 56.04],
    950: [0.1469, 0.0041, 49.25],
  },
  mauve: {
    50: [0.985, 0, 0],
    100: [0.96, 0.003, 325.6],
    200: [0.922, 0.005, 325.62],
    300: [0.865, 0.012, 325.68],
    400: [0.711, 0.019, 323.02],
    500: [0.542, 0.034, 322.5],
    600: [0.435, 0.029, 321.78],
    700: [0.364, 0.029, 323.89],
    800: [0.263, 0.024, 320.12],
    900: [0.212, 0.019, 322.12],
    950: [0.145, 0.008, 326],
  },
  mist: {
    50: [0.987, 0.002, 197.1],
    100: [0.963, 0.002, 197.1],
    200: [0.925, 0.005, 214.3],
    300: [0.872, 0.007, 219.6],
    400: [0.723, 0.014, 214.4],
    500: [0.56, 0.021, 213.5],
    600: [0.45, 0.017, 213.2],
    700: [0.378, 0.015, 216],
    800: [0.275, 0.011, 216.9],
    900: [0.218, 0.008, 223.9],
    950: [0.148, 0.004, 228.8],
  },
  olive: {
    50: [0.988, 0.003, 106.5],
    100: [0.966, 0.005, 106.5],
    200: [0.93, 0.007, 106.5],
    300: [0.88, 0.011, 106.6],
    400: [0.737, 0.021, 106.9],
    500: [0.58, 0.031, 107.3],
    600: [0.466, 0.025, 107.3],
    700: [0.394, 0.023, 107.4],
    800: [0.286, 0.016, 107.4],
    900: [0.228, 0.013, 107.4],
    950: [0.153, 0.006, 107.1],
  },
  taupe: {
    50: [0.986, 0.002, 67.8],
    100: [0.96, 0.002, 17.2],
    200: [0.922, 0.005, 34.3],
    300: [0.868, 0.007, 39.5],
    400: [0.714, 0.014, 41.2],
    500: [0.547, 0.021, 43.1],
    600: [0.438, 0.017, 39.3],
    700: [0.367, 0.016, 35.7],
    800: [0.268, 0.011, 36.5],
    900: [0.214, 0.009, 43.1],
    950: [0.147, 0.004, 49.3],
  },
};

// --- Display colours (for UI swatches, using the 500 stop) ------------------

export const NEUTRAL_DISPLAY_COLORS: Record<NeutralScale, string> = Object.fromEntries(
  (Object.keys(neutralScales) as NeutralScale[]).map((k) => [k, fmt(neutralScales[k][500])])
) as Record<NeutralScale, string>;

export const PRIMARY_DISPLAY_COLORS: Record<PrimaryColor, string> = Object.fromEntries(
  (Object.keys(primaryColors) as PrimaryColor[]).map((k) => [k, fmt(primaryColors[k][500])])
) as Record<PrimaryColor, string>;

// --- Helpers -----------------------------------------------------------------

const SYSTEM_FONT_STACK =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

const FONT_FAMILIES: Record<FontOption, string> = {
  system: SYSTEM_FONT_STACK,
  geist: "var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)",
  manrope: "var(--font-manrope, ui-sans-serif, system-ui, sans-serif)",
  "hedvig-letters-serif":
    'var(--font-hedvig-letters-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif)',
  "schibsted-grotesk": "var(--font-schibsted-grotesk, ui-sans-serif, system-ui, sans-serif)",
  "jetbrains-mono":
    'var(--font-jetbrains-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
};

function resolveFontFamily(option: FontOption): string {
  return FONT_FAMILIES[option];
}

export function getFontFamilyForOption(option: FontOption): string {
  return resolveFontFamily(option);
}

function fmt(lch: LCH): string {
  return `oklch(${lch[0]} ${lch[1]} ${lch[2]})`;
}

/** Parse an oklch(L C H) string into an LCH tuple. Returns null on failure. */
export function parseOklchString(input: string): LCH | null {
  const m = input.trim().match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (!m) return null;
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
}

/**
 * Generate a full 50–950 color scale from a single OKLCH color.
 * The input color is placed at the 500 shade. Other shades use
 * proportional lightness targets and chroma multipliers derived
 * from average Tailwind v4 palette distributions.
 */
export function generateScaleFromOklch(inputL: number, inputC: number, h: number): ColorScale {
  const refL: Record<number, number> = {
    50: 0.975,
    100: 0.945,
    200: 0.905,
    300: 0.835,
    400: 0.735,
    500: 0.645,
    600: 0.565,
    700: 0.5,
    800: 0.44,
    900: 0.39,
    950: 0.275,
  };
  const refCMult: Record<number, number> = {
    50: 0.08,
    100: 0.18,
    200: 0.38,
    300: 0.62,
    400: 0.85,
    500: 1.0,
    600: 1.05,
    700: 0.92,
    800: 0.78,
    900: 0.63,
    950: 0.45,
  };
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const scale: ColorScale = {};
  for (const shade of shades) {
    if (shade === 500) {
      scale[shade] = [inputL, inputC, h];
    } else {
      scale[shade] = [refL[shade], inputC * refCMult[shade], h];
    }
  }
  return scale;
}

/** Very light primary colors need a darker stop for sufficient contrast. */
const LIGHT_PRIMARIES: PrimaryColor[] = ["yellow", "lime", "amber"];

// --- WCAG Contrast Ratio Helpers --------------------------------------------

/** Convert OKLCH to linear sRGB. */
function oklchToLinearSrgb(L: number, C: number, H: number): [number, number, number] {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return [
    Math.max(0, +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    Math.max(0, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    Math.max(0, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

/** Compute WCAG 2.x relative luminance from linear sRGB. */
function relativeLuminance(lr: number, lg: number, lb: number): number {
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/** WCAG contrast ratio between two relative luminances (returns ≥ 1). */
function contrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Choose a primary foreground with an explicit white-first rule:
 * if white is above the configured WCAG contrast threshold (> 2.5), prefer white.
 * Otherwise fall back to a dark foreground, preferring a darker primary tone.
 */
function getPrimaryFg(lch: LCH, neutralDark: LCH): string {
  const MIN_TEXT_CONTRAST = 2.5;
  const WHITE = "oklch(0.985 0 0)";

  const [lr, lg, lb] = oklchToLinearSrgb(lch[0], lch[1], lch[2]);
  const bgLum = relativeLuminance(lr, lg, lb);

  // White foreground
  const whiteLum = 1.0;
  const whiteContrast = contrastRatio(bgLum, whiteLum);
  if (whiteContrast > MIN_TEXT_CONTRAST) return WHITE;

  // Fallback 1: darker version of the base primary (preferred when white fails)
  const darkerPrimary: LCH = [
    Math.max(0.2, Math.min(0.38, lch[0] - 0.42)),
    Math.min(lch[1], 0.18),
    lch[2],
  ];
  const [pr, pg, pb] = oklchToLinearSrgb(darkerPrimary[0], darkerPrimary[1], darkerPrimary[2]);
  const darkerPrimaryLum = relativeLuminance(pr, pg, pb);
  const darkerPrimaryContrast = contrastRatio(bgLum, darkerPrimaryLum);
  if (darkerPrimaryContrast > MIN_TEXT_CONTRAST) return fmt(darkerPrimary);

  // Fallback 2: dark neutral foreground
  const [dr, dg, db] = oklchToLinearSrgb(neutralDark[0], neutralDark[1], neutralDark[2]);
  const darkLum = relativeLuminance(dr, dg, db);
  const darkContrast = contrastRatio(bgLum, darkLum);
  if (darkContrast > MIN_TEXT_CONTRAST) return fmt(neutralDark);

  // Last resort: pick the higher-contrast dark fallback when neither reaches AA.
  return darkerPrimaryContrast >= darkContrast ? fmt(darkerPrimary) : fmt(neutralDark);
}

function generateChartColors(hue: number, mode: "light" | "dark"): string[] {
  const rotations = [0, 72, 144, 216, 288];
  const lightL = [0.65, 0.6, 0.45, 0.8, 0.75];
  const lightC = [0.2, 0.15, 0.12, 0.18, 0.18];
  const darkL = [0.55, 0.65, 0.75, 0.6, 0.65];
  const darkC = [0.22, 0.17, 0.18, 0.25, 0.22];

  const ls = mode === "light" ? lightL : darkL;
  const cs = mode === "light" ? lightC : darkC;

  return rotations.map((r, i) => {
    const h = (hue + r) % 360;
    return `oklch(${ls[i]} ${cs[i]} ${h})`;
  });
}

// --- Theme Generation --------------------------------------------------------

export function generateThemeVars(config: ThemeConfig): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  const n = neutralScales[config.neutral];
  const bodyFontFamily = resolveFontFamily(config.bodyFont);
  const headingFontFamily = resolveFontFamily(config.headingFont);

  // Resolve the primary color scale: use custom if set, otherwise use preset
  let p: ColorScale;
  let isLightPrimary: boolean;
  if (config.customPrimary) {
    const parsed = parseOklchString(config.customPrimary);
    if (parsed) {
      p = generateScaleFromOklch(parsed[0], parsed[1], parsed[2]);
      isLightPrimary = parsed[0] >= 0.75; // high lightness → needs darker stop
    } else {
      p = primaryColors[config.primary];
      isLightPrimary = LIGHT_PRIMARIES.includes(config.primary);
    }
  } else {
    p = primaryColors[config.primary];
    isLightPrimary = LIGHT_PRIMARIES.includes(config.primary);
  }

  const lightStop = isLightPrimary ? 600 : 500;
  const darkStop = 500;

  const primaryHue = p[500][2];
  const lightCharts = generateChartColors(primaryHue, "light");
  const darkCharts = generateChartColors(primaryHue, "dark");

  const lightPrimaryFg = getPrimaryFg(p[lightStop], n[950]);
  const darkPrimaryFg = getPrimaryFg(p[darkStop], n[950]);

  // Shadow: depth controls darkness (lightness of shadow color),
  // opacity controls transparency (alpha channel).
  const depthFactor = config.shadowDepth / 100; // 0–1
  const opacityFactor = config.shadowOpacity / 100; // 0–1

  // Light mode: shadow color from neutral-300, darken with depth
  const lightBase = n[300];
  const lightShadowL = Math.round(lightBase[0] * (1 - depthFactor * 0.85) * 1000) / 1000;
  const lightShadowC = Math.round(lightBase[1] * (1 - depthFactor * 0.7) * 1000) / 1000;
  const lightShadowH = lightBase[2];
  const lightShadowAlpha = opacityFactor * 0.55; // 0–55 %

  // Dark mode: shadow color from neutral-950, modulate both depth and opacity
  const darkShadowAlpha = depthFactor * opacityFactor * 0.75; // 0–75 %

  // Background shade mappings
  // Light: shade 0 = white, 1 = neutral-50, 2 = neutral-100
  // Dark:  shade 0 = 950,   1 = 900,        2 = 800
  const shade = config.backgroundShade;

  const lightBg = shade === 0 ? "oklch(1 0 0)" : shade === 1 ? fmt(n[50]) : fmt(n[100]);
  const lightCard = shade === 0 ? "oklch(1 0 0)" : shade === 1 ? "oklch(1 0 0)" : fmt(n[50]);
  const lightSecondary = shade === 0 ? n[100] : shade === 1 ? n[200] : n[200];
  const lightBorder = shade === 0 ? n[200] : shade === 1 ? n[200] : n[300];
  const lightSidebar = shade === 0 ? n[50] : shade === 1 ? n[100] : n[200];
  const lightSidebarAccent = shade === 0 ? n[100] : shade === 1 ? n[200] : n[300];

  const darkBgStops: Record<BackgroundShade, number> = { 0: 950, 1: 900, 2: 800 };
  const darkCardStops: Record<BackgroundShade, number> = { 0: 900, 1: 800, 2: 700 };
  const darkSecStops: Record<BackgroundShade, number> = { 0: 800, 1: 700, 2: 600 };
  const darkBorderStops: Record<BackgroundShade, number> = { 0: 800, 1: 700, 2: 600 };
  const darkSidebarStops: Record<BackgroundShade, number> = { 0: 900, 1: 800, 2: 700 };

  return {
    light: {
      "--radius": `${config.radius}rem`,
      "--theme-font-sans": bodyFontFamily,
      "--theme-font-heading": headingFontFamily,
      "--background": lightBg,
      "--foreground": fmt(n[950]),
      "--card": lightCard,
      "--card-foreground": fmt(n[950]),
      "--popover": lightCard,
      "--popover-foreground": fmt(n[950]),
      "--primary": fmt(p[lightStop]),
      "--primary-foreground": lightPrimaryFg,
      "--secondary": fmt(lightSecondary),
      "--secondary-foreground": fmt(n[900]),
      "--muted": fmt(lightSecondary),
      "--muted-foreground": fmt(n[500]),
      "--accent": fmt(lightSecondary),
      "--accent-foreground": fmt(n[900]),
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--success": "oklch(0.6959 0.1491 162.48)",
      "--success-foreground": "oklch(0.985 0 0)",
      "--border": fmt(lightBorder),
      "--input": fmt(lightBorder),
      "--ring": fmt(n[950]),
      "--shadow-color": `oklch(${lightShadowL} ${lightShadowC} ${lightShadowH} / ${Math.round(
        lightShadowAlpha * 100
      )}%)`,
      "--chart-1": lightCharts[0],
      "--chart-2": lightCharts[1],
      "--chart-3": lightCharts[2],
      "--chart-4": lightCharts[3],
      "--chart-5": lightCharts[4],
      "--sidebar": fmt(lightSidebar),
      "--sidebar-foreground": fmt(n[950]),
      "--sidebar-primary": fmt(n[900]),
      "--sidebar-primary-foreground": fmt(n[50]),
      "--sidebar-accent": fmt(lightSidebarAccent),
      "--sidebar-accent-foreground": fmt(n[900]),
      "--sidebar-border": fmt(lightBorder),
      "--sidebar-ring": fmt(n[950]),
    },
    dark: {
      "--theme-font-sans": bodyFontFamily,
      "--theme-font-heading": headingFontFamily,
      "--background": fmt(n[darkBgStops[shade]]),
      "--foreground": fmt(n[50]),
      "--card": fmt(n[darkCardStops[shade]]),
      "--card-foreground": fmt(n[50]),
      "--popover": fmt(n[darkCardStops[shade]]),
      "--popover-foreground": fmt(n[50]),
      "--primary": fmt(p[darkStop]),
      "--primary-foreground": darkPrimaryFg,
      "--secondary": fmt(n[darkSecStops[shade]]),
      "--secondary-foreground": fmt(n[50]),
      "--muted": fmt(n[darkSecStops[shade]]),
      "--muted-foreground": fmt(n[400]),
      "--accent": fmt(n[darkSecStops[shade]]),
      "--accent-foreground": fmt(n[50]),
      "--destructive": "oklch(0.704 0.191 22.216)",
      "--success": "oklch(0.6959 0.1491 162.48)",
      "--success-foreground": "oklch(0.985 0 0)",
      "--border": fmt(n[darkBorderStops[shade]]),
      "--input": fmt(n[darkBorderStops[shade]]),
      "--ring": fmt(n[300]),
      "--shadow-color": `oklch(0 0 0 / ${Math.round(darkShadowAlpha * 100)}%)`,
      "--chart-1": darkCharts[0],
      "--chart-2": darkCharts[1],
      "--chart-3": darkCharts[2],
      "--chart-4": darkCharts[3],
      "--chart-5": darkCharts[4],
      "--sidebar": fmt(n[darkSidebarStops[shade]]),
      "--sidebar-foreground": fmt(n[50]),
      "--sidebar-primary": fmt(p[500]),
      "--sidebar-primary-foreground": fmt(n[50]),
      "--sidebar-accent": fmt(n[darkSecStops[shade]]),
      "--sidebar-accent-foreground": fmt(n[50]),
      "--sidebar-border": fmt(n[darkBorderStops[shade]]),
      "--sidebar-ring": fmt(n[300]),
    },
  };
}

// --- CSS Export ---------------------------------------------------------------

export function generateGlobalsCss(config: ThemeConfig): string {
  const vars = generateThemeVars(config);

  const lightVars = Object.entries(vars.light)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");

  const darkVars = Object.entries(vars.dark)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");

  return `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--theme-font-sans);
  --font-heading: var(--theme-font-heading);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-shade: var(--shadow-color);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
}

:root {
${lightVars}
}

.dark {
${darkVars}
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-heading;
  }
  html {
    @apply scroll-smooth;
  }
}
`;
}

// --- DOM Application ---------------------------------------------------------

const STYLE_ID = "theme-customizer-vars";

export function applyThemeToDOM(config: ThemeConfig): void {
  if (typeof document === "undefined") return;

  const vars = generateThemeVars(config);

  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }

  const lightVars = Object.entries(vars.light)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");

  const darkVars = Object.entries(vars.dark)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");

  styleEl.textContent = `:root {\n${lightVars}\n}\n\n.dark {\n${darkVars}\n}`;
}

export function removeThemeFromDOM(): void {
  if (typeof document === "undefined") return;
  const styleEl = document.getElementById(STYLE_ID);
  if (styleEl) styleEl.remove();
}
