-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNum" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "E_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("E_id")
);

-- CreateTable
CREATE TABLE "EventResource" (
    "R_id" SERIAL NOT NULL,
    "resourceName" TEXT NOT NULL,
    "resourcePrice" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventResource_pkey" PRIMARY KEY ("R_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNum_key" ON "User"("mobileNum");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventResource" ADD CONSTRAINT "EventResource_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("E_id") ON DELETE RESTRICT ON UPDATE CASCADE;
