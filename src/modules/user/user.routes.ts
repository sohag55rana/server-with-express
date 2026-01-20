import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", userControllers.createUser);
// router.post("/", async (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   try {
//     const result = await pool.query(
//       `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
//       [name, email]
//     );
//     res.status(201).json({
//       success: true,
//       message: "Data Created Successfully",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

router.get("/", logger, auth("admin"), userControllers.getUser);

router.get("/:id", auth("admin", "user"), userControllers.getSingleUser);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
