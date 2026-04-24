import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'consolidado_docente' })
export class ConsolidadoDocente extends Document {

    @Prop({ required: true })
    plan_docente_id: string

    @Prop({ required: true })
    periodo_id: string

    @Prop({ required: true })
    proyecto_academico_id: string

    @Prop({ required: true })
    estado_consolidado_id: string

    @Prop({ required: true })
    respuesta_decanatura: string

    @Prop({ required: true })
    consolidado_coordinacion: string

    @Prop({ required: true })
    cumple_normativa: boolean

    @Prop({ required: true })
    aprobado: boolean

    @Prop({ required: true })
    activo: boolean

    @Prop({ required: true })
    fecha_creacion: Date

    @Prop({ required: true })
    fecha_modificacion: Date

}

export const ConsolidadoDocenteSchema = SchemaFactory.createForClass(ConsolidadoDocente);