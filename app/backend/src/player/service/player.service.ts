import { Injectable } from '@nestjs/common';
import { PlayerRole, Player, BATTERSTATUS, BOWLERSTATUS, HOWOUT } from '../entity/Player';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {

    constructor(
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
    ) { }

    create (name:string, role: PlayerRole,
        // runs:number,balls_faced: number, overs: number,runs_conceded: number,
        // wickets: number,maidens: number,catches: number, batterstatus: BATTERSTATUS,
        // bowlerstatus: BOWLERSTATUS, howout: HOWOUT
        ){
        // const createdPlayer = this.playerRepository.create({name, role,
        //     runs,balls_faced,overs,runs_conceded,wickets,maidens,catches
        // });
        // return this.playerRepository.save(createdPlayer);
        
    }
}
