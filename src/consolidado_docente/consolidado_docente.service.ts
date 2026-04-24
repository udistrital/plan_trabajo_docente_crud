import { Injectable } from '@nestjs/common';

import { ConsolidadoDocente } from './schemas/consolidado_docente.schema';
import { ConsolidadoDocenteDto } from './dto/consolidado_docente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilterDto } from "../filters/dto/filter.dto";
import { FiltersService } from "../filters/filters.service";

@Injectable()
export class ConsolidadoDocenteService {
    constructor(@InjectModel(ConsolidadoDocente.name) private readonly consolidadoDocenteModel: Model<ConsolidadoDocente>) { }

    async post(consolidadoDocenteDto: ConsolidadoDocenteDto): Promise<ConsolidadoDocente> {
        try {
            const consolidadoDocente = new this.consolidadoDocenteModel(consolidadoDocenteDto);
            consolidadoDocente.fecha_creacion = new Date();
            consolidadoDocente.fecha_modificacion = new Date();
            return await consolidadoDocente.save();
        }
        catch (error) {
            return null;
        }
    }

    async getAll(filterDto: FilterDto): Promise<ConsolidadoDocente[]> {
        try {
            const filtersService = new FiltersService(filterDto);
            return await this.consolidadoDocenteModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
                .sort(filtersService.getSortBy()).exec();
        }
        catch (error) {
            return null;
        }
    }

    async getById(id: string): Promise<ConsolidadoDocente> {
        try {
            return await this.consolidadoDocenteModel.findById(id).exec();
        }
        catch (error) {
            return null;
        };
    }

    async put(id: string, consolidadoDocenteDto: ConsolidadoDocenteDto): Promise<ConsolidadoDocente> {
        try {
            consolidadoDocenteDto.fecha_modificacion = new Date();
            await this.consolidadoDocenteModel.findByIdAndUpdate(id, consolidadoDocenteDto, { new: true }).exec();
            return await this.consolidadoDocenteModel.findById(id).exec();
        }
        catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await this.consolidadoDocenteModel.findByIdAndRemove(id).exec();
        }
        catch (error) {
            return null;
        }
    }
}
