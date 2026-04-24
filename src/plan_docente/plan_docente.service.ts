import { Injectable } from '@nestjs/common';

import { PlanDocente } from './schemas/plan_docente.schema';
import { PlanDocenteDto } from './dto/plan_docente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilterDto } from "../filters/dto/filter.dto";
import { FiltersService } from "../filters/filters.service";

@Injectable()
export class PlanDocenteService {
    constructor(@InjectModel(PlanDocente.name) private readonly planDocenteModel: Model<PlanDocente>) { }

    async post(planDocenteDto: PlanDocenteDto): Promise<PlanDocente> {
        try {
            const planDocente = new this.planDocenteModel(planDocenteDto);
            planDocente.fecha_creacion = new Date();
            planDocente.fecha_modificacion = new Date();
            return await planDocente.save();
        }
        catch (error) {
            return null;
        }
    }

    async getAll(filterDto: FilterDto): Promise<PlanDocente[]> {
        try {
            const filtersService = new FiltersService(filterDto);
            return await this.planDocenteModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
                .sort(filtersService.getSortBy()).exec();
        }
        catch (error) {
            return null;
        }
    }

    async getById(id: string): Promise<PlanDocente> {
        try {
            return await this.planDocenteModel.findById(id).exec();
        }
        catch (error) {
            return null;
        };
    }

    async put(id: string, planDocenteDto: PlanDocenteDto): Promise<PlanDocente> {
        try {
            planDocenteDto.fecha_modificacion = new Date();
            await this.planDocenteModel.findByIdAndUpdate(id, planDocenteDto, { new: true }).exec();
            return await this.planDocenteModel.findById(id).exec();
        }
        catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await this.planDocenteModel.findByIdAndRemove(id).exec();
        }
        catch (error) {
            return null;
        }
    }
}
