import { Module } from '@nestjs/common';
import { InningsController } from './controller/innings.controller';
import { InningsService } from './service/innings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Innings } from './entity/innings';

@Module({
  imports: [TypeOrmModule.forFeature([Innings])],
  controllers: [InningsController],
  providers: [InningsService]
})
export class InningsModule {}
