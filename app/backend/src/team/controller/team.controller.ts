import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeamService } from '../service/team.service';
import { PlayerRole } from 'src/player/entity/Player';
import { get } from 'http';

@Controller('team')
export class TeamController {

    constructor(
        private teamService : TeamService
    ) { }

    @Post()
    create(@Body() body: { name: string, players: { name: string, role: PlayerRole}[]}) {
      return this.teamService.create(body.name, body.players);
    }

    @Get()
    getAllTeam() {
      return this.teamService.getAllTeam();
    }
    
}
