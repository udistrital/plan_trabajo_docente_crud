import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './config/configuration';
import { ActividadModule } from './actividad/actividad.module';
import { CargaPlanModule } from './carga_plan/carga_plan.module';
import { ConsolidadoDocenteModule } from './consolidado_docente/consolidado_docente.module';
import { EstadoConsolidadoModule } from './estado_consolidado/estado_consolidado.module';
import { EstadoPlanModule } from './estado_plan/estado_plan.module';
import { PlanDocenteModule } from './plan_docente/plan_docente.module';
import { PreAsignacionModule } from './pre_asignacion/pre_asignacion.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${environment.USER}:${environment.PASS}@` + `${environment.HOST}:${environment.PORT}/${environment.DB}?authSource=${environment.AUTH_DB}`,
      { 
        useFindAndModify: false 
      }), ActividadModule, CargaPlanModule, ConsolidadoDocenteModule, EstadoConsolidadoModule, EstadoPlanModule, PlanDocenteModule, PreAsignacionModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
