import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

//router
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}
}
