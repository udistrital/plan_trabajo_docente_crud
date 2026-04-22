import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'pre_asignacion' })
export class PreAsignacion extends Document {

    @Prop({ required: true })
    docente_id: string

    @Prop({ required: true })
    tipo_vinculacion_id: string

    @Prop({ required: true })
    espacio_academico_id: string

    @Prop({ required: true })
    periodo_id: string

    @Prop({ required: false })
    aprobacion_docente: boolean

    @Prop({ required: false })
    aprobacion_proyecto: boolean

    @Prop({ required: false })
    plan_docente_id: string

    @Prop({ required: true })
    activo: boolean

    @Prop({ required: true })
    fecha_creacion: Date

    @Prop({ required: true })
    fecha_modificacion: Date

    @Prop({ required: true })
    proyecto_academico_id: string

    @Prop({ required: true })
    proyecto_academico_nombre: string

}

export const PreAsignacionSchema = SchemaFactory.createForClass(PreAsignacion);