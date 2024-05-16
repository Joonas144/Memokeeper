import { NextFunction, Request, Response } from 'express';
import { Card } from '../models/card.DTO.js';

export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.CardId.toString();

    Card.getById(objectId).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error.message)
    });
}

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.CardId.toString();

    Card.delete(objectId).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error.message)
    })
}

export const updateCard = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.CardId.toString();
    const newData = req.body;

    try {
        Card.update(objectId, newData).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            next(error.message)
        })
    } catch (error) {
        next(error)
    }
}

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
    const newData = req.body;

    try {
        Card.create(newData).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            next(error.message)
        })
    } catch (error) {
        next(error)
    }
}