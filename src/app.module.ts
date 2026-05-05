import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActividadModule } from './actividad/actividad.module';
import { CargaPlanModule } from './carga_plan/carga_plan.module';
import { ConsolidadoDocenteModule } from './consolidado_docente/consolidado_docente.module';
import { EstadoConsolidadoModule } from './estado_consolidado/estado_consolidado.module';
import { EstadoPlanModule } from './estado_plan/estado_plan.module';
import { PlanDocenteModule } from './plan_docente/plan_docente.module';
import { PreAsignacionModule } from './pre_asignacion/pre_asignacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = encodeURIComponent(
          configService.get<string>('PLAN_TRABAJO_DOCENTE_CRUD_USER'),
        );
        const pass = encodeURIComponent(
          configService.get<string>('PLAN_TRABAJO_DOCENTE_CRUD_PASS'),
        );
        const host = configService.get<string>(
          'PLAN_TRABAJO_DOCENTE_CRUD_HOST',
        );
        const port = configService.get<string>(
          'PLAN_TRABAJO_DOCENTE_CRUD_PORT',
        );
        const db = configService.get<string>('PLAN_TRABAJO_DOCENTE_CRUD_DB');
        const authDb = configService.get<string>(
          'PLAN_TRABAJO_DOCENTE_CRUD_AUTH_DB',
        );

        return {
          uri: `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=${authDb}`,
        };
      },
      inject: [ConfigService],
    }),
    ActividadModule,
    CargaPlanModule,
    ConsolidadoDocenteModule,
    EstadoConsolidadoModule,
    EstadoPlanModule,
    PlanDocenteModule,
    PreAsignacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
