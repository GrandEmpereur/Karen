import Router, { RouterContext } from 'koa-router';
import koaBody from 'koa-body';

// Services
import { rateLimiter } from '../middlewares/rateLimitMiddleware';
import { createNewProject } from '../services/mongoose.services';

const ROUTER_OPTIONS = {
    prefix: '/api/v1',
};

export default new Router(ROUTER_OPTIONS)
    .get('/status', rateLimiter(5, 1), koaBody(), async (ctx: RouterContext): Promise<unknown> => {

        try {

            await createNewProject();
            return ctx.body = {
                status: 'ok',
                actions: '0',
            };
        } catch (error) {
            console.error(error);
        }

        return ctx.body = {
            status: 'ok',
            actions: '1',
        };
    });
