import prisma from "../../../src/config/db.js";
import type { Prisma } from "@prisma/client";

class CustomerRepository {
  create = async (data: Prisma.CustomerCreateInput) => {
    return prisma.customer.create({ data });
  };

  findAll = async (userId: string) => {
    return prisma.customer.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });
  };

  findById = async (id: string, userId: string) => {
    return prisma.customer.findUnique({ where: { id, user_id: userId } });
  };

  update = async (
    id: string,
    userId: string,
    data: Prisma.CustomerUpdateInput
  ) => {
    return prisma.customer.update({ where: { id, user_id: userId }, data });
  };

  remove = async (id: string, userId: string) => {
    return prisma.customer.delete({ where: { id, user_id: userId } });
  };
}

export const customerRepository = new CustomerRepository();
