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

  // async getAllStatus() {
  //   return await this.devicesRepository
  //   .createQueryBuilder('device')
  //   .leftJoinAndSelect(Dlog, 'dlog', 'dlog.deviceId = device.deviceId')
  //   .getRawMany();
  // }

  async addDevice(phoneNumber: string, info: string) {
    return await this.devicesRepository.insert({ phoneNumber: phoneNumber, info: info, lastLogTime: new Date() })
  }

  async setLog(deviceId: number, status: number) {
    const logTime = new Date();
    await this.dlogsRepository.insert({ deviceId: deviceId, status: status, logTime: logTime });
    return await this.devicesRepository.update({ deviceId: deviceId }, { lastLogTime: logTime });
  }


}
