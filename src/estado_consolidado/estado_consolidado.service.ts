import { Injectable } from '@nestjs/common';

import { EstadoConsolidado } from './schemas/estado_consolidado.schema';
import { EstadoConsolidadoDto } from './dto/estado_consolidado.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilterDto } from "../filters/dto/filter.dto";
import { FiltersService } from "../filters/filters.service";

@Injectable()
export class EstadoConolidadoService {
    constructor(@InjectModel(EstadoConsolidado.name) private readonly estadoConsolidadoModel: Model<EstadoConsolidado>) { }

    async post(estadoConsolidadoDto: EstadoConsolidadoDto): Promise<EstadoConsolidado> {
        try {
            const estadoConsolidado = new this.estadoConsolidadoModel(estadoConsolidadoDto);
            estadoConsolidado.fecha_creacion = new Date();
            estadoConsolidado.fecha_modificacion = new Date();
            return await estadoConsolidado.save();
        }
        catch (error) {
            return null;
        }
    }

    async getAll(filterDto: FilterDto): Promise<EstadoConsolidado[]> {
        try {
            const filtersService = new FiltersService(filterDto);
            return await this.estadoConsolidadoModel.find(filtersService.getQuery(), filtersService.getFields(), filtersService.getLimitAndOffset())
                .sort(filtersService.getSortBy()).exec();
        }
        catch (error) {
            return null;
        }
    }

    async getById(id: string): Promise<EstadoConsolidado> {
        try {
            return await this.estadoConsolidadoModel.findById(id).exec();
        }
        catch (error) {
            return null;
        };
    }

    async put(id: string, estadoConsolidadoDto: EstadoConsolidadoDto): Promise<EstadoConsolidado> {
        try {
            estadoConsolidadoDto.fecha_modificacion = new Date();
            await this.estadoConsolidadoModel.findByIdAndUpdate(id, estadoConsolidadoDto, { new: true }).exec();
            return await this.estadoConsolidadoModel.findById(id).exec();
        }
        catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await this.estadoConsolidadoModel.findByIdAndRemove(id).exec();
        }
        catch (error) {
            return null;
        }
    }
}
