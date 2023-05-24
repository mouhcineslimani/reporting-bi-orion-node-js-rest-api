class ChartDao {
  constructor() {
    if (new.target == ChartDao) {
      throw new Error("It is an Abstract class. Cannot be Instanciated!");
    }
  }
  select() {
    throw new Error("Must be Implemented!");
  }
}

module.exports = ChartDao; // exporter la classe
