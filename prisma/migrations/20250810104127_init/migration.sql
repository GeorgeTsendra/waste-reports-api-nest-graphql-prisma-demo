-- CreateEnum
CREATE TYPE "public"."ReportType" AS ENUM ('BIN_OVERFLOW', 'ICE', 'TRASH');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'MANAGER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Report" (
    "id" TEXT NOT NULL,
    "type" "public"."ReportType" NOT NULL,
    "title" TEXT NOT NULL,
    "coords" JSONB NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
