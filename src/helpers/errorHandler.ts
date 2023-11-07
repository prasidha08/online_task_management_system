import { STATUS_CODE } from "./statusCode";

class ErrorHandler extends Error {
  public status: number;
  public message: string;

  constructor(message: string, statusCode?: number) {
    super(message);

    this.status = statusCode ?? STATUS_CODE.NOT_FOUND;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
