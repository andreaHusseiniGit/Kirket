import { Module } from '@nestjs/common';
import { OverController } from './controller/over.controller';
import { OverService } from './service/over.service';
import { Over } from './entity/Over';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Over])],
  controllers: [OverController],
  providers: [OverService]
})
export class OverModule {}
