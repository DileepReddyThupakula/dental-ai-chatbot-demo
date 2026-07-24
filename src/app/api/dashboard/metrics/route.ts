import { NextResponse } from "next/server";
import { getAuthenticatedContext } from "@/lib/auth-api";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const authCtx = await getAuthenticatedContext();
    if (!authCtx) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clinicId = authCtx.clinic.id;

    // Count real database rows
    const totalConversations = await db.conversation.count({
      where: { clinicId },
    });

    const totalSyncedBookings = await db.appointmentReservation.count({
      where: {
        clinicId,
        syncStatus: "SUCCESS",
      },
    });

    const pendingBookings = await db.appointmentReservation.count({
      where: {
        clinicId,
        syncStatus: "PENDING",
      },
    });

    // Return true database row counts
    const conversationsCount = totalConversations;
    const bookingsCount = totalSyncedBookings;
    const pendingCount = pendingBookings;

    const hoursSavedVal = Number(((conversationsCount * 2.5 + bookingsCount * 15) / 60).toFixed(1));

    return NextResponse.json({
      totalConversations: conversationsCount,
      totalSyncedBookings: bookingsCount,
      pendingBookings: pendingCount,
      hoursSaved: hoursSavedVal,
      pmsSyncStatus: authCtx.clinic.pmsSyncStatus,
      pmsType: authCtx.clinic.pmsType || "DENTRIX",
      clinicName: authCtx.clinic.name,
    });
  } catch (error) {
    console.error("GET /api/dashboard/metrics error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
