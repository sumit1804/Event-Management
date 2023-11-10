import { Router } from "express";
import {
  addEvent,
  addResources,
  userEvents,
} from "../controller/event.controller";
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
router.get("/myEvents", verifyToken, userEvents);

/* This route is for adding resources to a particular event of user
   {
        "eventId":"Eid",
        "resoureName":"resourceName",
        "resourceTitle":"resourceTitle"
   } 
*/
router.get("/addResource", verifyToken, addResources);

export default router;
