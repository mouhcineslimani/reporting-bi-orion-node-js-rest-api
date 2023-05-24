const chartDaoMysql = require("../dao/chart-dao-mysql");

class OrionService {
  constructor(chartDao) {
    this.chartDao = chartDao;
  }

  getData(callback) {
    this.chartDao.select(callback);
  }
}

const orionService = new OrionService(chartDaoMysql);
module.exports = orionService;
