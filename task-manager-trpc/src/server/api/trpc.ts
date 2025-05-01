// src/server/api/trpc.ts
// Esse arquivo inicializa o tRPC. Você usará router e publicProcedure sempre.
import { initTRPC } from '@trpc/server';
export const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;
