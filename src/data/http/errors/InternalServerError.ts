export class InternalServerError extends Error {
  constructor() {
    super("Server error.");

    this.name = "InternalServerError";
  }
}
