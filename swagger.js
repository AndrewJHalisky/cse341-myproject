const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Users Api",
        description: "Users Api"
    },
    host: "localhost:4000",
    schemes: ['https', 'http']
};
const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc).then(async () => {
    await import('./index.js');
});