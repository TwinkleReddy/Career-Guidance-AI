import { PrismaClient } from '@prisma/client';
import { sendConfirmationEmail } from '@/app/lib/email';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { slot, email } = await req.json();

    if (!slot || !email) {
      return new Response(JSON.stringify({
        error: 'Missing slot or email',
      }), { status: 400 });
    }

    await prisma.booking.create({ data: { slot } });
    await sendConfirmationEmail(email, slot);

    return new Response(JSON.stringify({
      confirmation: `Meeting booked for ${slot}. Confirmation email sent.`,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Booking Error:", error);
    return new Response(JSON.stringify({
      confirmation: 'There was an issue booking your slot. Please try again.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

