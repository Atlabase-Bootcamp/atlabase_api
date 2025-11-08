// registerUser llama a hashPassword y users.repository.createUser
import { createUser, findUserByEmail } from "@/src/api/users/user.repository.js"
import type { RegisterInput } from "@/src/schemas/auth.schema.js";
import { hashPassword } from "@/src/utils/validate.password.js";
import { ApiError, httpStatus } from "@/src/utils/api.error.js";

async function registerUser(data: RegisterInput) {
    const user = await findUserByEmail(data.email);
    if (user) {
        throw new ApiError("El usuario ya existe", httpStatus.CONFLICT)
    }
    data.password = await hashPassword(data.password);
    return await createUser(data);
}