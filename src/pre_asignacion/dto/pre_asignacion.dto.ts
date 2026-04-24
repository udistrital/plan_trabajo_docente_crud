import { ApiProperty } from '@nestjs/swagger';

export class PreAsignacionDto {

    @ApiProperty()
    readonly docente_id: string;

    @ApiProperty()
    readonly tipo_vinculacion_id: string;

    @ApiProperty()
    readonly espacio_academico_id: string;

    @ApiProperty()
    readonly periodo_id: string;

    @ApiProperty()
    readonly aprobacion_docente: boolean;

    @ApiProperty()
    readonly aprobacion_proyecto: boolean;

    @ApiProperty()
    readonly plan_docente_id: string;

    @ApiProperty()
    readonly proyecto_academico_id: string;

    @ApiProperty()
    readonly proyecto_academico_nombre: string;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}