import { Controller, Post, Body, Get } from '@nestjs/common';
import { OverService } from '../service/over.service';

@Controller('over')
export class OverController {
    constructor(
        private overService: OverService,
    ) { }

    @Post()
    register(@Body() body: { 
        innings: number,
        overindex: number,
        runs: number,
        wickets: number,
        


    }) {
      return this.overService.create(body.innings, body.overindex, body.runs, body.wickets);
    }

    @Get()
    getAllOvers(){
        return this.overService.getAllOvers();
    }


}
