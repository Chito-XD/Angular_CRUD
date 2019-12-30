import { Component, OnInit, HostBinding } from '@angular/core';

import { Game } from 'src/app/models/Game.model';
import { GamesService } from '../../services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  edit: boolean = false;

  constructor(private gamesServices: GamesService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activeRoute.snapshot.params;
    if (params.id){
      this.gamesServices.getGame(params.id).subscribe(
        res=> {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewGame(){
    // console.log(this.game);
    delete this.game.created_at;
    delete this.game.id;

    this.gamesServices.saveGame(this.game).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['/games']);
      },
      err => console.error(err)
    );
  }

  updateGame() {
    // console.log('hago update');
    // console.log(this.game);
    delete this.game.created_at;
    this.gamesServices.updateGame(this.game.id, this.game ).subscribe(
      res => {
        // console.log(res);
        this.route.navigate(['/games']);
      },
      err => console.error(err)
    )
    
  }

}
