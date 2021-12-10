"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRepo = void 0;
const tasks_memory_repository_1 = require("../tasks/tasks.memory.repository");
const board_model_1 = require("./board.model");
let boards = [];
const getAll = () => boards;
const postBoards = (boardData) => {
    const newBoard = new board_model_1.Board(boardData);
    boards = [...boards, newBoard];
    return newBoard;
};
const getBoardById = (id) => {
    const result = boards.find((board) => board.id === id);
    return result;
};
const updateBoardById = (id, newBoardInfo) => {
    const result = boards.find((board) => board.id === id);
    if (result === undefined)
        return false;
    let boardIndex = 0;
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
    if (isExist === undefined)
        return false;
    boards = boards.filter((board) => board.id !== id);
    tasks_memory_repository_1.tasksRepo.deleteTaskByBoardId(id);
    return true;
};
exports.boardRepo = {
    getAll,
    postBoards,
    getBoardById,
    updateBoardById,
    deleteBoardById,
};
//# sourceMappingURL=boards.memory.repository.js.map