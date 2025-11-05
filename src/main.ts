import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Permet que qualsevol frontend faci peticions (important per Expo)
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend actiu a http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
