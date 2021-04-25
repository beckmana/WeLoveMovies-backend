const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
  
async function list(req, res) {
    const theatersAndMovies = await service.list()
   
    res.json({data: theatersAndMovies})
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}