import { Request, NextFunction, Response } from "express";

export const HandleDbError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*
            res.locals.error : 
            {
                code : ''
                target : []
            }

        */

    const errorCode = res.locals.error.code;
    const target: Array<Number> = res.locals.error.target;
    let error_message = "";

    switch (errorCode) {
      case "P2002": {
        if (target.length >= 2) {
          error_message = `${target.toString} are required field`;
        } else {
          error_message = `${target[0]} is a required field`;
        }
      }
    }

    return res.status(400).json({
      success: false,
      message: error_message,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server error ",
    });
  }
};
