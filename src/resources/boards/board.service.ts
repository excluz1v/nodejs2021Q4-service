import { BoardInterface } from 'src/ts/interfaces';
import { boardRepo } from './boards.memory.repository';

/**
 * 
 * @returns all boards in database
 */

const getAll = () => {
  const res = boardRepo.getAll();
  return res;
};
/**
 * 
 * @param newBoardData new board data object
 * @returns created board Instance with id
 */

const postBoard = (newBoardData:BoardInterface) => {
  const newBoard = boardRepo.postBoards(newBoardData);
  return newBoard;
};
/**
 * 
 * @param id board id string
 * @returns  if board exist return it or undefined
 */

const getBoardById = (id:string) => {
  const result = boardRepo.getBoardById(id);
  if (result === undefined) return false;
  return result;
};

/**
 * 
 * @param id board id string
 * @param newBoardInfo board data object
 * @returns IF board exist =>updated bord data object ELSE false
 */
const putBoard = (id:string, newBoardInfo:BoardInterface) => {
  const updatedBoard = boardRepo.updateBoardById(id, newBoardInfo);
  if (updatedBoard === false) return false;
  return updatedBoard;
};

/**
 * 
 * @param id  board id string
 * @returns boolean if board is deleted
 */
const deleteBoardById = (id:string) => {
  const result = boardRepo.deleteBoardById(id);
  return result;
};

export const boardsService = {
  getAll,
  postBoard,
  getBoardById,
  putBoard,
  deleteBoardById,
};
