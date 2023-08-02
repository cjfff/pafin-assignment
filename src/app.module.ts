import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import configuration from './configs';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './decorators/response';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.163.com',
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: process.env.MAIL_USER || '',
          pass: process.env.MAIL_PASS || '',
        },
      },
      defaults: {
        from: process.env.MAIL_USER,
      },
    }),
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
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
