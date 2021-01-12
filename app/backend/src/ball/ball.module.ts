import { Module } from '@nestjs/common';
import { BallService } from './service/ball.service';
import { BallController } from './controller/ball.controller';
import { Ball } from './entity/ball';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Over } from 'src/over/entity/Over';
import { Innings } from 'src/innings/entity/innings';
import { Match } from 'src/match/entity/match';
import { Player } from 'src/player/entity/Player';

@Module({
  imports: [TypeOrmModule.forFeature([Ball,Over, Innings, Match, Player])],
  providers: [BallService],
  controllers: [BallController]
})
export class BallModule {}
