import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, practiceName, website, subject, message } = body;

    // Validate email and name presence
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    // Capture in server production logs (guarantees lead visibility in Vercel log dashboard)
    console.log("[PRODUCTION LEAD CAPTURED] Contact Inquiry:", {
      name,
      email,
      phone: phone || "Not Provided",
      practiceName: practiceName || "Not Provided",
      website: website || "Not Provided",
      subject: subject || "sales",
      message: message || "Not Provided",
      timestamp: new Date().toISOString(),
    });

    // Optional Slack / Telegram / Webhook integration dispatch
    const webhookUrl = process.env.CONTACT_NOTIFICATION_WEBHOOK;
    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🦷 *New Anvora Contact Inquiry*\n` +
                  `*Name:* ${name}\n` +
                  `*Email:* ${email}\n` +
                  `*Phone:* ${phone || "N/A"}\n` +
                  `*Practice:* ${practiceName || "N/A"}\n` +
                  `*Website:* ${website || "N/A"}\n` +
                  `*Inquiry Nature:* ${subject.toUpperCase()}\n` +
                  `*Message:* ${message || "No message."}`
          }),
        });
      } catch (webhookErr) {
        console.error("Failed to forward lead to webhook:", webhookErr);
      }
    }

    return NextResponse.json({ success: true, message: "Inquiry received successfully." });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
