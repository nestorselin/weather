import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('weather')
export class WeatherEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('float')
  temperature: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
