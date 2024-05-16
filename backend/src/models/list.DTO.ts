import * as firebase from '../services/firebase.js';
import AbstractDataObject from './abstractDataObject.DTO.js';

interface CardReference extends AbstractDataObject {
}

interface BaseList extends AbstractDataObject{
    orderIndex: number;
    name: string;
    color: string;
    cards: CardReference[];
}

const List = {
    async create(listData: BaseList) {
        return await firebase.createData(listData, "lists");
    },
    
    async getById(listId: number|string) {
        return await firebase.getData("lists", listId.toString());
    },
    
    async update(listId: string, newData: Partial<BaseList>) {
        await firebase.updateData(newData, "lists", listId);
    },
    
    async delete(listId: string) {
        await firebase.deleteData("lists", listId);
    }
};

export { List };
