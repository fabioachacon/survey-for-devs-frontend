export class UnauthorizedError extends Error {
  constructor() {
    super("You not authorized to use this resource!");

    this.name = "UnauthorizedError";
  }
}
