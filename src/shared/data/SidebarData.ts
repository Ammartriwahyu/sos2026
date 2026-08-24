import {
  CheckSquare,
  FileText,
  Star,
  Users,
  Search,
  Crown,
  LucideIcon,
  LayoutDashboard,
} from "lucide-react";
import { useRole } from "../hooks/useRole";

export interface SidebarMenuItem {
  id: number;
  label: string;
  icon: LucideIcon;
  path: string;
  requiresRole?: string;
}

const basePath = "/admin";

const baseSidebarItems: SidebarMenuItem[] = [
  {
    id: 0,
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 1,
    label: "Presensi",
    icon: CheckSquare,
    path: "/presensi",
  },
  {
    id: 2,
    label: "Penugasan",
    icon: FileText,
    path: "penugasan",
  },
  {
    id: 3,
    label: "Penilaian ",
    icon: Star,
    path: "penilaian-pelanggaran",
  },
  {
    id: 4,
    label: "Daftar Distrik",
    icon: Users,
    path: "distrik",
  },
  {
    id: 5,
    label: "Cari Mahasiswa",
    icon: Search,
    path: "cari-mahasiswa",
  },
  {
    id: 6,
    label: "STF",
    icon: Crown,
    path: "stf",
    requiresRole: "sqc",
  },
];

export const useSidebarMenuItems = (): SidebarMenuItem[] => {
  const { isSqc } = useRole();

  return baseSidebarItems
    .filter((item) => {
      if (!item.requiresRole) return true;

      if (item.requiresRole === "sqc") return isSqc;

      return false;
    })
    .map((item) => ({
      ...item,
      path: `${basePath}/${item.path.replace(/^\//, "")}`,
    }));
};

export const allSidebarMenuItems = baseSidebarItems.map((item) => ({
  ...item,
  path: `${basePath}/${item.path.replace(/^\//, "")}`,
}));
