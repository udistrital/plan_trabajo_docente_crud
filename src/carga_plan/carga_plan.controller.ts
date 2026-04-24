import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CargaPlanDto } from './dto/carga_plan.dto';
import { CargaPlanService } from './carga_plan.service';

import { FilterDto } from "../filters/dto/filter.dto";
import { ApiTags } from '@nestjs/swagger';

@Controller('carga_plan')
@ApiTags('carga_plan')
export class CargaPlanController {
    constructor(private cargaPlanService: CargaPlanService) { }

    @Post()
    async post(@Res() res, @Body() cargaPlanDto: CargaPlanDto) {
        const cargaPlan = await this.cargaPlanService.post(cargaPlanDto);
        if (!cargaPlan) {
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
                Data: cargaPlan
            }
        );

    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const cargaPlan = await this.cargaPlanService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Success: true,
                Status: "200",
                Message: "Request successful",
                Data: cargaPlan
            }
        );
    }

    @Get('/:id')
    async getById(@Res() res, @Param('id') id: string) {
        const cargaPlan = await this.cargaPlanService.getById(id);
        if (!cargaPlan) {
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
                Data: cargaPlan
            }
        );
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() cargaPlanDto: CargaPlanDto) {
        const cargaPlan = await this.cargaPlanService.put(id, cargaPlanDto);
        if (!cargaPlan) {
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
                Data: cargaPlan
            }
        );
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const cargaPlan = await this.cargaPlanService.getById(id);
        cargaPlan.activo = false;
        const response = await this.cargaPlanService.put(id, cargaPlan);
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
