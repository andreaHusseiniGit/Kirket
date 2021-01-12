import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from '../auth/entity/User';
import { Player } from '../player/entity/Player';
import { PlayerModule } from 'src/player/player.module';
import { Team } from 'src/team/entity/team';
import { TeamModule } from 'src/team/team.module';
import { match } from 'assert';
import { MatchModule } from 'src/match/match.module';
import { Match } from 'src/match/entity/match';
import { BallModule } from 'src/ball/ball.module';
import { Ball } from 'src/ball/entity/ball';
import { Innings } from 'src/innings/entity/innings';
import { InningsModule } from 'src/innings/innings.module';
import { Over } from 'src/over/entity/Over';
import { OverModule } from 'src/over/over.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'test',
      entities: [
        User,Player, Team, Match, Ball, Innings, Over
      ],
      synchronize: true,
    }),
    AuthModule,
    PlayerModule,
    TeamModule, 
    MatchModule, 
    BallModule, 
    InningsModule, 
    OverModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
