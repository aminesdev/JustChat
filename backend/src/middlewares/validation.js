import { badRequestResponse } from "../utils/responseHandler.js";

export const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");

            return badRequestResponse(res, errorMessage);
        }

        if (property === "body") {
            req.body = schema.validate(req.body).value;
        }

        next();
    };
};

export const validateParams = (schema) => validate(schema, "params");

export const validateQuery = (schema) => validate(schema, "query");
