// src/app/api/trpc/[trpc]/route.ts
import { appRouter } from "@/server/api/root";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}), // pode expandir se quiser autenticação
  });
};

export { handler as GET, handler as POST };
