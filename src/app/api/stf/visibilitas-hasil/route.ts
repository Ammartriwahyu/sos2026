import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface VisibilitasState {
  tampilkan_semua: boolean;
  prodi: {
    SI: boolean;
    TI: boolean;
    PTI: boolean;
  };
  kadep: boolean;
}

// In-memory state pada runtime Next.js server
const globalState: VisibilitasState = {
  tampilkan_semua: false,
  prodi: {
    SI: false,
    TI: false,
    PTI: false,
  },
  kadep: false,
};

export async function GET() {
  return NextResponse.json({
    status_code: 200,
    message: "Status visibilitas hasil berhasil diambil",
    data: globalState,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Reset all ke false (misal saat reset pemilihan)
    if (body.action === "reset") {
      globalState.tampilkan_semua = false;
      globalState.prodi = { SI: false, TI: false, PTI: false };
      globalState.kadep = false;
      return NextResponse.json({
        status_code: 200,
        message: "Status visibilitas berhasil di-reset",
        data: globalState,
      });
    }

    // Toggle atau set semua prodi
    if (typeof body.tampilkan_semua === "boolean") {
      globalState.tampilkan_semua = body.tampilkan_semua;
      globalState.prodi.SI = body.tampilkan_semua;
      globalState.prodi.TI = body.tampilkan_semua;
      globalState.prodi.PTI = body.tampilkan_semua;
    }

    // Toggle atau set status visibilitas kadep
    if (typeof body.kadep === "boolean") {
      globalState.kadep = body.kadep;
    }

    // Toggle atau set spesifik per prodi (SI / TI / PTI)
    if (body.prodi) {
      const p = String(body.prodi).toUpperCase();
      if (p in globalState.prodi) {
        const key = p as keyof typeof globalState.prodi;
        const val =
          typeof body.visible === "boolean"
            ? body.visible
            : !globalState.prodi[key];
        globalState.prodi[key] = val;

        // Jika semua prodi aktif, set tampilkan_semua true
        const allActive = Object.values(globalState.prodi).every(Boolean);
        globalState.tampilkan_semua = allActive;
      }
    }

    return NextResponse.json({
      status_code: 200,
      message: "Status visibilitas berhasil diperbarui",
      data: globalState,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan";
    return NextResponse.json({ status_code: 500, message }, { status: 500 });
  }
}
