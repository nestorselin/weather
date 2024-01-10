import { NestFactory } from '@nestjs/core';
import { WeatherModule } from './modules/weather.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(WeatherModule);
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('WEATHER')
    .setDescription('weather')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  useContainer(app.select(WeatherModule), {
    fallback: true,
    fallbackOnErrors: true,
  });
  await app.listen(configService.get<number>('appPort'));
}
bootstrap();
