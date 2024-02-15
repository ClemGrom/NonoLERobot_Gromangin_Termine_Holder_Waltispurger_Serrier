const catchAllErrors = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.sendStatus(err);
};

export default catchAllErrors;