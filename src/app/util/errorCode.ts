/**
 * Custom error codes to be send to UI to display proper a response
 */
export const ErrorCodes: { [key: string]: CustomError } = {
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "User is not allowed to perform this operation",
    },
    INCORRECT_CREDENTIAL: {
        CODE: "    INCORRECT_CREDENTIAL",
        MESSAGE: "Incorrect username or password",
    },
    USER_NOT_FOUND: {
        CODE: "USER_NOT_FOUND",
        MESSAGE: "User not found",
    },
    EMPLOYEE_WITH_ID_NOT_FOUND: {
        CODE: "EMPLOYEE_WITH_ID_NOT_FOUND",
        MESSAGE: "User with given id not found",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Validation failed error",
    }
};

/**
 * Interface to describe custom errors
 */
export interface CustomError {
    CODE: string;
    MESSAGE: string;
}
