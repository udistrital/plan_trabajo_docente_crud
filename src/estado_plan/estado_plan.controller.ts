import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { EstadoPlanDto } from './dto/estado_plan.dto';
import { EstadoPlanService } from './estado_plan.service';

import { FilterDto } from "../filters/dto/filter.dto";
import { ApiTags } from '@nestjs/swagger';

@Controller('estado_plan')
@ApiTags('estado_plan')
export class EstadoPlanController {
    constructor(private estadoPlanService: EstadoPlanService) { }

    @Post()
    async post(@Res() res, @Body() estadoPlanDto: EstadoPlanDto) {
        const estadoPlan = await this.estadoPlanService.post(estadoPlanDto);
        if (!estadoPlan) {
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
                Data: estadoPlan
            }
        );

    }

    @Get()
    async getAll(@Res() res, @Query() filterDto: FilterDto) {
        const estadoPlan = await this.estadoPlanService.getAll(filterDto);
        res.status(HttpStatus.OK).json(
            {
                Success: true,
                Status: "200",
                Message: "Request successful",
                Data: estadoPlan
            }
        );
    }

    @Get('/:id')
    async getById(@Res() res, @Param('id') id: string) {
        const estadoPlan = await this.estadoPlanService.getById(id);
        if (!estadoPlan) {
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
                Data: estadoPlan
            }
        );
    }

    @Put('/:id')
    async put(@Res() res, @Param('id') id: string, @Body() estadoPlanDto: EstadoPlanDto) {
        const estadoPlan = await this.estadoPlanService.put(id, estadoPlanDto);
        if (!estadoPlan) {
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
                Data: estadoPlan
            }
        );
    }

    @Delete('/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const estadoPlan = await this.estadoPlanService.getById(id);
        estadoPlan.activo = false;
        const response = await this.estadoPlanService.put(id, estadoPlan);
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
