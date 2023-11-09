import express, { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.headers);
    const accessToken = req.headers.authorization.split(" ")[1];

    console.log(accessToken);

    const data: any = await Jwt.verify(accessToken, process.env.JWT_SECRET!);
    const userId = data.id;

    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobileNum: true,
      },
    });

    res.locals.currentUser = {
      id: userDetails!.id,
      name: userDetails!.name,
      email: userDetails!.email,
      mobileNum: userDetails!.mobileNum,
    };
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};
