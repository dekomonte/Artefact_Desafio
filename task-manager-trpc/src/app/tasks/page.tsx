'use client';
import { trpc } from "@/trpc/client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TasksPage() {
  const { data: tasks = [], refetch } = trpc.task.list.useQuery();
  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      toast.success("Tarefa excluída!");
      refetch();
    },
    onError: () => {
      toast.error("Erro ao excluir tarefa.");
    }
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Tarefas</h1>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-4 border rounded flex justify-between items-start">
            <div>
              <h2 className="font-semibold">{task.titulo}</h2>
              {task.descricao && <p>{task.descricao}</p>}
              <p className="text-sm text-gray-500">
                {new Date(task.dataCriacao).toLocaleString()}
              </p>
            </div>
            <button
              className="text-red-500 hover:underline ml-4"
              onClick={() => deleteTask.mutate({ id: task.id })}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
