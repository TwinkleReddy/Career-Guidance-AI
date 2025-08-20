-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "email" TEXT,
ADD COLUMN     "otp" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
