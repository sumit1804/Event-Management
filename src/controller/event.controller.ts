import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { Uid } = await res.locals.currentUser;
    const { title, description } = req.body;
    const event = await prisma.event.create({
      data: {
        userId: Uid,
        title: title,
        description: description,
      },
    });
    console.log(event);
    return res.status(200).json({
      message: "event added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const userEvents = async (req: Request, res: Response) => {
  try {
    const { Uid } = await res.locals.currentUser;
    const allevent = await prisma.event.findMany({
      where: {
        userId: Uid,
      },
      select: {
        Eid: true,
        title: true,
        description: true,
        Resources: true,
      },
    });
    if (!allevent) {
      return res.status(204).json({
        message: "no events added",
      });
    }
    return res.status(200).json({
      allevent: allevent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const addResources = async (req: Request, res: Response) => {
  try {
    const { Eid, resourceName, resourcePrice } = req.body;

    const addResources = await prisma.eventResource.create({
      data: {
        eventId: Eid,
        resourceName: resourceName,
        resourcePrice: resourcePrice,
      },
    });
    return res.status(200).json({
      message: "resource added successfully",
      Name: `${resourceName}`,
      Price: `${resourcePrice}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "internal server error",
    });
  }
};
