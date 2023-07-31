import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configs';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './decorators/response';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ...['pafin'].map((key) =>
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.get(`database.${key}`),
      }),
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
