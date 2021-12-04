const Board = require('./board.model');
const taskRepo = require('../tasks/tasks.memory.repository');

let boards = [];

const getAll = () => boards;

const postBoards = (boardData) => {
  const newBoard = new Board(boardData);
  boards = [...boards, newBoard];
  return newBoard;
};

const getBoardById = (id) => {
  const result = boards.find((board) => board.id === id);
  return result;
};

const updateBoardById = (id, newBoardInfo) => {
  const result = boards.find((board) => board.id === id);
  if (result === undefined) return false;

  let boardIndex;
  boards = boards.map((board, index) => {
    if (board.id === id) {
      boardIndex = index;
      return { ...board, ...newBoardInfo };
    }
    return board;
  });
  return boards[boardIndex];
};

const deleteBoardById = (id) => {
  const isExist = getBoardById(id);
  if (isExist === undefined) return false;
  boards = boards.filter((board) => board.id !== id);
  taskRepo.deleteTaskByBoardId(id);
  return true;
};

module.exports = {
  getAll,
  postBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
};
