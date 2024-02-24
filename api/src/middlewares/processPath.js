async function processPath(req, res, next)
{
    const path = req.params.path || "";
    const remParams = req.params[0] || "";
    
    const fPath = path.concat(remParams);
    
    req.params.path = fPath;
    
    next();
};


module.exports =
{
    processPath,
};