import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, role, email, password } = req.body;
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "Data Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(201).json({
      success: true,
      message: "users retrieved Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  try {
    const result = await userService.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "file not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "users fetched Successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  const { name, email } = req.body;
  try {
    const result = await userService.updateUser(name, email, req.params.id!);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "file not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "users fetched Successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  try {
    const result = await userService.deleteUser(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "file not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "users deleted Successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
