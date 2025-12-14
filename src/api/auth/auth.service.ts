import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "@/src/api/users/user.repository.js";
import type { RegisterInput, LoginInput } from "@/src/schemas/auth.schema.js";
import {
  hashPassword,
  validatePassword,
} from "@/src/utils/validate.password.js";
import { ApiError, httpStatus } from "@/src/utils/api.error.js";
import type { Prisma, User } from "@prisma/client";
import { signJwt } from "@/src/utils/jwt.js";

export async function registerUser(
  data: RegisterInput
): Promise<Omit<User, "password_hash">> {
  const existingEmail = await findUserByEmail(data.email);
  if (existingEmail) {
    throw new ApiError("El email está en uso", httpStatus.CONFLICT);
  }

  const existingUsername = await findUserByUsername(data.username);
  if (existingUsername) {
    throw new ApiError("El nombre de usuario está en uso", httpStatus.CONFLICT);
  }

  const hashedPassword = await hashPassword(data.password);

  const dataForPrisma: Prisma.UserCreateInput = {
    ////
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    password_hash: hashedPassword,
  };
  const newUser = await createUser(dataForPrisma);
  const { password_hash, ...userWithOutPassword } = newUser;
  return userWithOutPassword;
}

export async function loginUser(data: LoginInput): Promise<string> {
  const user = await findUserByEmail(data.email);

  if (!user || !(await validatePassword(data.password, user.password_hash))) {
    throw new ApiError("Credenciales Inválidas", httpStatus.UNAUTHORIZED);
  }

  const payload = {
    user_id: user.id,
    is_admin: user.is_admin,
  };

  const token = signJwt(payload, "7d");
  return token;
}
