import { Test, TestingModule } from "@nestjs/testing";
import { EstadoConsolidadoController } from "./estado_consolidado.controller";

describe("ActividadController", () => {
    let controller: EstadoConsolidadoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EstadoConsolidadoController],
        }).compile();

        controller = module.get<EstadoConsolidadoController>(EstadoConsolidadoController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
}
);