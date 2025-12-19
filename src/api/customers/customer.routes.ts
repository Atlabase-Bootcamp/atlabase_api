import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.request.js";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../../../src/schemas/customer.schema.js";
import { customerController } from "./customer.controller.js";
import type { IdParam } from "../../../src/schemas/common.schema.js";

const customer_router = Router();

customer_router.get("/customers/", authenticate, (req, res, next) =>
  customerController.getCustomers(req, res, next)
);
customer_router.get<IdParam>("/customers/:id", authenticate, (req, res, next) =>
  customerController.getCustomerById(req, res, next)
);
customer_router.post(
  "/customers/",
  authenticate,
  validate(createCustomerSchema),
  (req, res, next) => customerController.createCustomer(req, res, next)
);
customer_router.put<IdParam>(
  "/customers/:id",
  authenticate,
  validate(updateCustomerSchema),
  (req, res, next) => customerController.updateCustomer(req, res, next)
);
customer_router.delete<IdParam>(
  "/customers/:id",
  authenticate,
  (req, res, next) => customerController.deleteCustomer(req, res, next)
);

export default customer_router;
