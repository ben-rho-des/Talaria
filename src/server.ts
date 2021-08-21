import { app } from "./app";
import chalk from "chalk";

const port = process.env.PORT || 3000;
const log = console.log;

app.listen(port, () =>
  log(chalk.yellow(`Example app listening at http://localhost:${port}`))
);
