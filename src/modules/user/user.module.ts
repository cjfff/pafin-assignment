import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities';
import { AdminUserService } from './admin.user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AdminUserService],
})
export class UserModule {
  constructor(adminUserService: AdminUserService) {
    adminUserService.init()
  }
}
