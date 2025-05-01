// src/server/api/routers/taskRouter.ts

import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Definição da estrutura da tarefa
type Task = {
  id: string;
  titulo: string;
  descricao?: string;
  dataCriacao: Date;
};

// Armazenamento em memória (sem persistência)
const tasks: Task[] = [];

// Schemas Zod para entrada
const taskInputSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
});

const taskUpdateSchema = taskInputSchema.extend({
  id: z.string(),
});

const taskIdSchema = z.object({ id: z.string() });

export const taskRouter = router({
  // Lista todas as tarefas (sem paginação)
  list: publicProcedure.query(() => {
    return tasks;
  }),

  // Cria uma nova tarefa
  create: publicProcedure
    .input(taskInputSchema)
    .mutation(({ input }) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        titulo: input.titulo,
        descricao: input.descricao,
        dataCriacao: new Date(),
      };
      tasks.push(newTask);
      return newTask;
    }),

  // Atualiza uma tarefa existente
  update: publicProcedure
    .input(taskUpdateSchema)
    .mutation(({ input }) => {
      const task = tasks.find(t => t.id === input.id);
      if (!task) {
        throw new Error("Tarefa não encontrada");
      }
      task.titulo = input.titulo;
      task.descricao = input.descricao;
      return task;
    }),

  // Remove uma tarefa
  delete: publicProcedure
    .input(taskIdSchema)
    .mutation(({ input }) => {
      const index = tasks.findIndex(t => t.id === input.id);
      if (index === -1) {
        throw new Error("Tarefa não encontrada");
      }
      tasks.splice(index, 1);
      return { success: true };
    }),
});
