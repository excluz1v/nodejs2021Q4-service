import { BoardInterface } from 'src/ts/interfaces';
import { boardRepo } from './boards.memory.repository';

const getAll = () => {
  const res = boardRepo.getAll();
  return res;
};

const postBoard = (newBoardData:BoardInterface) => {
  const newBoard = boardRepo.postBoards(newBoardData);
  return newBoard;
};

const getBoardById = (id:string) => {
  const result = boardRepo.getBoardById(id);
  if (result === undefined) return false;
  return result;
};

const putBoard = (id:string, newBoardInfo:BoardInterface) => {
  const updatedBoard = boardRepo.updateBoardById(id, newBoardInfo);
  if (updatedBoard === false) return false;
  return updatedBoard;
};

const deleteBoardById = (id:string) => {
  const result = boardRepo.deleteBoardById(id);
  return result;
};

export const boardService = {
  getAll,
  postBoard,
  getBoardById,
  putBoard,
  deleteBoardById,
};
