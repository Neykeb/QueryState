import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { addTodo } from "./todoSlice";

export function TodoApp() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <button onClick={() => dispatch(addTodo("Hausaufgaben machen"))}>
        Todo hinzufügen
      </button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
