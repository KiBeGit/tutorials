import { Trash2 } from "lucide-react";
import { Todo } from "../types/todo";

// Props sind Argumente für die Funktionen von Komponenten. Hierunter declare wir aber zunächst die Datentypen der Props
interface TodoItemProps {
  todo: Todo;
  // Callback Funktion. Muss jetzt als Prop da rein, wo wir diese Komponente aufrufen
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

// Komponenten werden in Pascal-Case geschrieben
// Die Props an sich kommen dann hier rein
export default function TodoItem({
  todo,
  onCompletedChange,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="flex items-center gap-1">
      <label className="flex items-center gap-2 border rounded-md p-2 border-gray-400 bg-white hover:bg-slate-100 grow">
        <input
          type="checkbox"
          checked={todo.completed}
          // Callback. 'e' in ein React-Change-Event. Wenn sich etwas ändert, wird es an die nächste Komponnte gereicht (ToDoList)
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
          className="scale-125"
        />
        {/* Hier wird dem span-container als klassenname ein JS Ausdruck gegeben */}
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </label>
      <button onClick={() => onDelete(todo.id)} className="p-2">
        <Trash2 size={20} className="text-gray-500" />
      </button>
    </div>
  );
}
