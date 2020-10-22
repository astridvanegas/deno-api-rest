import { Application } from './deps.ts';
import router from './routes/index.ts';
import { notFound } from "./utils/middlewares.ts";

const env = Deno.env.toObject();
const PORT = parseInt(env.PORT) || 3000;
const HOST = env.HOST;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(`Server Running on ${HOST}:${PORT}`);

if (import.meta.main) await app.listen({ port: PORT });

export default app;
