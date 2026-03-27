import { Controller, Get, Put, Param, UseGuards, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    @InjectRepository(Notification) private notificationsRepo: Repository<Notification>,
  ) {}

  @Get()
  findAll(@Request() req) {
    return this.notificationsRepo.find({
      where: { user: { id: req.user.id } },
      order: { created_at: 'DESC' },
      take: 50,
    });
  }

  @Put(':id/read')
  async markRead(@Param('id') id: string) {
    await this.notificationsRepo.update(id, { read_at: new Date() });
    return { success: true };
  }

  @Put('read-all')
  async markAllRead(@Request() req) {
    await this.notificationsRepo.update(
      { user: { id: req.user.id }, read_at: IsNull() },
      { read_at: new Date() },
    );
    return { success: true };
  }
}
