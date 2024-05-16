import * as firebase from '../services/firebase.js'
import AbstractDataObject from './abstractDataObject.DTO.js';

enum CardTypeEnum {
    TASK = "TASK",
    EVENT = "EVENT"
}

interface Card extends AbstractDataObject{
    orderIndex: number;
    title?: string;
    description?: string;
    linksTo: {
        precedes: string;
        follows: string;
    };
    cardType: CardTypeEnum;
}

interface EventCard extends Card {
    cardType: CardTypeEnum.EVENT
    date: Date
}

interface TaskCard extends Card {
    cardType: CardTypeEnum.TASK
    taskDone: Boolean
}


const Card = {
    async create(cardData: Card) {
        return firebase.createData(cardData, "cards")
    },
    
    async getById(cardId: number|string) {
        
        return firebase.getData("cards", cardId.toString())
    },
    
    async update(cardId: string, newData: Partial<Card>) {
        firebase.updateData(newData, "cards", cardId)
    },
    
    async delete(cardId: string) {
        firebase.deleteData("cards", cardId)
    }
};


export { Card, EventCard, TaskCard, CardTypeEnum }
