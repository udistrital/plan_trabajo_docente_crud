import { ApiProperty } from '@nestjs/swagger';

export class CargaPlanDto {

    @ApiProperty()
    readonly espacio_academico_id: string;

    @ApiProperty()
    readonly actividad_id: string;

    @ApiProperty()
    readonly plan_docente_id: string;

    @ApiProperty()
    readonly colocacion_espacio_academico_id: string;

    @ApiProperty()
    readonly salon_id: string;

    @ApiProperty()
    readonly hora_inicio: number;

    @ApiProperty()
    readonly duracion: number;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}