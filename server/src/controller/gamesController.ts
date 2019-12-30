import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

    public async list (req: Request, res: Response): Promise<void> {
        // res.json({text: 'list all games'});
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        // res.json({text: `Get the game ${req.params.id}`})
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if(game.length > 0){
            return res.json(game[0]);
        } 

        res.status(404).json({text: "The game doesn't exits"});
    }

    public async create(req: Request, res: Response): Promise<void>{
        console.log(req.body);
        await pool.query('INSERT INTO games set ? ', [req.body]);
        res.json({message: 'Game created'});
        
    }

    public async delete(req: Request, res: Response): Promise<void> {
        // res.json({text: `deleting game ${req.params.id}`});
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'The game was deleted'});
    }

    public async update(req: Request, res: Response): Promise<void> {
        // res.json({text: `update game ${req.params.id}`});
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The game was updated'});
    }

}

const gamesController = new GamesController();
export default gamesController;

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'chito1999';