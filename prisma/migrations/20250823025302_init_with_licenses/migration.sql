-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."LicenseType" AS ENUM ('PERSONAL', 'COMMERCIAL', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "public"."LicenseStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'SUSPENDED', 'REVOKED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."templates" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "salePrice" DECIMAL(10,2),
    "isOnSale" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT NOT NULL,
    "images" TEXT[],
    "demoUrl" TEXT,
    "downloadUrl" TEXT,
    "technologies" TEXT[],
    "categoryId" TEXT NOT NULL,
    "fileSize" TEXT,
    "version" TEXT,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."licenses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "type" "public"."LicenseType" NOT NULL,
    "status" "public"."LicenseStatus" NOT NULL DEFAULT 'ACTIVE',
    "downloadsCount" INTEGER NOT NULL DEFAULT 0,
    "maxDownloads" INTEGER NOT NULL,
    "downloadLimit" INTEGER NOT NULL DEFAULT 1,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."downloads" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "downloadToken" TEXT NOT NULL,
    "downloadUrl" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "downloadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "downloads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_UserFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserFavorites_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "templates_slug_key" ON "public"."templates"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "public"."categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "orders_stripeSessionId_key" ON "public"."orders"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_templateId_key" ON "public"."reviews"("userId", "templateId");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_userId_templateId_orderId_key" ON "public"."licenses"("userId", "templateId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "downloads_downloadToken_key" ON "public"."downloads"("downloadToken");

-- CreateIndex
CREATE INDEX "_UserFavorites_B_index" ON "public"."_UserFavorites"("B");

-- AddForeignKey
ALTER TABLE "public"."templates" ADD CONSTRAINT "templates_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."licenses" ADD CONSTRAINT "licenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."licenses" ADD CONSTRAINT "licenses_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."licenses" ADD CONSTRAINT "licenses_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."downloads" ADD CONSTRAINT "downloads_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "public"."licenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."downloads" ADD CONSTRAINT "downloads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."downloads" ADD CONSTRAINT "downloads_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFavorites" ADD CONSTRAINT "_UserFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserFavorites" ADD CONSTRAINT "_UserFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
