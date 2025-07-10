





import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 8000 });
console.log("Servidor corriendo en http://localhost:8000");

for await (const req of server) {
  req.respond({ body: "¡Hola desde Deno!" });
}



