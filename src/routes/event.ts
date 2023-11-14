import { Router } from "express";
import {
  addEvent,
  addResource,
  allEvents,
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
router.get("/myEvents", verifyToken, allEvents);

/* This route is for adding resources to a particular event of user
   {
        "eventId":"Eid",
        "resoureName":"resourceName",
        "resourceTitle":"resourceTitle"
   } 
*/
router.post("/addResource", verifyToken, addResource);

export default router;
