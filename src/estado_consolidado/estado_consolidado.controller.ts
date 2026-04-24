import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { EstadoConsolidadoDto } from './dto/estado_consolidado.dto';
import { EstadoConolidadoService } from './estado_consolidado.service';

import { FilterDto } from "../filters/dto/filter.dto";
import { ApiTags } from '@nestjs/swagger';

@Controller('estado_consolidado')
@ApiTags('estado_consolidado')
export class EstadoConsolidadoController {
    constructor(private estadoConsolidadoService: EstadoConolidadoService) { }

    @Post()
    async post(@Res() res, @Body() estadoConsolidadoDto: EstadoConsolidadoDto) {
        const estadoConsolidado = await this.estadoConsolidadoService.post(estadoConsolidadoDto);
        if (!estadoConsolidado) {
            throw new HttpException({
                Success: false,
                Status: "400",
                Message: "Error service Post: The request contains an incorrect data type or an invalid parameter",
                Data: null
            }, HttpStatus.BAD_REQUEST)
        }
        res.status(HttpStatus.CREATED).json(
            {
                Success: true,
                Status: "201",
                Message: "Registration successful",
                Data: estadoConsolidado
            }
        );

    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const estadoConsolidado = await this.estadoConsolidadoService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Success: true,
                Status: "200",
                Message: "Request successful",
                Data: estadoConsolidado
            }
        );
    }

    @Get('/:id')
    async getById(@Res() res, @Param('id') id: string) {
        const estadoConsolidado = await this.estadoConsolidadoService.getById(id);
        if (!estadoConsolidado) {
            throw new HttpException({
                Success: false,
                Status: "404",
                Message: "Error service GetOne: The request contains an incorrect parameter or no record exist",
                Data: null
            }, HttpStatus.NOT_FOUND)
        }
        res.status(HttpStatus.OK).json(
            {
                Success: true,
                Status: "200",
                Message: "Request successful",
                Data: estadoConsolidado
            }
        );
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() estadoConsolidadoDto: EstadoConsolidadoDto) {
        const estadoConsolidado = await this.estadoConsolidadoService.put(id, estadoConsolidadoDto);
        if (!estadoConsolidado) {
            throw new HttpException({
                Success: false,
                Status: "400",
                Message: "Error service Put: The request contains an incorrect data type or an invalid parameter",
                Data: null
            }, HttpStatus.BAD_REQUEST)
        }
        return res.status(HttpStatus.OK).json(
            {
                Success: true,
                Status: "200",
                Message: "Update successful",
                Data: estadoConsolidado
            }
        );
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const estadoConsolidad = await this.estadoConsolidadoService.getById(id);
        estadoConsolidad.activo = false;
        const response = await this.estadoConsolidadoService.put(id, estadoConsolidad);
        if (response instanceof Error) {
            return res.status(HttpStatus.OK).json({
                Success: false,
                Status: "400",
                Message: response.message,
                Data: null
            });
        } else {
            return res.status(HttpStatus.OK).json(
                {
                    Success: true,
                    Status: "200",
                    Message: "Delete successful",
                    Data: response
                }
            );
        }
    }
}
