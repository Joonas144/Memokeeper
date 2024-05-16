import * as firebase from '../services/firebase.js';
import AbstractDataObject from './abstractDataObject.DTO.js';

interface ListReference extends AbstractDataObject{
}

interface BaseBoard extends AbstractDataObject{
    name: string;
    backgroundUrl?: string;
    lists: ListReference[];
}

const Board = {
    async getAll() {
        return await firebase.getData("boards")
    },
    async create(boardData: BaseBoard) {
        return await firebase.createData(boardData, "boards");
    },
    
    async getById(boardId: string) {
        return await firebase.getData("boards", boardId);
    },
    
    async update(boardId: string, newData: Partial<BaseBoard>) {
        await firebase.updateData(newData, "boards", boardId);
    },
    
    async delete(boardId: string) {
        await firebase.deleteData("boards", boardId);
    }
};

export { Board };
