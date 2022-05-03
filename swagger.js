const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/swagger/swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles);
