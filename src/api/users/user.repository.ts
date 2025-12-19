import prisma from "../../../src/config/db.js";
import { type User, Prisma } from "@prisma/client";

export async function createUser(
  dataUser: Prisma.UserCreateInput
): Promise<User> {
  const newUser = await prisma.user.create({
    data: dataUser,
  });

  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  return user;
}

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  return user;
}
