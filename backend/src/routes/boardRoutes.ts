import express from 'express';
import * as boardController from '../controllers/boardController.js'

const boardRouter = express.Router();

boardRouter.get(    '/boards',              boardController.getBoards);
boardRouter.put(    '/boards/',             boardController.createBoard);
boardRouter.patch(  '/boards/:boardId',     boardController.updateBoard);
boardRouter.get(    '/boards/:boardId',     boardController.getBoardById);
boardRouter.delete( '/boards/:boardId',     boardController.deleteBoard);


export default boardRouter;