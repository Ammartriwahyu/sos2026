export const INTRO_TIME_SCALE = 1;

export const INTRO_CUES = {
  void: 0,
  bigBang: 1,
  flyThrough: 2.4,
  logo: 3.8,
  title: 5,
  subtitle: 6.4,
  divisions: 7.3,
  count: 8.8,
  curtain: 9.5,
} as const;

export const INTRO_BAND_INTERVAL = 0.5;

export const STATS_PIN_VH = 140;
export const ROLE_INTRO_VH = 160;
export const MEMBER_BEAT_VH = 120;
export const MEMBER_EXIT_TAIL = 0.25;

export const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const round = (value: number, digits = 2) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};
