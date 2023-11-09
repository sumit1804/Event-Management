import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, title, description } = req.body;
    const event = await prisma.event.create({
      data: {
        creator: id,
        title: title,
        description: description,
      },
    });
    return res.status(200).json({
      message: "event added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const eventResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { E_id, resourceName, resourcePrice } = req.body;
    const eventResources = await prisma.eventResource.create({
      data: {
        eventId: E_id,
        resourceName: resourceName,
        resourcePrice: resourcePrice,
      },
    });
    return res.status(200).json({
      message: "resource added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
