import { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail } from "@/app/lib/email";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    const booking = await prisma.booking.findFirst({
      where: { email, otp, status: "pending" },
    });

    if (!booking) {
      return new Response(JSON.stringify({ success: false, error: "Invalid OTP" }), {
        status: 400,
      });
    }

    // Mark as confirmed
    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "confirmed" },
    });

    // Send final confirmation email
    await sendConfirmationEmail(email, booking.slot);

    return new Response(
      JSON.stringify({
        success: true,
        message: `✅ Booking confirmed for ${booking.slot}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to verify OTP" }),
      { status: 500 }
    );
  }
}
