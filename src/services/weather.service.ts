import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { kelvinToCelsius } from '../helpers/helpers';
import { WeatherRepository } from '../repositories/weather.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TemperatureListener } from '../listeners/temperature.listener';
import { ConfigService } from '@nestjs/config';
import { WeatherEntity } from '../entities/weather.entity';

@Injectable()
export class WeatherService {
  private client: AxiosInstance;
  private readonly openWeatherCityAppId: string;
  private readonly openWeatherBaseUrl: string;
  private readonly temperature: number;

  constructor(
    private readonly weatherRepository: WeatherRepository,
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {
    this.openWeatherCityAppId = this.configService.get<string>(
      'openWeatherCityAppId',
    );
    this.openWeatherBaseUrl = this.configService.get<string>(
      'openWeatherBaseUrl',
    );

    this.client = axios.create({
      baseURL: this.openWeatherBaseUrl,
      params: {
        appId: this.openWeatherCityAppId,
      },
    });

    this.temperature = this.configService.get<number>('temperature');
  }

  async weather(city: string) {
    const response = await this.client.get('weather', {
      params: { q: city },
    });

    const temperatureInKelvin = response?.data?.main?.temp;
    const temperatureInCelsius = kelvinToCelsius(temperatureInKelvin);

    const weather = await this.weatherRepository.save({
      temperature: temperatureInCelsius,
    });

    if (!weather) {
      Logger.debug('Did not save(');
      return;
    }

    Logger.debug(`Weather saved`);

    if (temperatureInCelsius > this.temperature) {
      const event = new TemperatureListener();
      event.temperature = weather.temperature;
      this.eventEmitter.emit('required.temperature', event);
    }
  }

  async getSevenDays(): Promise<WeatherEntity[]> {
    return await this.weatherRepository.getSevenDays();
  }
}
