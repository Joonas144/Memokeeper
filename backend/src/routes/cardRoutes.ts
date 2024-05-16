import express from 'express';
import * as cardController from '../controllers/cardController.js'

const cardRouter = express.Router();

cardRouter.put(    '/lines',            cardController.createCard);
cardRouter.get(    '/lines/:lineId',    cardController.getCardById);
cardRouter.patch(  '/lines/:lineId',    cardController.updateCard);
cardRouter.delete( '/lines/:lineId',    cardController.deleteCard);

export default cardRouter;