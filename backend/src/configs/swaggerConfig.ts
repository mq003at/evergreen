import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management System API',
            version: '1.0.0',
            description: 'API documentation for the Library Management System',
        },
        servers: [
            {
                url: 'http://localhost:3123',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
