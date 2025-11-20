import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './Profile/profile.module';
import { CategoryModule } from './Category/category.module';
import { BusinessModule } from './Business/business.module';
import { ServiceModule } from './Service/service.module';
import { ReservationModule } from './Reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProfileModule,
    CategoryModule,
    BusinessModule, 
    ServiceModule,
    ReservationModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
