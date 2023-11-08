import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (password.length < 7) {
      return res.status(401).json({
        message: "password length should be more than 6",
      });
    }
    let checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      return res.status(403).json({
        message: "user already exist!",
      });
    }
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    const userData = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    console.log(userData);
    return res.status(200).json({
      message: "user added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error!!!",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    let user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "invalid credentials",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (check) {
      return res.status(200).json({
        message: "user successfully logged in",
      });
    } else {
      return res.status(404).json({
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
