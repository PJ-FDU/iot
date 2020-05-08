import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/all-status')
  async getAllStatus() {
    return await this.appService.getAllStatus();
  }

  @Get('/add-device')
  async addDevice(@Query('phone-number') phoneNumber: string, @Query('info') info: string) {
    return await this.appService.addDevice(phoneNumber, info);
  }

  @Get('/set-log')
  async setLog(@Query('device-id') deviceId: number, @Query('status') status: number) {
    return this.appService.setLog(deviceId, status);
  }
}
