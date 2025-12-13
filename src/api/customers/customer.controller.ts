import * as service from './customer.service.js';
import type { Request, Response, NextFunction } from 'express';
import { success } from '@/src/utils/response.helper.js';

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {  
    const {user_id} = req.cookies;
    const customer = await service.createCustomer(user_id, req.body);
    return success(res, customer, 201);
} catch (error) {
    next(error);
}
};

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {user_id} = req.cookies;
    const customers = await service.getCustomers(user_id);
    return res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const {user_id} = req.cookies;
  const id = req.params?.id as string;
  const customer = await service.getCustomerById(user_id, id);
    return success(res, customer, 200);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {user_id} = req.cookies;
    const id = req.params?.id as string;

    const updated = await service.updateCustomer(user_id, id, req.body);
    return success(res, updated, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {user_id} = req.cookies;
    const id = req.params?.id as string;

    await service.deleteCustomer(user_id, id);
    return success(res, null, 204);
  } catch (error) {
    next(error);
  }
};