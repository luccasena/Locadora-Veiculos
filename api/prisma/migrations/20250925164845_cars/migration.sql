-- CreateTable
CREATE TABLE "public"."Cars" (
    "id" SERIAL NOT NULL,
    "carBrand" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "carCategory" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);
