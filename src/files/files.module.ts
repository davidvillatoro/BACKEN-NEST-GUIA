import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ //importamos modulo de file para que lo  puedan usar en otros modulos provider
    ConfigModule
  ],
})
export class FilesModule {} 
