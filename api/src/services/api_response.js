const responseService =
{
    statusCodes:
    {
        ok: 200,
        created: 201,
        accepted: 202,
        noContent: 204,
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        invalidToken: 498,
        internalServerError: 500,
        serviceUnavailable: 503,
    },
    
    success(msg, data)
    {
        return {
            success: true,
            msg,
            data,
            status: this.statusCodes.ok,
        };
    },
    
    created(msg)
    {
        return {
            success: true,
            msg,
            status: this.statusCodes.created,
        };
    },
    
    noContent(msg)
    {
        return {
            success: true,
            msg,
            status: this.statusCodes.noContent,
        };
    },
    
    error(msg, error)
    {
        return {
            success: false,
            msg,
            error,
            status: this.statusCodes.badRequest,
        };
    },
    
    unauthorizedError(msg)
    {
        return {
            success: false,
            msg,
            error: "Unauthorized",
            status: this.statusCodes.unauthorized,
        };
    },
    
    forbiddenError(msg)
    {
        return {
            success: false,
            msg,
            error: "Forbidden",
            status: this.statusCodes.forbidden,
        };
    },
    
    notFoundError(msg)
    {
        return {
            success: false,
            msg,
            error: "Not Found",
            status: this.statusCodes.notFound,
        };
    },
    
    invalidTokenError(msg)
    {
        return {
            success: false,
            msg,
            error: "Invalid token",
            status: this.statusCodes.invalidToken,
        };
    },
    
    internalServerError(msg)
    {
        return {
            success: false,
            msg,
            error: "Internal Server Error",
            status: this.statusCodes.internalServerError,
        };
    },
    
    serviceUnavailableError(msg)
    {
        return {
            success: false,
            msg,
            error: "Service Unavailable",
            status: this.statusCodes.serviceUnavailable,
        };
    },
};


module.exports = responseService;