export class CustomError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly nameSpace: string,
    public readonly privateMassage?: string,
  ) {
    super(message);
  }
}
