import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.request.js";
import { createCustomerSchema, idSchema, updateCustomerSchema } from "@/src/schemas/customer.schema.js";
import * as controller from './customer.controller.js'

const customer_router = Router();

customer_router.post('/', authenticate, validate(createCustomerSchema), controller.createCustomer); //POST/Customer
customer_router.get('/', authenticate, controller.getCustomers); //GET/CUSTOMERS
customer_router.get('/:id', authenticate, validate(idSchema), controller.getCustomerById); //GET/CUSTOMERS/:id
customer_router.put('/:id', authenticate, validate(updateCustomerSchema)); //PUT/CUSTOMERS/:id
customer_router.delete('/:id', authenticate, validate(idSchema), controller.deleteCustomer); //DELETE/CUSTOMERS/:id

export default customer_router;
