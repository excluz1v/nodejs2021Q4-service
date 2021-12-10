// import { BoardType } from "src/ts/types";
import { BoardInterface } from "src/ts/interfaces";
import { tasksRepo } from "../tasks/tasks.memory.repository";
import { Board } from "./board.model";

let boards:[]|Board[] = [];

const getAll = () => boards;

const postBoards = (boardData:BoardInterface) => {
  const newBoard = new Board(boardData);
  boards = [...boards, newBoard];
  return newBoard;
};

const getBoardById = (id:string) => {
  const result = boards.find((board:Board) => board.id === id);
  return result;
};

const updateBoardById = (id:string, newBoardInfo:BoardInterface) => {
  const result = boards.find((board:Board) => board.id === id);
  if (result === undefined) return false;

  let boardIndex:number;
  boards = boards.map((board, index) => {
    if (board.id === id) {
      boardIndex = index;
      return { ...board, ...newBoardInfo };
    }
    return board;
  });
  return boards[boardIndex];
};

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
