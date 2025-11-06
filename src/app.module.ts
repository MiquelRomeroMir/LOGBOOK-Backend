import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Acceso global a variables de entorno
    }),
    UserModule, // Importa UserModule, no los controladores ni servicios directamente
  ],
  controllers: [AppController], // Solo AppController
  providers: [AppService],
})
export class AppModule {}
