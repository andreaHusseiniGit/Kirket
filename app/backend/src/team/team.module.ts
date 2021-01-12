import { Module } from '@nestjs/common';
import { TeamController } from './controller/team.controller';
import { TeamService } from './service/team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/team';
import { Player } from 'src/player/entity/Player';


@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Player]),
  ],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
