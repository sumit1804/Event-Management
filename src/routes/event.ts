import { Router } from "express";
import { addEvent, allEvents, removeEvent } from "../controller/event.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

/* This route is for adding event by user
   {
     "title": "title",
     "description":"description"
   } 
*/
router.post("/addEvent", verifyToken, addEvent);

/* This route is for getting all events added by user */
router.get("/myEvents", verifyToken, allEvents);

/* This route is for deleting one event
    {
      "eventId":"eventId"
    }
*/
router.delete("/removeEvent", verifyToken, removeEvent)


export default router;
