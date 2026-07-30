import React from "react";

type Shade = {
  label: string;
  token: string;
  hex: string;
};

type Palette = {
  name: string;
  note?: string;
  shades: Shade[];
};

/**
 * Preview palet warna Design System 2026 (sesuai Figma).
 * Sumber kebenaran token ada di `src/styles/globals.css`.
 * Hex di sini hanya untuk menampilkan swatch; jangan hardcode di komponen produksi
 * — pakai token Tailwind (mis. `bg-primary-normal`, `text-secondary-dark`).
 */
const buildShades = (
  group: string,
  hexes: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ],
): Shade[] => {
  const rows: { label: string; token: string }[] = [
    { label: "Light", token: `${group}-light` },
    { label: "Light :hover", token: `${group}-light-hover` },
    { label: "Light :active", token: `${group}-light-active` },
    { label: "Normal", token: `${group}-normal` },
    { label: "Normal :hover", token: `${group}-normal-hover` },
    { label: "Normal :active", token: `${group}-normal-active` },
    { label: "Dark", token: `${group}-dark` },
    { label: "Dark :hover", token: `${group}-dark-hover` },
    { label: "Dark :active", token: `${group}-dark-active` },
    { label: "Darker", token: `${group}-darker` },
  ];
  return rows.map((row, i) => ({ ...row, hex: hexes[i] }));
};

const PALETTES: Palette[] = [
  {
    name: "Primary",
    note: "Ungu — warna utama 2026",
    shades: buildShades("primary", [
      "#ede8f0",
      "#e4dde9",
      "#c7b9d2",
      "#491d6d",
      "#421a62",
      "#3a1757",
      "#371652",
      "#2c1141",
      "#210d31",
      "#1a0a26",
    ]),
  },
  {
    name: "Neutral",
    shades: buildShades("neutral", [
      "#e8e7ea",
      "#dddae0",
      "#b8b3be",
      "#1a0b2e",
      "#170a29",
      "#150925",
      "#140823",
      "#10071c",
      "#0c0515",
      "#090410",
    ]),
  },
  {
    name: "Secondary",
    note: "Crimson",
    shades: buildShades("secondary", [
      "#f8e9ee",
      "#f5dde5",
      "#ebb9c9",
      "#bd1e51",
      "#aa1b49",
      "#971841",
      "#8e173d",
      "#711231",
      "#550d24",
      "#420b1c",
    ]),
  },
  {
    name: "Orange",
    shades: buildShades("orange", [
      "#ffeded",
      "#ffe4e4",
      "#ffc8c8",
      "#ff4d4d",
      "#e64545",
      "#cc3e3e",
      "#bf3a3a",
      "#992e2e",
      "#732323",
      "#591b1b",
    ]),
  },
  {
    name: "Yellow",
    shades: buildShades("yellow", [
      "#fff5ec",
      "#fff1e3",
      "#ffe1c5",
      "#ff9f43",
      "#e68f3c",
      "#cc7f36",
      "#bf7732",
      "#995f28",
      "#73481e",
      "#593817",
    ]),
  },
  {
    name: "Violet",
    shades: buildShades("violet", [
      "#edebfb",
      "#e4e1f8",
      "#c8c0f1",
      "#4c34d2",
      "#442fbd",
      "#3d2aa8",
      "#39279e",
      "#2e1f7e",
      "#22175e",
      "#1b124a",
    ]),
  },
  {
    name: "Blue",
    shades: buildShades("blue", [
      "#e8ebf5",
      "#dce1f0",
      "#b6c1e1",
      "#14389d",
      "#12328d",
      "#102d7e",
      "#0f2a76",
      "#0c225e",
      "#091947",
      "#071437",
    ]),
  },
  {
    name: "Green",
    shades: buildShades("green", [
      "#eff9e7",
      "#e7f6da",
      "#ccedb3",
      "#5cc40a",
      "#53b009",
      "#4a9d08",
      "#459308",
      "#377606",
      "#295805",
      "#204504",
    ]),
  },
  {
    name: "Pink",
    note: "Swatch 'Red' di Figma",
    shades: buildShades("pink", [
      "#ffecf6",
      "#fee3f2",
      "#fdc5e4",
      "#fa45a9",
      "#e13e98",
      "#c83787",
      "#bc347f",
      "#962965",
      "#701f4c",
      "#58183b",
    ]),
  },
  {
    name: "Black",
    note: "Swatch 'Green' gelap di Figma",
    shades: buildShades("black", [
      "#e6e6e9",
      "#dadade",
      "#b2b3ba",
      "#070920",
      "#06081d",
      "#06071a",
      "#050718",
      "#040513",
      "#03040e",
      "#02030b",
    ]),
  },
];

const PaletteBlock = ({ palette }: { palette: Palette }) => (
  <div className="flex flex-col gap-3">
    <div>
      <h3 className="text-xl font-semibold text-black-normal">
        {palette.name}
      </h3>
      {palette.note && (
        <p className="text-xs text-black-light-active">{palette.note}</p>
      )}
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {palette.shades.map((shade) => (
        <div
          key={shade.token}
          className="flex flex-col overflow-hidden rounded-lg border border-surface-divider"
        >
          <div className="h-16 w-full" style={{ backgroundColor: shade.hex }} />
          <div className="flex flex-col gap-0.5 p-2">
            <span className="text-xs font-medium text-black-normal">
              {shade.label}
            </span>
            <span className="text-[10px] text-black-light-active uppercase">
              {shade.hex}
            </span>
            <code className="text-[10px] text-black-light-active">
              {shade.token}
            </code>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Colors = () => {
  return (
    <section className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-primary-normal">Colors</h2>
        <p className="text-sm text-black-light-active">
          Palet Design System 2026. Gunakan token (mis.{" "}
          <code>bg-primary-normal</code>), jangan hardcode hex.
        </p>
      </div>
      {PALETTES.map((palette) => (
        <PaletteBlock key={palette.name} palette={palette} />
      ))}
    </section>
  );
};

export default Colors;
