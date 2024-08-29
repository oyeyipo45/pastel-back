import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './common/types/config.type';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/types/env.enums';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configuration } from './config';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialise config with accurate types
  const configService = app.get(ConfigService<Config, true>);

  // API Version
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Cross-Origin Resource Sharing (CORS)
  // This is set to generic to not disturb any frontend integrations or tests
  const origin = '*';
  app.enableCors({ origin });

  // Compression - Reduce Response Size
  app.use(compression());

  // Swagger OpenAPI
  if (configService.get('NODE_ENV') !== Environment.PROD) {
    const config = new DocumentBuilder()
      .setTitle('Pastel API')
      .setDescription('OpenAPI swagger documentation for Pastel backend')
      .addTag('Health', 'Health checks for application')
      .addTag('Notes', 'Operations dealing with notes')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document, {
      customSiteTitle: 'Api Docs',
      customfavIcon:
        'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
      ],
    });

    // Helmet - Security Middleware
    app.use(helmet());
  }

  // Listen to serve
  await app.listen(configuration().appPort);
}
bootstrap();
