import { NextFunction, Request, Response } from 'express';
import { Board } from "../models/board.DTO.js";


export const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    Board.getAll().then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error.message)
    });
}

export const getBoardById = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.boardId.toString();

    Board.getById(objectId).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error.message)
    });
}

export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.boardId.toString();

    Board.delete(objectId).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error.message)
    })
}

export const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    const objectId = req.params.boardId.toString();
    const newData = req.body;

    try {
        Board.update(objectId, newData).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            next(error.message)
        })
    } catch (error) {
        next(error)
    }
}

export const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    const newData = req.body;

    try {
        Board.create(newData).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            next(error.message)
        })
    } catch (error) {
        next(error)
    }
}