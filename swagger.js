const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Documentación generada con Swagger',
    },
  },
  // Aquí defines dónde Swagger debe buscar tus anotaciones (controllers, routes, etc.)
  apis: ['./routes/*.js', './controllers/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };

