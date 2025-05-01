// src/server/api/routers/taskRouter.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

type Task = {
  id: string;
  titulo: string;
  descricao?: string;
  dataCriacao: Date;
};

const tasks: Task[] = [];

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return tasks;
  }),

  create: publicProcedure
    .input(z.object({
      titulo: z.string().min(1, "Título é obrigatório"),
      descricao: z.string().optional(),
    }))
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

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      titulo: z.string().min(1, "Título é obrigatório"),
      descricao: z.string().optional(),
    }))
    .mutation(({ input }) => {
      const task = tasks.find(t => t.id === input.id);
      if (!task) throw new Error('Tarefa não encontrada');
      task.titulo = input.titulo;
      task.descricao = input.descricao;
      return task;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const index = tasks.findIndex(t => t.id === input.id);
      if (index === -1) throw new Error('Tarefa não encontrada');
      tasks.splice(index, 1);
      return { success: true };
    }),
});
