import { Injectable, Get } from '@nestjs/common';
import { MatchStatus, Result, Match } from '../entity/match';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/player/entity/Player';

@Injectable()
export class MatchService {

    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
    ) { }

    create (
        user: number,
        teamone: number, 
        teamtwo: number, 
        overs:number
        ){
            const createdMatch = this.matchRepository.create({
                user:{
                    id: user
                },
                teamone :{
                    id : teamone
                }, 
                teamtwo:{
                    id : teamtwo
                },
                overs,
                date: new Date()
            })

            
            return this.matchRepository.save(createdMatch);
        // const createdMatch= this.matchRepository.create({date, matchstatus, teamone,teamtwo,result});
        // return this.matchRepository.save(createdMatch);
        
    }

    getAllMatches()
    {
        return this.matchRepository.createQueryBuilder('m')
                .leftJoinAndSelect('m.teamone', 't1')
                .leftJoinAndSelect('m.teamtwo', 't2')
                .getMany();
    }

}
