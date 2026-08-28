export interface NavItem {
  title: string;
  href: string;
  isHidden?: boolean;
}

export const navListData: NavItem[] = [
  {
    title: "Beranda",
    href: "/home",
  },
  {
    title: "Peta",
    href: "/peta",
  },
  {
    title: "Aktivitas",
    href: "/aktivitas",
  },
  {
    title: "Akademik",
    href: "/akademik",
  },
  {
    title: "STF",
    href: "/stf",
    isHidden: true, // Ubah menjadi false nanti jika STF sudah siap dipublish
  },
];
