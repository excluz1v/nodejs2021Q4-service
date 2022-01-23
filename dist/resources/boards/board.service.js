"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardsService = void 0;
const boards_memory_repository_1 = require("./boards.memory.repository");
const getAll = () => {
    const res = boards_memory_repository_1.boardRepo.getAll();
    return res;
};
const postBoard = (newBoardData) => {
    const newBoard = boards_memory_repository_1.boardRepo.postBoards(newBoardData);
    return newBoard;
};
const getBoardById = (id) => {
    const result = boards_memory_repository_1.boardRepo.getBoardById(id);
    if (result === undefined)
        return false;
    return result;
};
const putBoard = (id, newBoardInfo) => {
    const updatedBoard = boards_memory_repository_1.boardRepo.updateBoardById(id, newBoardInfo);
    if (updatedBoard === false)
        return false;
    return updatedBoard;
};
const deleteBoardById = (id) => {
    const result = boards_memory_repository_1.boardRepo.deleteBoardById(id);
    return result;
};
exports.boardsService = {
    getAll,
    postBoard,
    getBoardById,
    putBoard,
    deleteBoardById,
};
//# sourceMappingURL=board.service.js.map