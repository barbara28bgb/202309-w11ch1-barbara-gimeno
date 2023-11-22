import { type NextFunction, type Request, type Response } from "express";
import type { RobotCreateRequest, RobotsRepository } from "../types.js";
import { CustomError } from "../../../server/CustomError/CustomError.js";

class RobotsController {
  constructor(private readonly robotsRepository: RobotsRepository) {}

  public getRobots = async (req: Request, res: Response): Promise<void> => {
    const robots = await this.robotsRepository.getRobots();
    res.status(200).json({ robots });
  };

  public createRobot = async (
    req: RobotCreateRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const robotData = req.body;
    try {
      const newRobot = await this.robotsRepository.createRobot(robotData);
      res.status(201).json({ robot: newRobot });
    } catch (error) {
      const customError = new CustomError(
        "Error creating the new robot",
        500,
        (error as Error).message,
      );
      next(customError);
    }
  };
}
export default RobotsController;
