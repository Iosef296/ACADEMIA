"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("./entities/user.entity");
const student_profile_entity_1 = require("./entities/student-profile.entity");
let UsersService = class UsersService {
    usersRepo;
    profilesRepo;
    constructor(usersRepo, profilesRepo) {
        this.usersRepo = usersRepo;
        this.profilesRepo = profilesRepo;
    }
    async create(data) {
        const exists = await this.usersRepo.findOne({ where: { email: data.email } });
        if (exists)
            throw new common_1.ConflictException('El email ya está registrado');
        const password_hash = await bcrypt.hash(data.password, 10);
        const user = this.usersRepo.create({
            name: data.name,
            email: data.email,
            password_hash,
            role: data.role ?? user_entity_1.UserRole.STUDENT,
        });
        const saved = await this.usersRepo.save(user);
        if (saved.role === user_entity_1.UserRole.STUDENT) {
            const profile = this.profilesRepo.create({ user: saved });
            await this.profilesRepo.save(profile);
        }
        return saved;
    }
    async findByEmail(email) {
        return this.usersRepo.findOne({ where: { email }, relations: ['profile'] });
    }
    async findById(id) {
        return this.usersRepo.findOne({ where: { id }, relations: ['profile'] });
    }
    async findAll() {
        return this.usersRepo.find({ relations: ['profile'] });
    }
    async updateProfile(id, data) {
        const user = await this.findById(id);
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        Object.assign(user, data);
        return this.usersRepo.save(user);
    }
    async updateAvatar(userId, avatarConfig) {
        const profile = await this.profilesRepo.findOne({ where: { user: { id: userId } } });
        if (!profile)
            throw new common_1.NotFoundException('Perfil no encontrado');
        profile.avatar_config = avatarConfig;
        return this.profilesRepo.save(profile);
    }
    async updateRole(id, role) {
        const user = await this.findById(id);
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        user.role = role;
        return this.usersRepo.save(user);
    }
    async remove(id) {
        const user = await this.findById(id);
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        await this.usersRepo.remove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(student_profile_entity_1.StudentProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map