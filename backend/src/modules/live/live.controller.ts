import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LiveService } from './live.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('live/sessions')
@UseGuards(JwtAuthGuard)
export class LiveController {
  constructor(private liveService: LiveService) {}

  @Get()
  findActive() {
    return this.liveService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liveService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  create(@Body() body: { title: string; topicId: string }, @Request() req) {
    return this.liveService.create(body, req.user);
  }

  @Put(':id/end')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  end(@Param('id') id: string) {
    return this.liveService.end(id);
  }
}
