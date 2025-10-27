import config from "../config/env.js";

// Log levels
const LogLevels = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
};

const logLevelPriority = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
};

class Logger {
    constructor() {
        this.level =
            config.nodeEnv === "production" ? LogLevels.INFO : LogLevels.DEBUG;
    }

    shouldLog(level) {
        return logLevelPriority[level] <= logLevelPriority[this.level];
    }

    formatMessage(level, message, meta = {}) {
        const timestamp = new Date().toISOString();
        const metaStr =
            Object.keys(meta).length > 0 ? JSON.stringify(meta) : "";

        return `[${timestamp}] [${level}] ${message} ${metaStr}`;
    }

    error(message, error = null, meta = {}) {
        if (!this.shouldLog(LogLevels.ERROR)) return;

        const errorMeta = error
            ? {
                  ...meta,
                  error: {
                      message: error.message,
                      stack: error.stack,
                      code: error.code,
                  },
              }
            : meta;

        console.error(this.formatMessage(LogLevels.ERROR, message, errorMeta));
    }

    warn(message, meta = {}) {
        if (!this.shouldLog(LogLevels.WARN)) return;
        console.warn(this.formatMessage(LogLevels.WARN, message, meta));
    }

    info(message, meta = {}) {
        if (!this.shouldLog(LogLevels.INFO)) return;
        console.log(this.formatMessage(LogLevels.INFO, message, meta));
    }

    debug(message, meta = {}) {
        if (!this.shouldLog(LogLevels.DEBUG)) return;
        console.log(this.formatMessage(LogLevels.DEBUG, message, meta));
    }

    // Specific log methods for common scenarios
    authLog(action, userId, success, meta = {}) {
        this.info(`Auth: ${action}`, {
            userId,
            success,
            ...meta,
        });
    }

    socketLog(event, userId, socketId, meta = {}) {
        this.debug(`Socket: ${event}`, {
            userId,
            socketId,
            ...meta,
        });
    }

    dbLog(operation, table, success, meta = {}) {
        this.debug(`DB: ${operation} on ${table}`, {
            success,
            ...meta,
        });
    }

    apiLog(method, path, statusCode, duration, meta = {}) {
        const level =
            statusCode >= 500
                ? LogLevels.ERROR
                : statusCode >= 400
                ? LogLevels.WARN
                : LogLevels.INFO;

        const message = `${method} ${path} ${statusCode} ${duration}ms`;

        if (level === LogLevels.ERROR) {
            this.error(message, null, meta);
        } else if (level === LogLevels.WARN) {
            this.warn(message, meta);
        } else {
            this.info(message, meta);
        }
    }
}

export const logger = new Logger();
export default logger;
