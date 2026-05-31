"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const nestjs_api_reference_1 = require("@scalar/nestjs-api-reference");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Posyandu Modern')
        .setDescription('Dokumentasi Backend untuk Aplikasi Kader Posyandu')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const scalarConfig = {
        spec: {
            content: document,
        },
    };
    app.use('/reference', (0, nestjs_api_reference_1.apiReference)(scalarConfig));
    await app.listen(3000);
    console.log(`Application is running on: http://localhost:3000/reference`);
}
bootstrap();
//# sourceMappingURL=main.js.map