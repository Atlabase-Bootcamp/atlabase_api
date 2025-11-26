import * as service from './customer.service.js';
import type { Request, Response } from 'express';

export const createCustomer = async (req: Request, res: Response) => {
    const customer = await service.createCustomer(req.body);
    return res.status(201).json(customer);
};

export const getCustomers = async (_req: Request, res: Response) => {
  const customers = await service.getCustomers();
  return res.json(customers);
};

export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const customer = await service.getCustomerById(id);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  return res.json(customer);
};


export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const updated = await service.updateCustomer(id, req.body);
  return res.json(updated);
};


export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  await service.deleteCustomer(id);
  return res.status(204).send();
};