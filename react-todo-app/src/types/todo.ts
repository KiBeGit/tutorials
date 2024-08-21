// In dieser Datei setze ich die Datentype für dummyData in todos.ts explizit
// Damit verhindere ich, dass ich in eine Objekt ausversehen einen falschen Datentypen benutze
// Ich könnte das interface auch in dem todo.ts file unter den imports declaren

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
