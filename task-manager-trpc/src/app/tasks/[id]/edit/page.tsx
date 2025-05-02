'use client';

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const taskId = params.id;

  const { data: tasks = [], isLoading } = trpc.task.list.useQuery();
  const task = tasks.find(t => t.id === taskId);

  const updateTask = trpc.task.update.useMutation({
    onSuccess: () => {
      toast.success("Tarefa atualizada com sucesso!");
      router.push("/tasks");
    },
    onError: () => {
      toast.error("Erro ao atualizar tarefa.");
    }
  });

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (task) {
      setTitulo(task.titulo);
      setDescricao(task.descricao || "");
    }
  }, [task]);

  if (isLoading) return <p>Carregando tarefa...</p>;
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
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" type="submit">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
