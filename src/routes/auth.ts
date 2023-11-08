import { Router } from "express";
import { signUp, login } from "../controller/auth.controller";
import { event } from "../controller/event.controller";

const router = Router();

/* this route is for registering new user into the database
data:{
    username: username,
    email: email,
    password: password,
}
*/
router.post("/signup", signUp);

/* this route is for login the registered user
data:{
    username:username or email:email,
    password: password
}
*/
router.post("/login", login);

/*this route is to add event a event by user
data:{
    username:username,
    password:password,
    title: title,
    description: 
}
 */
router.post("/event", login, event);

export default router;
