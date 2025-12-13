import type { customerInput, updateCustomerInput } from '@/src/schemas/customer.schema.js';
import * as repository from './customer.repository.js';
import type { Prisma } from '@prisma/client';
import { ApiError, httpStatus } from '@/src/utils/api.error.js';

export const createCustomer = (user_id: string, data: customerInput["body"]) => {
    const prismaData: Prisma.CustomerCreateInput = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        notes: data.notes,
        user: { connect: { id: user_id } },
 };
    return repository.create(prismaData);
};

export const getCustomers = (user_id: string) => {
    return repository.findAll(user_id);
};

export const getCustomerById = async (user_id: string, customer_id: string) => {
    const customer = await repository.findById(customer_id);
    if (!customer) {
        throw new ApiError('Cliente no encontrado', httpStatus.NOT_FOUND);
    }

    if (customer.user_id !== user_id) {
        throw new ApiError('Acceso denegado', httpStatus.FORBIDDEN);
    }
    return customer;
};

export const updateCustomer = async (user_id: string, customer_id: string, data: updateCustomerInput["body"]) => {
  
  const customer = await repository.findById(customer_id);
  if (!customer) {
    throw new ApiError('Customer no encontrado', httpStatus.NOT_FOUND);
  }
  if (customer.user_id !== user_id) {
    throw new ApiError('Acceso denegado', httpStatus.FORBIDDEN);
  }
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    const updateCustomer: Prisma.CustomerUpdateInput = {
      ...filteredData
        };

     return repository.update(customer_id, updateCustomer);
};

export const deleteCustomer = async (userId: string, customerId: string) => {
  const customer = await repository.findById(customerId);

  if (!customer) {
    throw new ApiError('Customer no encontrado', httpStatus.NOT_FOUND);
  }

  if (customer.user_id !== userId) {
    throw new ApiError('Acceso denegado', httpStatus.FORBIDDEN);
  }

  return repository.remove(customerId);
};