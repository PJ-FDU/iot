import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Device } from './entities/device.entity';
import { Dlog } from './entities/dlog.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/', 'build'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '39.101.202.79',
      port: 3306,
      username: 'iot',
      password: 'iot2020',
      database: 'iotdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Device, Dlog])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
