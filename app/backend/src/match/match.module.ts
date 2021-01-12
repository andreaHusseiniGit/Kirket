import { Module } from '@nestjs/common';
import { MatchService } from './service/match.service';
import { MatchController } from './controller/match.controller';
import { Match } from './entity/match';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchService],
  controllers: [MatchController]
})
export class MatchModule {}
