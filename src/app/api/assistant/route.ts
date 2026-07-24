import { NextResponse } from "next/server";
import { getAuthenticatedContext } from "@/lib/auth-api";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const authCtx = await getAuthenticatedContext();
    if (!authCtx) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await db.assistantSettings.findUnique({
      where: { clinicId: authCtx.clinic.id },
    });

    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 454 });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET /api/assistant error:", error);
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
      systemPrompt,
      voiceModel,
      widgetColor,
      intakeRequirements,
      temperature,
    } = body;

    const updateData: Record<string, unknown> = {};

    if (systemPrompt !== undefined) updateData.systemPrompt = systemPrompt;
    if (voiceModel !== undefined) updateData.voiceModel = voiceModel;
    if (widgetColor !== undefined) updateData.widgetColor = widgetColor;
    if (intakeRequirements !== undefined) updateData.intakeRequirements = intakeRequirements;
    if (temperature !== undefined) updateData.temperature = parseFloat(temperature);

    const updatedSettings = await db.assistantSettings.update({
      where: { clinicId: authCtx.clinic.id },
      data: updateData,
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("PATCH /api/assistant error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
