import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  const { action } = await context.params;

  if (action === "login") {
    try {
      const body = await request.json();
      const response = await axios.post(`${API_BASE_URL}/api/login`, body);

      const { token } = response.data.data;

      if (!token) {
        throw new Error("Token tidak ditemukan dari backend");
      }

      const payload = await verifyToken(token);

      if (!payload) {
        throw new Error("Token dari backend tidak valid");
      }

      (await cookies()).set("auth_session", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 7,
        path: "/",
        sameSite: "strict",
      });

      const userRole = payload.Role as string;

      let redirectUrl = "/home";
      if (["admin", "pjl", "sqc", "superadmin"].includes(userRole)) {
        redirectUrl = `/${userRole}/dashboard`;
      }
      return NextResponse.json({
        message: response.data.message || "Login berhasil",
        profile: payload,
        redirectUrl: redirectUrl,
      });
    } catch (error: unknown) {
      let message = "Terjadi Kesalahan, Coba Beberapa Saat Lagi";
      let status = 500;

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          message = error.response.data.message;
        } else if (error.response?.statusText) {
          message = error.response.statusText;
        } else if (error.message) {
          message = error.message;
        }
        status = error.response?.status || 500;
      } else if (error instanceof Error) {
        message = error.message || message;

        if (error.name === "ValidationError") {
          status = 400;
        } else if (error.name === "UnauthorizedError") {
          status = 401;
        } else if (error.name === "ForbiddenError") {
          status = 403;
        } else if (error.name === "NotFoundError") {
          status = 404;
        } else if (error.name === "TimeoutError") {
          status = 408;
          message = "Request timeout, silakan coba lagi";
        }
      } else if (typeof error === "string") {
        message = error;
      } else if (error && typeof error === "object") {
        if ("message" in error && typeof error.message === "string") {
          message = error.message;
        } else if ("error" in error && typeof error.error === "string") {
          message = error.error;
        }

        if ("status" in error && typeof error.status === "number") {
          status = error.status;
        }
      }

      console.error("Error occurred:", {
        error,
        message,
        status,
        stack: error instanceof Error ? error.stack : undefined,
      });

      return NextResponse.json(
        {
          message,
          success: false,
          timestamp: new Date().toISOString(),
        },
        { status },
      );
    }
  }

  if (action === "logout") {
    (await cookies()).delete("auth_session");
    return NextResponse.json({ message: "Logout berhasil" });
  }

  return NextResponse.json({ message: "Aksi tidak valid" }, { status: 400 });
}
