import { NextResponse } from "next/server";
import { getAuthenticatedContext } from "@/lib/auth-api";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const authCtx = await getAuthenticatedContext();
    if (!authCtx) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(authCtx.clinic);
  } catch (error) {
    console.error("GET /api/clinic error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const authCtx = await getAuthenticatedContext();
    if (!authCtx) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      operatingHours,
      timezone,
      pmsType,
      pmsApiEndpoint,
      licenseKey,
    } = body;

    // Build update payload
    const updateData: Record<string, unknown> = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (operatingHours !== undefined) updateData.operatingHours = operatingHours;
    if (timezone !== undefined) updateData.timezone = timezone;
    if (pmsType !== undefined) updateData.pmsType = pmsType;
    if (pmsApiEndpoint !== undefined) updateData.pmsApiEndpoint = pmsApiEndpoint;
    if (licenseKey !== undefined) updateData.licenseKey = licenseKey;

    const updatedClinic = await db.clinic.update({
      where: { id: authCtx.clinic.id },
      data: updateData,
    });

    return NextResponse.json(updatedClinic);
  } catch (error) {
    console.error("PATCH /api/clinic error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
