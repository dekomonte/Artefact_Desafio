'use client';

import { use, useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id: taskId } = use(params); // 🚀 Resolve o `params` corretamente

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

  if (isLoading) return <p className="p-4">Carregando tarefa...</p>;
  if (!task) return <p className="p-4 text-red-600">Tarefa não encontrada.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Tarefa</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTask.mutate({ id: taskId, titulo, descricao });
        }}
        className="flex flex-col gap-4"
      >
        <input
          className="border p-3 rounded-lg w-full"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          className="border p-3 rounded-lg w-full min-h-[100px]"
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
