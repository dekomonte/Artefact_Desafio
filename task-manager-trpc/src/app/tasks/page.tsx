'use client';

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TasksPage() {
  const router = useRouter();
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Lista de Tarefas</h1>
        <button
          onClick={() => router.push("/tasks/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Nova Tarefa
        </button>
      </div>

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
