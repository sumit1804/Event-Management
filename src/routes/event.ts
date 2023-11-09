import { Router } from "express";
import { addEvent } from "../controller/event.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/addEvent", verifyToken, addEvent);
