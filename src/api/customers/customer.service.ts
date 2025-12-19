import type {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "../../../src/schemas/customer.schema.js";
import type { Prisma } from "@prisma/client";
import { ApiError, httpStatus } from "../../../src/utils/api.error.js";
import { customerRepository } from "./customer.repository.js";

class CustomerService {
  private repoCustomer = customerRepository;
  createCustomer = (userId: string, data: CreateCustomerInput) => {
    const prismaData: Prisma.CustomerCreateInput = {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      notes: data.notes,
      user: { connect: { id: userId } },
    };
    return this.repoCustomer.create(prismaData);
  };

  getCustomers = (userId: string) => {
    return this.repoCustomer.findAll(userId);
  };

  getCustomerById = async (customerId: string, userId: string) => {
    const customer = await this.repoCustomer.findById(customerId, userId);
    if (!customer) {
      throw new ApiError("Cliente no encontrado", httpStatus.NOT_FOUND);
    }
    return customer;
  };

  updateCustomer = async (
    customerId: string,
    userId: string,
    data: UpdateCustomerInput
  ) => {
    await this.getCustomerById(customerId, userId);

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    const updateCustomer: Prisma.CustomerUpdateInput = {
      ...filteredData,
    };

    return this.repoCustomer.update(customerId, userId, updateCustomer);
  };

  deleteCustomer = async (customerId: string, userId: string) => {
    await this.getCustomerById(customerId, userId);

    return this.repoCustomer.remove(customerId, userId);
  };
}

export const customerService = new CustomerService();
