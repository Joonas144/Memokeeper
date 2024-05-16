import express from 'express';

import * as listController from '../controllers/listController.js'
const listRouter = express.Router();


listRouter.put(    '/lines',           listController.createList);
listRouter.get(    '/lines/:lineId',   listController.getListById);
listRouter.patch(  '/lines/:lineId',    listController.updateList);
listRouter.delete( '/lines/:lineId',    listController.deleteList);




export default listRouter;