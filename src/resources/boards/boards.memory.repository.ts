// import { BoardType } from "src/ts/types";
import { BoardInterface } from "src/ts/interfaces";
import { tasksRepo } from "../tasks/tasks.memory.repository";
import { Board } from "./board.model";

let boards:[]|Board[] = [];

/**
 * receive all boards from database
 * @returns all boards in database
 */

const getAll = () => boards;

/**
 * create new board in database
 * @param boardData new board data object
 * @returns created board Instance with id
 */

const postBoards = (boardData:BoardInterface) => {
  const newBoard = new Board(boardData);
  boards = [...boards, newBoard];
  return newBoard;
};

/**
 * receive single board from database by id
 * @param id board id string
 * @returns if board exist return it or undefined
 */
const getBoardById = (id:string) => {
  const result = boards.find((board:Board) => board.id === id);
  return result;
};

/**
 * update board data in database by id
 * @param id board id string
 * @param newBoardInfo board data object
 * @returns  IF board exist =>updated bord data object ELSE false
 */

const updateBoardById = (id:string, newBoardInfo:BoardInterface) => {
  const result = boards.find((board:Board) => board.id === id);
  if (result === undefined) return false;

  let boardIndex=0;
  boards = boards.map((board, index) => {
    if (board.id === id) {
      boardIndex = index;
      return { ...board, ...newBoardInfo };
    }
    return board;
  });
  return boards[boardIndex];
};

/**
 * delete board in database by id
 * @param id board id string
 * @returns boolean if board is deleted
 */

const deleteBoardById = (id:string) => {
  const isExist = getBoardById(id);
  if (isExist === undefined) return false;
  boards = boards.filter((board:Board) => board.id !== id);
  tasksRepo.deleteTaskByBoardId(id);
  return true;
};

export const boardRepo= {
  getAll,
  postBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
};
