import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { Environment } from './common/types/env.enums';
import { configValidator } from './config/env.validation';
import { configuration } from './config';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      load: [configuration],
      validate: configValidator,
      envFilePath:
        configuration().nodeENV === Environment.TEST ? '.env.local' : '.env',
    }),
    HealthModule,
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
