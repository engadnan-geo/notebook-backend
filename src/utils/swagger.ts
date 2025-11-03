import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note Manager API",
      version: "1.0.0",
      description: "API documentation for the Note Manager backend built with TypeScript + Express.",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000"
            : "https://your-production-url.com/api",
        description:
          process.env.NODE_ENV === "development"
            ? "Development server"
            : "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // 👈 make sure this path matches your routes
};

export const swaggerSpec = swaggerJSDoc(options);
