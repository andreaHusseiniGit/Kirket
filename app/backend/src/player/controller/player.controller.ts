import { Controller, Post, Body } from '@nestjs/common';
import { PlayerRole, BATTERSTATUS, BOWLERSTATUS, HOWOUT } from '../entity/Player';
import { PlayerService } from '../service/player.service';

@Controller('player')
export class PlayerController {

    constructor(
        private playerService: PlayerService,
    ) { }

    @Post()
    register(@Body() body: {name:string, role: PlayerRole,
    //   runs:number,ballsfaced: number, overs: number,runs_conceded: number,
    //   wickets: number,maidens: number,catches: number, 
    // batterstatus: BATTERSTATUS, bowlerstatus:  BOWLERSTATUS, howout: HOWOUT
    }) {
      return this.playerService.create(

        body.name, body.role
        // , 
        // body.runs, body.ballsfaced, body.overs, 
        // body.runs_conceded, body.wickets, body.maidens, body.catches,
        // body.batterstatus, body.bowlerstatus, body.howout
        
        );
    }


}
