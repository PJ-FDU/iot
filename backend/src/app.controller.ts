import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/api/all-status')
  async getAllStatus() {
    return await this.appService.getAllStatus();
  }

  @Get('/api/add-device')
  async addDevice(@Query('phone-number') phoneNumber: string, @Query('info') info: string) {
    return await this.appService.addDevice(phoneNumber, info);
  }

  @Get('/api/set-log')
  async setLog(@Query('device-id') deviceId: number) {
    return this.appService.setLog(deviceId)
  }
}
