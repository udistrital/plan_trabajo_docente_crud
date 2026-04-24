import { Injectable } from '@nestjs/common';

import { PreAsignacion } from './schemas/pre_asignacion.schema';
import { PreAsignacionDto } from './dto/pre_asignacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilterDto } from "../filters/dto/filter.dto";
import { FiltersService } from "../filters/filters.service";

@Injectable()
export class PreAsignacionService {
    constructor(@InjectModel(PreAsignacion.name) private readonly preAsignacionModel: Model<PreAsignacion>) { }

    async post(preAsignacionDto: PreAsignacionDto): Promise<PreAsignacion> {
        try {
            const preAsignacion = new this.preAsignacionModel(preAsignacionDto);
            preAsignacion.fecha_creacion = new Date();
            preAsignacion.fecha_modificacion = new Date();
            preAsignacion.activo = true;
            this.preAsignacionModel.validate(preAsignacion);
            return await preAsignacion.save();
        }
        catch (error) {
            return null;
        }
    }

    async getAll(filterDto: FilterDto): Promise<PreAsignacion[]> {
        try {
            const filtersService = new FiltersService(filterDto);
            return await this.preAsignacionModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
                .sort(filtersService.getSortBy()).exec();
        }
        catch (error) {
            return error;
        }
    }

    async getById(id: string): Promise<PreAsignacion> {
        try {
            return await this.preAsignacionModel.findById(id).exec();
        }
        catch (error) {
            return error;
        };
    }

    async put(id: string, preAsignacionDto: PreAsignacionDto): Promise<PreAsignacion> {
        try {
            preAsignacionDto.fecha_modificacion = new Date();
            await this.preAsignacionModel.findByIdAndUpdate(id, preAsignacionDto, { new: true }).exec();
            return await this.preAsignacionModel.findById(id).exec();
        }
        catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await this.preAsignacionModel.findByIdAndRemove(id).exec();
        }
        catch (error) {
            return null;
        }
    }
}
