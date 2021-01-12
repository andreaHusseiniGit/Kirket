import { Injectable } from '@nestjs/common';
import { Innings, InningsStatus } from '../entity/innings';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { match } from 'assert';

@Injectable()
export class InningsService {
    constructor(
        @InjectRepository(Innings)
        private inningsRepository: Repository<Innings>,
    ) { }

    create (
        matchid: number,
        teambatting: number, 
        teambowling: number
        )

        {
            const createdInnings = this.inningsRepository.create({
                match: {
                    id: matchid
                },
                teamBatting: {
                    id: teambatting
                }, 
                teamBowling: {
                    id: teambowling
                }

            })

            return this.inningsRepository.save(createdInnings);
        
        
    }

    getAllInnings(){
        return this.inningsRepository.createQueryBuilder('i')
                .leftJoinAndSelect('i.match', 'm')
                .leftJoinAndSelect('i.teamBatting', 't1')
                .leftJoinAndSelect('i.teamBowling', 't2')
                .getMany();
                
    }

}
