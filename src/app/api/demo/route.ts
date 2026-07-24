import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      practiceName,
      website,
      locations,
      currentPms,
      patientVolume,
      date,
      time,
      notes
    } = body;

    // Validate critical inputs representation
    if (!name || !email || !practiceName || !date || !time) {
      return NextResponse.json(
        { error: "Name, email, practice name, date, and time are required." },
        { status: 400 }
      );
    }

    // Capture in operational stdout logs
    console.log("[PRODUCTION LEAD CAPTURED] Demo Booker:", {
      name,
      email,
      phone: phone || "Not Provided",
      practiceName,
      website: website || "Not Provided",
      locations: locations || "1",
      currentPms: currentPms || "Not Stated",
      patientVolume: patientVolume || "under-100",
      appointmentTime: `${date} at ${time}`,
      notes: notes || "No notes",
      timestamp: new Date().toISOString(),
    });

    // Optional Slack / Telegram / Webhook integration forwarding
    const webhookUrl = process.env.DEMO_NOTIFICATION_WEBHOOK;
    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📆 *New Anvora Demo Scheduled*\n` +
                  `*Name:* ${name}\n` +
                  `*Email:* ${email}\n` +
                  `*Phone:* ${phone || "N/A"}\n` +
                  `*Practice:* ${practiceName}\n` +
                  `*Website:* ${website || "N/A"}\n` +
                  `*Locations:* ${locations}\n` +
                  `*PMS Type:* ${currentPms || "N/A"}\n` +
                  `*Patient Volume:* ${patientVolume}\n` +
                  `*Requested Slot:* ${date} @ ${time}\n` +
                  `*Notes:* ${notes || "None."}`
          }),
        });
      } catch (webhookErr) {
        console.error("Failed to forward demo lead to webhook:", webhookErr);
      }
    }

    return NextResponse.json({ success: true, message: "Demo scheduled successfully." });
  } catch (err) {
    console.error("POST /api/demo error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
