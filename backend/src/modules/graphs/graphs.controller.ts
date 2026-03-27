import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { GraphRenderType } from './entities/graph.entity';

@Controller('graphs')
@UseGuards(JwtAuthGuard)
export class GraphsController {
  constructor(private graphsService: GraphsService) {}

  @Post('detect')
  detect(@Body() body: { text: string; latex: string }) {
    return this.graphsService.detect(body);
  }

  @Post('generate')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  generate(@Body() body: { extractedFunction: string; type: GraphRenderType }) {
    return this.graphsService.generateConfig(body.extractedFunction, body.type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphsService.findByExercise(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  save(@Body() body: { exerciseId: string; type: GraphRenderType; config: Record<string, any>; is_parametric?: boolean }) {
    return this.graphsService.save(body);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body: { config: Record<string, any> }) {
    return this.graphsService.update(id, body.config);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.graphsService.remove(id);
  }
}
