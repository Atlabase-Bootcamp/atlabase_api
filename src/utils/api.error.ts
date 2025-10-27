export const httpStatus = {
  // Successful responses
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  200: "OK",
  201: "Created",
  204: "No Content",

  // Client error responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",

  // Server error responses
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
} as const;

export class ApiError extends Error {
  statusText: string;
  statusCode: number;
  additionalData: Record<string, unknown> = {};
  isOperational: boolean = true;

  constructor(
    message: string,
    statusCode: number,
    additionalData: Record<string, unknown> = {},
    isOperational: boolean = true,
    stack?: string
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.statusText = httpStatus[
      statusCode as keyof typeof httpStatus
    ] as string;
    this.additionalData = additionalData;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
