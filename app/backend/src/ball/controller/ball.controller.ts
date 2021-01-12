import { Controller, Body, Post, Get } from '@nestjs/common';
import { BallService } from '../service/ball.service';
import { Extras, SPECIAL } from '../entity/ball';

@Controller('ball')
export class BallController {
    constructor(
        private ballService: BallService,
    ) { }

    @Post()
    register(@Body() body: { 
        
        ballindex: number,
        legalballindex: number, 
        striker: number,
        nonstriker: number, 
        bowler: number,
        runs:number, 
        wickets: number, 
        over: number,
        extras:Extras,
        special: SPECIAL,
        explanation: string,
        legal: boolean
        matchid: number,

    }) {
      return this.ballService.create(body.ballindex, body.legalballindex,
        body.striker, body.nonstriker, body.bowler, body.runs, body.wickets, body.over,
        body.extras, body.special, body.explanation, body.legal, body.matchid);
    }

    @Get()
    getAllBalls() {
        return this.ballService.getAllBalls();
    }

}
