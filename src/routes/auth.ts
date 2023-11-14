import { Router, Request, Response } from "express";
import { signUp, login } from "../controller/auth.controller";
import { setToken } from "../controller/auth.controller";

const router = Router();

/* this route is for registering new user into the database
data:{
    username: username,
    email: email,
    password: password,
}
*/
router.post("/signup", signUp, setToken);

/* this route is for login the registered user
data:{
    username:username or email:email,
    password: password
}
*/
router.post("/login", login, setToken);

/*this route is to add event a event by user
data:{
    username:username,
    password:password,
    title: title,
    description: 
}
 */
export default router;
