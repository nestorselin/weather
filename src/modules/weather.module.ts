import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from '../configs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WeatherController } from '../controllers/weather.controller';
import { WeatherService } from '../services/weather.service';
import { WeatherCron } from '../cron/weather.cron';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherEntity } from '../entities/weather.entity';
import { SendService } from '../services/send.service';
import { WeatherRepository } from '../repositories/weather.repository';
import { WeatherProcessor } from '../processors/weather.processor';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'root',
      database: 'course',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([WeatherEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      load: [config],
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
  ],
  exports: [WeatherCron, WeatherService, SendService],
  controllers: [WeatherController],
  providers: [
    SendService,
    WeatherService,
    WeatherCron,
    WeatherRepository,
    WeatherProcessor,
  ],
})
export class WeatherModule {}
