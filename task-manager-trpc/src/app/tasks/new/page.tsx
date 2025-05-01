"use client";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTaskPage() {
  const router = useRouter();
  const createTask = trpc.task.create.useMutation({
    onSuccess: () => router.push("/tasks"),
  });

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Nova Tarefa</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        createTask.mutate({ titulo, descricao });
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Criar Tarefa
        </button>
      </form>
    </div>
  );
}
