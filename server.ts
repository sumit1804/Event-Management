import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// register user
app.post("/register", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      name: "sumit",
      username: "sumit1",
      email: "sumit12@gmail.com",
      password: "12345",
    },
  });

  res.status(200).json("registered successfully");
});

// register organiser
app.post("/orgregister", async (req: Request, res: Response) => {
  const organiser = await prisma.organiser.create({
    data: {
      name: "kanha",
      userName: "kanha26",
      email: "kanha@gmail.com",
      password: "12345",
    },
  });
  res.status(200).json("registered successfully");
});

// get all users
app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      username: true,
      email: true,
    },
  });

  res.status(200).json({ users });
});

// add event
// app.post("/addevent", async (req: Request, res: Response) => {
//   const event = await prisma.event.create({});
// });

const PORT = 3001;
app.listen(PORT);
