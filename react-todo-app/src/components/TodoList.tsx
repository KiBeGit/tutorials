import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

// Props sind Argumente für die Funktionen von Komponenten. Hierunter declare wir aber zunächst die Datentypen der Props
interface TodoListProps {
  todos: Todo[];
  // Genau die selbe Struktur aus der vorherigen Komponente übergeben
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

// Komponenten werden in Pascal-Case geschrieben
// Die Props an sich kommen dann hier rein
export default function TodoList({
  todos,
  onCompletedChange,
  onDelete,
}: TodoListProps) {
  const todosSorted = todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }
    return a.completed ? 1 : -1;
  });

  return (
    // Man braucht leere HTML-Fragmente um mehrere Divs anzeigen zu können. Ansonsten kann man nur ein div in den return setzen
    <>
      <div className="space-y-2">
        {/* In den geschweiften Klammern kann ich JS-Logik schreiben */}
        {todosSorted.map((todo) => (
          // Hier wird ein HTML-Element returned, dass die todo Daten rendert
          // Jede todo aus dummyData wird genommen und in ein UI-Element geladen
          // Innerhalb der geschweiften Klammern kann bei diesem Beispiel kein for-loop platzieren, weil die eine for-loop kein Ausdruck ist (es kann nichts returnen)
          // Die map-Funktion ist jedoch ein Ausdruck, weswegen wir sie benutzen.
          // For-Loops können über dem return Statement benutzt werden aber nicht innerhalb

          // Hier laden wir in die Komponente die Types und die Daten aus dummyData
          <TodoItem
            key={todo.id}
            todo={todo}
            // Callback-Funtion, die ind er Komponente definiert wurde. Hier werden die Values aus TodoItem weiter gegeben, wenn eine Änderung geschieht.
            // Da wir die Props oben definieren mussten um die Callback-Funktion benutzen zu können, muss die Komponente, die diese Komponente benutzt, ebenfalls das Argument bekommen,
            // damit wir die Values weiter geben können
            onCompletedChange={onCompletedChange}
            onDelete={onDelete}
          />
        ))}
      </div>
      {/* Render ein neuen paragraph mit &&, wenn im todos Array keine todos drinn sind */}
      {todos.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          Du hast keine Aufgaben. Füge eine Aufgabe oben hinzu.
        </p>
      )}
    </>
  );
}
