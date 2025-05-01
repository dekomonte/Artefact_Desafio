import { trpc } from "@/trpc/client";

export default async function TasksPage() {
  const tasks = await trpc.task.list.query();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Tarefas</h1>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-4 border rounded">
            <h2 className="font-semibold">{task.titulo}</h2>
            {task.descricao && <p>{task.descricao}</p>}
            <p className="text-sm text-gray-500">{new Date(task.dataCriacao).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
