const uuid = require('uuid');
const Column = require('../column/Column.model');

class Board {
  constructor({ id = uuid.v4(), title, columns } = {}) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumn(columns);
  }

  static createColumn(ArrOfColumns) {
    return [...ArrOfColumns].map((col) => new Column(col));
  }
}

module.exports = Board;
