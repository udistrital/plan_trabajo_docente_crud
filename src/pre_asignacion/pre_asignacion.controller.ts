import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { PreAsignacionDto } from './dto/pre_asignacion.dto';
import { PreAsignacionService } from './pre_asignacion.service';

import { FilterDto } from "../filters/dto/filter.dto";
import { ApiTags } from '@nestjs/swagger';

@Controller('pre_asignacion')
@ApiTags('pre_asignacion')
export class PreAsignacionController {
    constructor(private preAsignacionService: PreAsignacionService) { }

    @Post()
    async post(@Res() res, @Body() preAsignacionDto: PreAsignacionDto) {
        const preAsignacion = await this.preAsignacionService.post(preAsignacionDto);
        if (!preAsignacion) {
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
                Data: preAsignacion
            }
        );

    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const preAsignacion = await this.preAsignacionService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Success: true,
                Status: "200",
                Message: "Request successful",
                Data: preAsignacion
            }
        );
    }

    @Get('/:id')
    async getById(@Res() res, @Param('id') id: string) {
        const preAsignacion = await this.preAsignacionService.getById(id);
        if (!preAsignacion) {
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
                Data: preAsignacion
            }
        );
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() preAsignacionDto: PreAsignacionDto) {
        const preAsignacion = await this.preAsignacionService.put(id, preAsignacionDto);
        if (!preAsignacion) {
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
                Data: preAsignacion
            }
        );
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const preAsignacion = await this.preAsignacionService.getById(id);
        preAsignacion.activo = false;
        const response = await this.preAsignacionService.put(id, preAsignacion);
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
