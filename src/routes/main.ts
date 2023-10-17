import Router, { RouterContext } from 'koa-router';
import koaBody from 'koa-body';

// Services
import { rateLimiter} from '../services/auth';

const ROUTER_OPTIONS = {
    prefix: '/',
};

export default new Router(ROUTER_OPTIONS)
    .get('/', rateLimiter(5, 1), koaBody(), async (ctx: RouterContext): Promise<any> => {
        ctx.body = {
            message: 'Hello World! bb',
        };
        return;
    });
