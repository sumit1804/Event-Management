import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addResource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Eid, resourceName, resourcePrice } = req.body;
    const events = await prisma.event.findFirst({
      where: {
        Eid: Eid,
      },
    });

    const eventupdate = await prisma.event.update({
      where: {
        Eid: events.Eid,
      },
      data: {
        Resources: {
          create: {
            resourceName: resourceName,
            resourcePrice: resourcePrice,
          },
        },
      },
    });
    console.log("Hi from addResource");
    return res.status(200).json({
      message: "resource added successfully",
      Name: resourceName,
      Price: resourcePrice,
    });
  } catch (error) {
    console.log(error.code);
    res.locals.error = {
      code: error.code,
      target: error.meta.target,
    };
    return next();
  }
};

export const removeResource = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.body;
    const checkResource = await prisma.eventResource.findFirst({
      where: {
        Rid: resourceId,
      },
      select: {
        Rid: true,
        resourceName: true,
        resourcePrice: true,
      },
    });
    const removeResource = await prisma.eventResource.delete({
      where: {
        Rid: checkResource.Rid,
      },
    });
    return res.status(200).json({
      success: true,
      Rid: checkResource.Rid,
      resourceName: checkResource.resourceName,
      resourcePrice: checkResource.resourcePrice,
      message: "resource deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getResource = async (req: Request, res: Response) => {
  const { Rid } = req.body;
  const resource = await prisma.eventResource.findFirst({
    where: {
      Rid: Rid,
    },
    select: {
      eventId:true,
      Rid:true,
      resourceName:true,
      resourcePrice:true
    },
  });
  return res.status(200).json({
    success: true,
    eventId: resource.eventId,
    Rid: resource.Rid,
    resourceName: resource.resourceName,
    resourcePrice: resource.resourcePrice,
    message: "resource found successfully",
  });
};
