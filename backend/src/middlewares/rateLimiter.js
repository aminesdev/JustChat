import { RateLimitError } from "../utils/errors.js";
import config from "../config/env.js";

// Simple in-memory rate limiter (for production, use Redis)
class RateLimiter {
    constructor() {
        this.requests = new Map(); // key -> { count, resetTime }
        this.cleanup();
    }

    cleanup() {
        // Clean up expired entries every minute
        setInterval(() => {
            const now = Date.now();
            for (const [key, data] of this.requests.entries()) {
                if (data.resetTime < now) {
                    this.requests.delete(key);
                }
            }
        }, 60000);
    }

    check(key, maxRequests, windowMs) {
        const now = Date.now();
        const data = this.requests.get(key);

        if (!data || data.resetTime < now) {
            // First request or window expired
            this.requests.set(key, {
                count: 1,
                resetTime: now + windowMs,
            });
            return { allowed: true, remaining: maxRequests - 1 };
        }

        if (data.count >= maxRequests) {
            const retryAfter = Math.ceil((data.resetTime - now) / 1000);
            return {
                allowed: false,
                remaining: 0,
                retryAfter,
            };
        }

        data.count++;
        return {
            allowed: true,
            remaining: maxRequests - data.count,
        };
    }
}

const limiter = new RateLimiter();

// General API rate limiter
export const apiRateLimiter = (req, res, next) => {
    const key = `api:${req.ip}`;
    const result = limiter.check(
        key,
        config.rateLimit.maxRequests,
        config.rateLimit.windowMs
    );

    res.setHeader("X-RateLimit-Limit", config.rateLimit.maxRequests);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    if (!result.allowed) {
        res.setHeader("Retry-After", result.retryAfter);
        return next(
            new RateLimitError("Too many requests, please try again later")
        );
    }

    next();
};

// Auth-specific rate limiter (stricter)
export const authRateLimiter = (req, res, next) => {
    const key = `auth:${req.ip}`;
    const result = limiter.check(
        key,
        config.rateLimit.maxAuthRequests,
        config.rateLimit.authWindowMs
    );

    res.setHeader("X-RateLimit-Limit", config.rateLimit.maxAuthRequests);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    if (!result.allowed) {
        res.setHeader("Retry-After", result.retryAfter);
        return next(
            new RateLimitError(
                "Too many authentication attempts, please try again later"
            )
        );
    }

    next();
};

// Upload rate limiter
export const uploadRateLimiter = (req, res, next) => {
    const userId = req.user?.userId || req.ip;
    const key = `upload:${userId}`;
    const result = limiter.check(
        key,
        config.rateLimit.maxUploadRequests,
        config.rateLimit.uploadWindowMs
    );

    res.setHeader("X-RateLimit-Limit", config.rateLimit.maxUploadRequests);
    res.setHeader("X-RateLimit-Remaining", result.remaining);

    if (!result.allowed) {
        res.setHeader("Retry-After", result.retryAfter);
        return next(
            new RateLimitError(
                "Too many upload requests, please try again later"
            )
        );
    }

    next();
};

// Socket event rate limiter
export class SocketRateLimiter {
    constructor() {
        this.limiter = new RateLimiter();
    }

    check(userId, event, maxEvents = 20, windowMs = 10000) {
        const key = `socket:${userId}:${event}`;
        return this.limiter.check(key, maxEvents, windowMs);
    }
}

export const socketRateLimiter = new SocketRateLimiter();
