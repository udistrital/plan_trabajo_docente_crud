import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EstadoConsolidadoController } from "./estado_consolidado.controller";
import { EstadoConolidadoService } from "./estado_consolidado.service";
import { EstadoConsolidado, EstadoConsolidadoSchema } from "./schemas/estado_consolidado.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: EstadoConsolidado.name, schema: EstadoConsolidadoSchema }])
    ],
    controllers: [EstadoConsolidadoController],
    providers: [EstadoConolidadoService],
    exports: [EstadoConolidadoService]
})
export class EstadoConsolidadoModule { }