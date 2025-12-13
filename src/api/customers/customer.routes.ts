import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.request.js";
import { createCustomerSchema, idSchema, updateCustomerSchema } from "@/src/schemas/customer.schema.js";
import * as controller from './customer.controller.js'

const customer_router = Router();

customer_router.post('/customers/', authenticate, validate(createCustomerSchema), controller.createCustomer); //POST/Customer
customer_router.get('/customers/', authenticate, controller.getCustomers); //GET/CUSTOMERS
customer_router.get('/customers/:id', authenticate, validate(idSchema), controller.getCustomerById); //GET/CUSTOMERS/:id
customer_router.put('/customers/:id', authenticate, validate(updateCustomerSchema), controller.updateCustomer); //PUT/CUSTOMERS/:id
customer_router.delete('/customers/:id', authenticate, validate(idSchema), controller.deleteCustomer); //DELETE/CUSTOMERS/:id

export default customer_router;
