const { default: trimAll } = require("get-trim-all")

const trimAllDataMD = (req, res, next) => {
    req.body = trimAll(req.body);
    req.query = trimAll(req.query);
    req.params = trimAll(req.params);
    next();
}

module.exports = trimAllDataMD