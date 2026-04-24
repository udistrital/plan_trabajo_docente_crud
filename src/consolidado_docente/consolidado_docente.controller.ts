import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ConsolidadoDocenteDto } from './dto/consolidado_docente.dto';
import { ConsolidadoDocenteService } from './consolidado_docente.service';

import { FilterDto } from "../filters/dto/filter.dto";
import { ApiTags } from '@nestjs/swagger';

@Controller('consolidado_docente')
@ApiTags('consolidado_docente')
export class ConsolidadoDocenteController {
    constructor(private consolidadoDocenteService: ConsolidadoDocenteService) { }

    @Post()
    async post(@Res() res, @Body() consolidadoDocenteDto: ConsolidadoDocenteDto) {
        const consolidadoDocente = await this.consolidadoDocenteService.post(consolidadoDocenteDto);
        if (!consolidadoDocente) {
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
                Data: consolidadoDocente
            }
        );

    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const consolidadoDocente = await this.consolidadoDocenteService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Success: true,
                Status: "200",
                Message: "Request successful",
                Data: consolidadoDocente
            }
        );
    }

    @Get('/:id')
    async getById(@Res() res, @Param('id') id: string) {
        const consolidadoDocente = await this.consolidadoDocenteService.getById(id);
        if (!consolidadoDocente) {
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
                Data: consolidadoDocente
            }
        );
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() consolidadoDocenteDto: ConsolidadoDocenteDto) {
        const consolidadoDocente = await this.consolidadoDocenteService.put(id, consolidadoDocenteDto);
        if (!consolidadoDocente) {
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
                Data: consolidadoDocente
            }
        );
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const consolidadoDocente = await this.consolidadoDocenteService.getById(id);
        consolidadoDocente.activo = false;
        const response = await this.consolidadoDocenteService.put(id, consolidadoDocente);
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
