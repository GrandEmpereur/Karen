import Koa from "koa";
import cors from "@koa/cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "development" ? '.env.development' : '.env'),
});

async function main() {
    const app = await createApp();
    const port = process.env.PORT || 3100;
    console.log(`Server listening on port http://localhost:${port}`);
    app.listen(port);
}

/**
 * @description The core of Koa, launch the Koa server
 * @returns a koa app
 */
async function createApp(): Promise<Koa> {
    const app = new Koa() as Koa;
    app.use(cors());
    app.use(home.routes());
    return app;
}

main();
