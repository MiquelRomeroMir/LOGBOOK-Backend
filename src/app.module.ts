import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { CategoryModule } from './Category/category.module';
import { BusinessModule } from './Business/business.module';
import { ServiceModule } from './Service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CategoryModule,
    BusinessModule, 
    ServiceModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
