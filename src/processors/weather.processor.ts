import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TemperatureListener } from '../listeners/temperature.listener';
import { ConfigService } from '@nestjs/config';
import { SendService } from '../services/send.service';

@Injectable()
export class WeatherProcessor {
  constructor(
    private readonly configService: ConfigService,
    private readonly sendService: SendService,
  ) {}

  @OnEvent('required.temperature', { async: true })
  async handleOrderCreatedEvent(event: TemperatureListener): Promise<void> {
    const temperature = event.temperature;
    await this.sendService.sendMessage(temperature);
  }
}
