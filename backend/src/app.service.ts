import { Injectable } from '@nestjs/common';
import { Device } from './entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dlog } from './entities/dlog.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
    @InjectRepository(Dlog)
    private dlogsRepository: Repository<Dlog>
  ) { }

  async getAllStatus() {
    return await this.devicesRepository.find();
  }

  async addDevice(phoneNumber: string, info: string) {
    return await this.devicesRepository.insert({ phoneNumber: phoneNumber, info: info, lastLogTime: new Date() })
  }

  async setLog(deviceId: number, status: number) {
    const logTime = new Date();
    await this.dlogsRepository.insert({ deviceId: deviceId, status: status, logTime: logTime });
    await this.devicesRepository.update({ deviceId: deviceId }, { status: status, lastLogTime: logTime });
    return { errcode: 0, errmsg: '', data: {} };
  }


}
