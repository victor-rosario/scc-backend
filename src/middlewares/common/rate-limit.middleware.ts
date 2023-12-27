import { rateLimit } from 'express-rate-limit'

interface LimitRateMiddleware {
    limit?: number,
    minute?: number
}

export const limitRateMiddleware = ({ minute, limit }: LimitRateMiddleware = { minute: 1, limit: 5 }) => rateLimit({
	windowMs: (minute || 5) * 60 * 1000,
	limit,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
    handler: (_req, res, _next, options) => {
        return res.status(429).json({ error: { message: options.message } })
    },
    requestWasSuccessful: (_req, res) =>  res.statusCode < 400,
    message: `Sorry, you have exceeded the attempt limit`
})