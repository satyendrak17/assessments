function error(message, error, respData) {
    return {
        'message' : message,
        'error_data' : error,
        'response_data' : respData
    };
};

function success(message, error, respData) {
    return {
        'message' : message,
        'error_data' : error,
        'response_data' : respData
    };
};


module.exports = {
    error: error,
    success: success
};