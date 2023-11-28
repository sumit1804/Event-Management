import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { addResource, getResource, removeResource } from "../controller/resource.controller";
import { HandleDbError } from "../controller/error.controller";


const router = Router();

router.get("/getResource", verifyToken, getResource);


/* This route is for adding resources to a particular event of user
   {
        "eventId":"Eid",
        "resoureName":"resourceName",
        "resourceTitle":"resourceTitle"
   } 
*/
router.post("/addResource", verifyToken, addResource, HandleDbError);

/* This route is to remove resources from eventResource
   {
        "Rid":"resourceId"
   }
 */
router.delete("/removeResource", verifyToken, removeResource);


export default router;