import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './entities/user.entity';
import { StudentProfile } from './entities/student-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(StudentProfile)
    private profilesRepo: Repository<StudentProfile>,
  ) {}

  async create(data: { name: string; email: string; password: string; role?: UserRole }): Promise<User> {
    const exists = await this.usersRepo.findOne({ where: { email: data.email } });
    if (exists) throw new ConflictException('El email ya está registrado');

    const password_hash = await bcrypt.hash(data.password, 10);
    const user = this.usersRepo.create({
      name: data.name,
      email: data.email,
      password_hash,
      role: data.role ?? UserRole.STUDENT,
    });

    const saved = await this.usersRepo.save(user);

    if (saved.role === UserRole.STUDENT) {
      const profile = this.profilesRepo.create({ user: saved });
      await this.profilesRepo.save(profile);
    }

    return saved;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email }, relations: ['profile'] });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id }, relations: ['profile'] });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find({ relations: ['profile'] });
  }

  async updateProfile(id: string, data: { name?: string }): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    Object.assign(user, data);
    return this.usersRepo.save(user);
  }

  async updateAvatar(userId: string, avatarConfig: Record<string, any>): Promise<StudentProfile> {
    const profile = await this.profilesRepo.findOne({ where: { user: { id: userId } } });
    if (!profile) throw new NotFoundException('Perfil no encontrado');
    profile.avatar_config = avatarConfig;
    return this.profilesRepo.save(profile);
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    user.role = role;
    return this.usersRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    await this.usersRepo.remove(user);
  }
}
