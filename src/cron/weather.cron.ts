import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from '../services/weather.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherCron {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async weather(): Promise<void> {
    const city = this.configService.get<string>('openWeatherCity');
    return await this.weatherService.weather(city);
  }
}
