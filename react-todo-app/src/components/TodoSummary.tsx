import { Todo } from "../types/todo";

// Props sind Argumente für die Funktionen von Komponenten. Hierunter declare wir aber zunächst die Datentypen der Props
interface TodoSummaryProps {
  todos: Todo[];
  deleteAllCompletedTodos: () => void;
}

// Komponenten werden in Pascal-Case geschrieben
// Die Props an sich kommen dann hier rein
export default function TodoSummary({
  todos,
  deleteAllCompletedTodos,
}: TodoSummaryProps) {
  // Fertige Todos filtern
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="text-center space-y-2">
      <p className="text-sm font-medium">
        {completedTodos.length}/{todos.length} Aufgaben erledigt
      </p>
      {/* In den geschweiften Klammern kann ich JS-Logik schreiben */}
      {completedTodos.length > 0 && (
        <button
          onClick={deleteAllCompletedTodos}
          className="text-red-500 hover:underline text-sm font-medium"
        >
          Erledigte Aufgaben löschen
        </button>
      )}
    </div>
  );
}
