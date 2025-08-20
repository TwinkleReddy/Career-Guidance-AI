import { PrismaClient } from "@prisma/client";
import { sendOTPEmail } from "@/app/lib/email";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { slot, email } = await req.json();
    if (!slot || !email) {
      return new Response(JSON.stringify({ error: "Missing slot or email" }), {
        status: 400,
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save booking as "pending"
    await prisma.booking.create({
      data: { slot, email, otp, status: "pending" },
    });

    // Send OTP email
    await sendOTPEmail(email, slot, otp);

    return new Response(
      JSON.stringify({
        message: `We sent a verification code to ${email}. Please enter it here to confirm your booking.`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Booking Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to start booking process",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
