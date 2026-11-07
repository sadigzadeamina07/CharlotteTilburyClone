export class AppError extends Error {
    constructor(
        public statusCode: number,
        public code: string,
        message: string
    ) {
        super(message)
    }
}
//throw new AppError(404, "NOT_FOUND", "Order not found");