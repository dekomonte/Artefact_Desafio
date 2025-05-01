'use client';

import { trpc } from "@/trpc/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const taskId = params.id;

  const { data: tasks = [] } = trpc.task.list.useQuery(); // usar cache simples
  const task = tasks.find(t => t.id === taskId);

  const updateTask = trpc.task.update.useMutation({
    onSuccess: () => router.push("/tasks"),
  });

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (task) {
      setTitulo(task.titulo);
      setDescricao(task.descricao || "");
    }
  }, [task]);

  if (!task) return <p>Tarefa não encontrada.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Editar Tarefa</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        updateTask.mutate({ id: taskId, titulo, descricao });
      }}>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
