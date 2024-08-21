import { Plus } from "lucide-react";
import { useState } from "react";

// Props sind Argumente für die Funktionen von Komponenten. Hierunter declare wir aber zunächst die Datentypen der Props
interface AddTodoFormProps {
  // für Callback. Es gibt den Title nur zurück
  onSubmit: (title: string) => void;
}

// Komponenten werden in Pascal-Case geschrieben
// Die Props an sich kommen dann hier rein
export default function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // damit sich die Seite nicht neulädt
    e.preventDefault();

    if (!input.trim()) return;

    // wir geben den input über callback der parent-komponente
    onSubmit(input);
    setInput("");
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        // wenn man nur value behält wird man nichts schreiben können, da wir den State explizit auf leer setzen
        value={input}
        // deswegen brauchen wir einen Event. wir updaten den State mit setInput und geben das rein, wass wir tippen
        onChange={(e) => setInput(e.target.value)}
        placeholder="Was für eine Aufgabe hast du?"
        className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-10 rounded-e-md bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center"
      >
        <Plus />
      </button>
    </form>
  );
}
