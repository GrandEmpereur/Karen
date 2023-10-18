import { Context, Next } from 'koa';

/**
 * Middleware for error handling.
 *
 * @param {Context} ctx - Koa Context.
 * @param {Next} next - Next middleware function.
 */
export async function errorMiddleware(ctx: Context, next: Next): Promise<void> {
    try {
        await next();
    } catch (error: any) {
        // Log the error (you can use your logging solution here)
        console.error(error);

        // Set HTTP status code
        ctx.status = error.status || 500;

        // Set response body
        ctx.body = {
            message: error.message || 'Internal Server Error',
        };

        // Optionally: Emit an event with the error, for further processing
        // ctx.app.emit('error', error, ctx);
    }
}
