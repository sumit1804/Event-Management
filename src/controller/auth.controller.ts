import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const setToken = async (req: Request, res: Response) => {
  try {
    const userData = res.locals.user;
    // generating a accessToken
    const accessToken = jwt.sign(
      {
        id: userData!.id,
        email: userData!.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME),
      }
    );
    return res.status(200).json({
      userData: userData,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, mobileNum, name } = req.body;

    if (password.length < 7) {
      return res.status(401).json({
        message: "password length should be more than 6",
      });
    }
    let checkUser = await prisma.user.findFirst({
      where: {
        email: email,
        mobileNum: mobileNum,
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
        name: name,
        mobileNum: mobileNum,
        email: email,
        password: hashPassword,
      },
    });

    res.locals.user = {
      Uid: userData!.Uid,
      email: userData!.email,
      name: userData!.name,
      mobileNum: userData!.name,
    };
    return next();
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
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({
        message: "invalid credentials",
      });
    }

    res.locals.user = {
      Uid: user!.Uid,
      email: user!.email,
      name: user!.name,
      mobileNum: user!.mobileNum,
    };
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
