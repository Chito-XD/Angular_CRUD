import { Component, OnInit, HostBinding } from '@angular/core';

import { Game } from 'src/app/models/Game.model';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title:'',
    description:'',
    image:'',
    created_at: new Date()
  }

  constructor(private gamesServices: GamesService) { }

  ngOnInit() {
  }

  saveNewGame(){
    // console.log(this.game);
    delete this.game.created_at;
    delete this.game.id;

    this.gamesServices.saveGame(this.game).subscribe(
      res => {
        console.log(res);

      },
      err => console.error(err)
    );
  }

}
