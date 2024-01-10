import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherEntity } from '../entities/weather.entity';
import { Repository } from 'typeorm';
import { sevenDays } from '../helpers/helpers';
import { CreateDto } from '../dto/create.dto';

@Injectable()
export class WeatherRepository {
  constructor(
    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}

  async save(createWeatherInput: CreateDto): Promise<WeatherEntity> {
    return await this.weatherRepository.save<WeatherEntity>(<WeatherEntity>{
      ...createWeatherInput,
    });
  }

  async getSevenDays(): Promise<WeatherEntity[]> {
    return await this.weatherRepository
      .createQueryBuilder('w')
      .select(['temperature'])
      .where('w.created_at >= :dateFrom AND w.created_at <= :dateTo', {
        dateFrom: sevenDays(),
        dateTo: new Date(),
      })
      .getRawMany();
  }
}
