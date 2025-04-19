export class APIError extends Error {
  statusCode: number;
  constructor(statusCode = 400, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(404, message);
    this.name = 'NotFoundError';
  }
}
export class BadRequestError extends APIError {
  constructor(message: string) {
    super(400, message);
    this.name = 'BadRequestError';
  }
}
export class UnauthorizedError extends APIError {
  constructor(message: string) {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}
export class ForbiddenError extends APIError {
  constructor(message: string) {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}
export class InternalServerError extends APIError {
  constructor(message: string) {
    super(500, message);
    this.name = 'InternalServerError';
  }
}