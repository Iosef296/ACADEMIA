import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphsService } from './graphs.service';
import { GraphsController } from './graphs.controller';
import { Graph } from './entities/graph.entity';
import { GraphDetectorService } from './detection/graph-detector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Graph])],
  providers: [GraphsService, GraphDetectorService],
  controllers: [GraphsController],
  exports: [GraphsService, GraphDetectorService],
})
export class GraphsModule {}
