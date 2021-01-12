import { Controller, Post, Body, Get } from '@nestjs/common';
import { MatchService } from '../service/match.service';
import { MatchStatus, Result } from '../entity/match';

@Controller('match')
export class MatchController {

    constructor(
        private matchService: MatchService,
    ) { }

    @Post()
    register(@Body() body: { 
        user:number,
        teamone: number, 
        teamtwo: number, 
        overs: number

    }) {
      return this.matchService.create( body.user, body.teamone, body.teamtwo, 
        body.overs);
    }
    
    @Get()
    getAllMatches(){
        return this.matchService.getAllMatches();
    }

}
