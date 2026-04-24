import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { environment } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('plan_trabajo_docente_crud')
    .setDescription(
      'API CRUD para el registro de planes de trabajo docente para el cliente de SGA',
    )
    .setVersion('1.0')
    .addTag('plan_trabajo_docente')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI
  SwaggerModule.setup('swagger', app, document);

  const outputPath = join(process.cwd(), 'swagger');
  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(
    join(outputPath, 'swagger.json'),
    JSON.stringify(document, null, 2),
  );

  fs.writeFileSync(join(outputPath, 'swagger.yaml'), yaml.dump(document));

  await app.listen(parseInt(environment.HTTP_PORT, 10) || 8080);
}

bootstrap();
