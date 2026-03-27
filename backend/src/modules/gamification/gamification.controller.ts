import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { BadgesService } from './badges/badges.service';
import { ChallengesService } from './challenges/challenges.service';
import { RewardsService } from './rewards/rewards.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { StudentProfile } from '../users/entities/student-profile.entity';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(
    private badgesService: BadgesService,
    private challengesService: ChallengesService,
    private rewardsService: RewardsService,
    @InjectRepository(Ranking) private rankingRepo: Repository<Ranking>,
    @InjectRepository(StudentProfile) private profilesRepo: Repository<StudentProfile>,
  ) {}

  // Insignias
  @Get('badges')
  getAllBadges() {
    return this.badgesService.findAll();
  }

  @Get('badges/mine')
  getMyBadges(@Request() req) {
    return this.badgesService.findMine(req.user.id);
  }

  // Desafíos semanales
  @Get('challenges')
  getActiveChallenges() {
    return this.challengesService.findActive();
  }

  @Get('challenges/:id')
  getChallenge(@Param('id') id: string) {
    return this.challengesService.findOne(id);
  }

  @Post('challenges')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  createChallenge(@Body() body: any) {
    return this.challengesService.create(body);
  }

  @Post('challenges/:id/submit')
  submitChallenge(@Param('id') id: string, @Body('score') score: number, @Request() req) {
    return this.challengesService.submit(id, req.user.id, score);
  }

  // Recompensas
  @Get('rewards/mine')
  getMyRewards(@Request() req) {
    return this.rewardsService.findMine(req.user.id);
  }

  @Post('rewards/:id/use')
  useReward(@Param('id') id: string, @Request() req) {
    return this.rewardsService.use(id, req.user.id);
  }

  // Ranking
  @Get('ranking')
  async getRanking() {
    const week = this.getCurrentWeek();
    return this.rankingRepo.find({
      where: { week },
      relations: ['user'],
      order: { score: 'DESC' },
      take: 50,
    });
  }

  @Put('ranking/visibility')
  async setRankingVisibility(@Request() req, @Body('visible') visible: boolean) {
    const profile = await this.profilesRepo.findOne({ where: { user: { id: req.user.id } } });
    if (profile) {
      profile.ranking_visible = visible;
      await this.profilesRepo.save(profile);
    }
    return { ranking_visible: visible };
  }

  private getCurrentWeek(): string {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
  }
}
