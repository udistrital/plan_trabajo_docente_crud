import { Injectable } from '@nestjs/common';

import { CargaPlan } from './schemas/carga_plan.schema';
import { CargaPlanDto } from './dto/carga_plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilterDto } from "../filters/dto/filter.dto";
import { FiltersService } from "../filters/filters.service";

@Injectable()
export class CargaPlanService {
    constructor(@InjectModel(CargaPlan.name) private readonly cargaPlanModel: Model<CargaPlan>) { }

    async post(cargaPlanDto: CargaPlanDto): Promise<CargaPlan> {
        try {
            const cargaPlan = new this.cargaPlanModel(cargaPlanDto);
            cargaPlan.fecha_creacion = new Date();
            cargaPlan.fecha_modificacion = new Date();
            return await cargaPlan.save();
        }
        catch (error) {
            return null;
        }
    }

    async getAll(filterDto: FilterDto): Promise<CargaPlan[]> {
        try {
            const filtersService = new FiltersService(filterDto);
            return await this.cargaPlanModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
                .sort(filtersService.getSortBy()).exec();
        }
        catch (error) {
            return null;
        }
    }

    async getById(id: string): Promise<CargaPlan> {
        try {
            return await this.cargaPlanModel.findById(id).exec();
        }
        catch (error) {
            return null;
        };
    }

    async put(id: string, cargaPlanDto: CargaPlanDto): Promise<CargaPlan> {
        try {
            cargaPlanDto.fecha_modificacion = new Date();
            await this.cargaPlanModel.findByIdAndUpdate(id, cargaPlanDto, { new: true }).exec();
            return await this.cargaPlanModel.findById(id).exec();
        }
        catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await this.cargaPlanModel.findByIdAndRemove(id).exec();
        }
        catch (error) {
            return null;
        }
    }
}
