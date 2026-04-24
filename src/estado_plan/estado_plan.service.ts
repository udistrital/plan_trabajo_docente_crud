import { Injectable } from '@nestjs/common';

import { EstadoPlan } from './schemas/estado_plan.schema';
import { EstadoPlanDto } from './dto/estado_plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilterDto } from "../filters/dto/filter.dto";
import { FiltersService } from "../filters/filters.service";

@Injectable()
export class EstadoPlanService {
    constructor(@InjectModel(EstadoPlan.name) private readonly estadoPlanModel: Model<EstadoPlan>) { }

    async post(estadoPlanDto: EstadoPlanDto): Promise<EstadoPlan> {
        try {
            const estadoPlan = new this.estadoPlanModel(estadoPlanDto);
            estadoPlan.fecha_creacion = new Date();
            estadoPlan.fecha_modificacion = new Date();
            return await estadoPlan.save();
        }
        catch (error) {
            return null;
        }
    }

    async getAll(filterDto: FilterDto): Promise<EstadoPlan[]> {
        try {
            const filtersService = new FiltersService(filterDto);
            return await this.estadoPlanModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
                .sort(filtersService.getSortBy()).exec();
        }
        catch (error) {
            return null;
        }
    }

    async getById(id: string): Promise<EstadoPlan> {
        try {
            return await this.estadoPlanModel.findById(id).exec();
        }
        catch (error) {
            return null;
        };
    }

    async put(id: string, estadoPlanDto: EstadoPlanDto): Promise<EstadoPlan> {
        try {
            estadoPlanDto.fecha_modificacion = new Date();
            await this.estadoPlanModel.findByIdAndUpdate(id, estadoPlanDto, { new: true }).exec();
            return await this.estadoPlanModel.findById(id).exec();
        }
        catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await this.estadoPlanModel.findByIdAndRemove(id).exec();
        }
        catch (error) {
            return null;
        }
    }
}
