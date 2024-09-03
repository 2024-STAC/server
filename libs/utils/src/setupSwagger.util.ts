import { INestApplication } from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

/**
 * Swagger 세팅
 * @param app {INestApplication} Swagger를 적용할 어플리케이션
 */
export const setupSwagger = (app : INestApplication) : void => {
    const swaggerOptions = new DocumentBuilder()
    .setTitle("ChungChun API Docs")
    .setDescription("ChungChun service based by Nestjs API description")
    .setVersion('0.0.1')
    .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api-docs', app, document);
}