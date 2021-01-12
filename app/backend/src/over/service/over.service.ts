import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Over } from '../entity/Over';

@Injectable()
export class OverService {

    constructor(
        @InjectRepository(Over)
        private overRepository: Repository<Over>,
    ) { }

    create (
        inningsid: number,
        overindex: number, 
        runs: number, 
        wickets: number
        ){
        const createdOver= this.overRepository.create({
            innings :{
                id: inningsid
            },
            overindex, runs, wickets
        });
        return this.overRepository.save(createdOver);
    }

    getAllOvers()
    {
        return this.overRepository.createQueryBuilder('o')
                .leftJoinAndSelect('o.innings', 'i')
                .getMany();
    }

}
