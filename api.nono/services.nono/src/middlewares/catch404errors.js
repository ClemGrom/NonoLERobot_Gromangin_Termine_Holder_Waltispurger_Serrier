const catch404errors = (err, req, res, next) => {
    next(404);
};

export default catch404errors;