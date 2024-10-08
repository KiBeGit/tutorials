import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";
import useTodos from "./hooks/useTodos";

function App() {
  const {
    todos,
    addTodo,
    setTodoCompleted,
    deleteTodo,
    deleteAllCompletedTodos,
  } = useTodos();

  return (
    <main className="py-10 h-screen space-y-5 overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">Meine Aufgaben</h1>
      <div className="max-w-lg mx-auto bg-slate-200 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addTodo} />
        <TodoList
          todos={todos}
          // Hier muss in den Callback nur der Funktion-Name übergeben werden
          // Die Callback-Funktion muss hier rein, da wir die Props in der Komponente definiert haben.
          // Die Funktion setTodos nutzt jetzt die Values und Daten aus der TodoItem un dann TodoList, um Aktionen durchführen zu können
          onCompletedChange={setTodoCompleted}
          onDelete={deleteTodo}
        />
      </div>
      <TodoSummary
        todos={todos}
        deleteAllCompletedTodos={deleteAllCompletedTodos}
      />
    </main>
  );
}

export default App;
