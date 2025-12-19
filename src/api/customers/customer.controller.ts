import type { Request, Response, NextFunction } from "express";
import { success } from "../../../src/utils/response.helper.js";
import { customerService } from "./customer.service.js";
import type {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "../../../src/schemas/customer.schema.js";
import { httpStatus } from "../../../src/utils/api.error.js";
import type { IdParam } from "../../../src/schemas/common.schema.js";

class CustomerController {
  private serviceCustomer = customerService;

  createCustomer = async (
    req: Request<{}, {}, CreateCustomerInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;
      const customer = await this.serviceCustomer.createCustomer(
        userId,
        req.body
      );
      return success(res, customer, httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  };

  getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const customers = await this.serviceCustomer.getCustomers(userId);
      success(res, customers);
    } catch (error) {
      next(error);
    }
  };

  getCustomerById = async (
    req: Request<IdParam>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      const customer = await this.serviceCustomer.getCustomerById(id, userId);
      return success(res, customer);
    } catch (error) {
      next(error);
    }
  };

  updateCustomer = async (
    req: Request<IdParam, {}, UpdateCustomerInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const updated = await this.serviceCustomer.updateCustomer(
        id,
        userId,
        req.body
      );
      return success(res, updated);
    } catch (error) {
      next(error);
    }
  };

  deleteCustomer = async (
    req: Request<IdParam>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      await this.serviceCustomer.deleteCustomer(id, userId);
      return success(res, null, httpStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  };
}

export const customerController = new CustomerController();
