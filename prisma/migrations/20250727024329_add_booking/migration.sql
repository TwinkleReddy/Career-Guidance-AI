-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
