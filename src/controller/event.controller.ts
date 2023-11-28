import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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
      Eid: event.Eid,
      title: event.title,
      description: event.description,
      message: "event added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const allEvents = async (req: Request, res: Response) => {
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

export const removeEvent = async (req: Request, res: Response) => {
  try {
    console.log("hi from removeEvent");
    const { eventId } = req.body;
    const checkEvent = await prisma.event.findFirst({
      where:{
        Eid:eventId
      },
      select: {
        Eid: true,
        title:true,
        description:true
      },
    });
    if (checkEvent.Eid === eventId) {
      const removeEvent = await prisma.event.delete({
        where: {
          Eid: eventId,
        },
      });
    } else {
      console.log("no such event present");
      return res.status(404).json({
        message: "no such event present",
      });
    }
    return res.status(200).json({
      success: true,
      eventId:checkEvent.Eid,
      title:checkEvent.title,
      description:checkEvent.description,
      message: "event deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
