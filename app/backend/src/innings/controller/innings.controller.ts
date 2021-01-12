import { Controller, Post, Body, Get } from '@nestjs/common';
import { InningsService } from '../service/innings.service';
import { InningsStatus } from '../entity/innings';

@Controller('innings')
export class InningsController {

    constructor(
        private inningsService: InningsService,
    ) { }

    @Post()
    register(@Body() body: {
        matchid: number, 
        teambatting: number, 
        teambowling: number, 
    
    }) {
      return this.inningsService.create(
          body.matchid, body.teambatting, body.teambowling
        );
    }

    @Get()
    getAllInnings(){
        return this.inningsService.getAllInnings();

    }


}
