import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info:{
            title: "Serviço Gerenciador de Arquivos API - Documentação",
            version: "1.0.0",
            description: "API para fazer upload, listar e excluir arquivos",
        },
    },
    apis: ["./routes/*.ts"] 
};

const swaggerSpec = swaggerJSDoc(options)

//module.exports = swaggerSpec

export default swaggerSpec