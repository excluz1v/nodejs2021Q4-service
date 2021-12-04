const bordsRepo = require('./boards.memory.repository');

const getAll = () => {
  const res = bordsRepo.getAll();
  return res;
};

const postBoard = (newBoardData) => {
  const newBoard = bordsRepo.postBoards(newBoardData);
  return newBoard;
};

const getBoardById = (id) => {
  const result = bordsRepo.getBoardById(id);
  if (result === undefined) return false;
  return result;
};

const putBoard = (id, newBoardInfo) => {
  const updatedBoard = bordsRepo.updateBoardById(id, newBoardInfo);
  if (updatedBoard === false) return false;
  return updatedBoard;
};

const deleteBoardById = (id) => {
  const result = bordsRepo.deleteBoardById(id);
  return result;
};

module.exports = {
  getAll,
  postBoard,
  getBoardById,
  putBoard,
  deleteBoardById,
};
