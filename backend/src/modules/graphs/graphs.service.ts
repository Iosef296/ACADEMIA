import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Graph, GraphRenderType } from './entities/graph.entity';
import { GraphDetectorService } from './detection/graph-detector.service';

@Injectable()
export class GraphsService {
  constructor(
    @InjectRepository(Graph)
    private graphsRepo: Repository<Graph>,
    private detectorService: GraphDetectorService,
  ) {}

  detect(body: { text: string; latex: string }) {
    return this.detectorService.detect(body.text, body.latex);
  }

  generateConfig(extractedFunction: string, type: GraphRenderType): Record<string, any> {
    if (type === GraphRenderType.FUNCTION) {
      return {
        expression: extractedFunction,
        xMin: -10,
        xMax: 10,
        yMin: -10,
        yMax: 10,
        showGrid: true,
        showAxes: true,
      };
    }
    return {};
  }

  async findByExercise(exerciseId: string): Promise<Graph | null> {
    return this.graphsRepo.findOne({ where: { exercise: { id: exerciseId } } });
  }

  async save(data: {
    exerciseId: string;
    type: GraphRenderType;
    config: Record<string, any>;
    is_parametric?: boolean;
  }): Promise<Graph> {
    const existing = await this.findByExercise(data.exerciseId);

    if (existing) {
      existing.type = data.type;
      existing.config = data.config;
      existing.is_parametric = data.is_parametric ?? false;
      return this.graphsRepo.save(existing);
    }

    const graph = this.graphsRepo.create({
      exercise: { id: data.exerciseId },
      type: data.type,
      config: data.config,
      is_parametric: data.is_parametric ?? false,
    });

    return this.graphsRepo.save(graph);
  }

  async update(id: string, config: Record<string, any>): Promise<Graph> {
    const graph = await this.graphsRepo.findOne({ where: { id } });
    if (!graph) throw new NotFoundException('Gráfico no encontrado');
    graph.config = config;
    return this.graphsRepo.save(graph);
  }

  async remove(id: string): Promise<void> {
    const graph = await this.graphsRepo.findOne({ where: { id } });
    if (!graph) throw new NotFoundException('Gráfico no encontrado');
    await this.graphsRepo.remove(graph);
  }
}
