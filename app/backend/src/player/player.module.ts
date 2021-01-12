import { Module } from '@nestjs/common';
import { PlayerController } from './controller/player.controller';
import { PlayerService } from './service/player.service';
import { Player } from './entity/Player';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
