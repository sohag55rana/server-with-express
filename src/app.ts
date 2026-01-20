import express, { NextFunction, Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// middleware
app.use(express.json());
// app.use(express.urlencoded());

//initializing DB

initDB();

// logger middleware

app.get("/", logger, (req: Request, res: Response) => {
  res.send("next level development");
});

// users data
app.use("/users", userRoutes);

// todo data
app.use("/todos", todoRoutes);

// auth route
app.use("/auth", authRoutes);

// app.post("/users", async (req: Request, res: Response) => {
//   console.log(req.body);
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

// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);
//     res.status(201).json({
//       success: true,
//       message: "users retrieved Successfully",
//       data: result.rows,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// app.get("/users/:id", async (req: Request, res: Response) => {
//   // console.log(req.params.id)
//   try {
//     const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
//       req.params.id,
//     ]);

//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "file not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "users fetched Successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// app.put("/users/:id", async (req: Request, res: Response) => {
//   // console.log(req.params.id)
//   const { name, email } = req.body;
//   try {
//     const result = await pool.query(
//       `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
//       [name, email, req.params.id]
//     );

//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "file not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "users fetched Successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// app.delete("/users/:id", async (req: Request, res: Response) => {
//   // console.log(req.params.id)
//   try {
//     const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
//       req.params.id,
//     ]);
//     console.log(result);

//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "file not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "users deleted Successfully",
//         data: null,
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// todos crud

// app.post("/todos", async (req: Request, res: Response) => {
//   const { user_id, title } = req.body;
//   try {
//     const result = await pool.query(
//       `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
//       [user_id, title]
//     );
//     res.status(201).json({
//       success: true,
//       message: "Todo Created Successfully",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.get("/todos", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM todos`);
//     res.status(201).json({
//       success: true,
//       message: "todos retrieved Successfully",
//       data: result.rows,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// app.get("/todos/:id", async (req: Request, res: Response) => {
//   // console.log(req.params.id)
//   try {
//     const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [
//       req.params.id,
//     ]);

//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "file not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "todos fetched Successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// app.put("/todos/:id", async (req: Request, res: Response) => {
//   // console.log(req.params.id)
//   const { user_id, title } = req.body;
//   try {
//     const result = await pool.query(
//       `UPDATE todos SET user_id=$1, title=$2 WHERE id=$3 RETURNING *`,
//       [user_id, title, req.params.id]
//     );

//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "file not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "todos fetched Successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

// app.delete("/todos/:id", async (req: Request, res: Response) => {
//   // console.log(req.params.id)
//   try {
//     const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [
//       req.params.id,
//     ]);
//     console.log(result);

//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "file not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "users deleted Successfully",
//         data: null,
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "File Not Found",
    path: req.path,
  });
});

export default app;
