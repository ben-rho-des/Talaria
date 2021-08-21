import bodyParser from "body-parser";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/docs", swaggerUi.serve, async (_: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
});

RegisterRoutes(app);
