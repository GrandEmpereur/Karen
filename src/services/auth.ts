import { RateLimit } from 'koa2-ratelimit';

/**
 * Limits the number of requests to a given number in a given time frame
 * @param {number} max - number - The number of requests allowed in the time frame.
 * @param {number} timeFrameInMinutes - The time frame in minutes in which the limit is applied.
 * @returns A function that takes in two parameters and returns a function.
 */
export const rateLimiter = (max: number, timeFrameInMinutes: number) => {
    return RateLimit.middleware({
        interval: { min: timeFrameInMinutes },
        max: max,
        message: 'Request limit exceeded',
    });
};