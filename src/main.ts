import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // (opcional) CORS, prefijos, etc.
  // app.enableCors();
  // app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Logbook API')
    .setDescription('Documentación de la API')
    .setVersion('1.0.0')
    // .addBearerAuth() // si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // opcional: limitar módulos o incluir/excluir controladores
  });

  // Ruta donde verás la UI
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
