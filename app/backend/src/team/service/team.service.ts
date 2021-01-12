import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entity/team';
import { Repository } from 'typeorm';
import { PlayerRole, Player } from 'src/player/entity/Player';
import { PlayerService } from 'src/player/service/player.service';

@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        
    ) {}

    async create(teamname: string, players: { name: string, role: PlayerRole}[]){
        const team = this.teamRepository.create({name:teamname})
        const savedTeam = await this.teamRepository.save(team);
        for (const player of players) {
            const {name, role} = player;
            const createdPlayer = this.playerRepository.create({name,role,team:{id:savedTeam.id}});
            // console.log(createdPlayer);
            await this.playerRepository.save(createdPlayer);
        }

        return this.teamRepository.createQueryBuilder("t")
                .leftJoinAndSelect("t.players", "p")
                .where("t.id = :id", { id: savedTeam.id })
                .getMany();

        return savedTeam;
    }
    
    getAllTeam() 
    {
        return this.teamRepository.createQueryBuilder("t")
                .leftJoinAndSelect("t.players", "p")
                .getMany();
    }

}
