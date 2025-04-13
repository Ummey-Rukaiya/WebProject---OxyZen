import express from "express";
import { getNotes, createNote } from "../controllers/noteController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get('/', userAuth, getNotes);
router.post('/', userAuth, createNote);

export default router;
