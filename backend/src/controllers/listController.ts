import { NextFunction, Request, Response } from 'express';
import { List } from '../models/list.DTO';

export const getListById = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.ListId.toString();

    List.getById(objectId).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error.message)
    });
}

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.ListId.toString();

    List.delete(objectId).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error.message)
    })
}

export const updateList = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.ListId.toString();
    const newData = req.body;

    try {
        List.update(objectId, newData).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            next(error.message)
        })
    } catch (error) {
        next(error)
    }
}

export const createList = async (req: Request, res: Response, next: NextFunction) => {
    const newData = req.body;

    try {
        List.create(newData).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            next(error.message)
        })
    } catch (error) {
        next(error)
    }
}