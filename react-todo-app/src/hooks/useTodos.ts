import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { dummyData } from "../data/todos";

// Alles was mit 'use' startet sind sogenannte hooks. Hooks erlauben un spezielle Features zu benutzen wie State.
// Das useTodos nennt sich ein custom Hooks
export default function useTodos() {
  // Das erste Value ist unser State an sich. Es ist unser initales State wenn wir die App öffnen
  // setTodos ist unser State, womit wir updaten werden
  const [todos, setTodos] = useState(() => {
    // Ich hole mir die todos aus dem localStorage und parse es wieder in einen JSON. Wenn nichts kommt, dann kommt ein neues und leeres Array
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

  // Side-Effekt, was nicht mit jedem rendern ausgelöst werden soll -> Wenn sich ein State z.B. ändert oder wenn die Seite zum ersten mal rendern.
  // Nützlich, wenn man was in die Datenbank DB schreiben möchte
  useEffect(() => {
    // Im localStorage muss man ein key definieren. Außerdem kann man nur Strings speichern, weswegen ich die JSON-Datei in einen String umwandle
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Dieses Array enthält die Dependencies (Abhängigkeiten). useEffect benötigt diese um richtig funktionieren zu können. Wir hauen da qauasi daten rein

  function setTodoCompleted(id: number, completed: boolean) {
    // In den State 'setTodos' setzen wir nun eine Arrow-Funktion 'prevTodos' hinein und returnen den new State von todos
    // mit der map-Funktion änder wir ein Array in ein neues Array und machen folgendes:
    // für jedes Item todo ermitteln wir die id aus dem geklickten Item und updaten completed
    // mit den geschweiften Klammern geben wir jetzt ein neues State dem Array
    // mit ...todo geben wir quasi das todo Object mit title und id dem neuem State und den neuen completed value
    // wenn die id nicht übereinstimmt, behalten wir eif das alte todo
    // Wichtig ist zu wissen, dass die map-Funktion das existierende Array nicht bearbeitet. Es returned eine neues Array
    // Dann versteht auch React, dass wir etwas geändert haben, denn wir haben ein Array mit einem neuem ersetzt
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      // Erstellen ein neues todo-item, mit dem title, dass wir aus AddTodoForm mitgeben über ein callback
      {
        // Date brauchen wir, um bugs nicht zu verursachen
        // Wenn wir nämlich eine viertes element hinzufügen, dass dritte aber löschen, dann wird er wieder ein element mit der id 4 erstellen
        id: Date.now(),
        title,
        completed: false,
      },
      // Die anderen Todos dem neuen Array mitgeben
      ...prevTodos,
    ]);
  }

  function deleteTodo(id: number) {
    // update State und alle todos behalten auser das was wir gelöscht haben.
    // wir geben also eine id aus TodoItem mit und wir behalten alle todos die nicht mit der mitgelieferten id übereinstimmmen
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function deleteAllCompletedTodos() {
    // Filter alle fertigen Todos raus
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return {
    todos,
    addTodo,
    setTodoCompleted,
    deleteTodo,
    deleteAllCompletedTodos,
  };
}
