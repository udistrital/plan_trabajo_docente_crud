import { ApiProperty } from '@nestjs/swagger';

export class ConsolidadoDocenteDto {

    @ApiProperty()
    readonly plan_docente_id: string;

    @ApiProperty()
    readonly periodo_id: string;

    @ApiProperty()
    readonly proyecto_academico_id: string;

    @ApiProperty()
    readonly estado_consolidado_id: string;

    @ApiProperty()
    readonly respuesta_decanatura: string;

    @ApiProperty()
    readonly consolidado_coordinacion: string;

    @ApiProperty()
    readonly cumple_normativa: boolean;

    @ApiProperty()
    readonly aprobado: boolean;

    @ApiProperty()
    activo: boolean;

    @ApiProperty()
    fecha_creacion: Date;

    @ApiProperty()
    fecha_modificacion: Date;

}