import { useReducer } from "react";

// 1. Die Blaupause für deine Daten (TypeScript Typen)
type StateType = {
  email: string;
  isLoggedIn: boolean;
};

type ActionType =
  | { type: "input-change"; value: string }
  | { type: "login" }
  | { type: "logout" };

// 2. Die Schaltzentrale (Reducer)
const reducerFunction = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "input-change":
      return { ...state, email: action.value };
    case "login":
      return { ...state, isLoggedIn: true };
    case "logout":
      return { ...state, isLoggedIn: false, email: "" }; // Setzt auch das Feld zurück
    default:
      return state;
  }
};

// 3. Die Komponente (Das sichtbare Formular)
export function LogInForm() {
  const [state, dispatch] = useReducer(reducerFunction, {
    email: "",
    isLoggedIn: false,
  });

  return (
    <div
      style={{
        background: "#1e1e24",
        padding: "20px",
        color: "white",
        borderRadius: "8px",
        width: "250px",
        margin: "20px auto",
        fontFamily: "sans-serif",
      }}
    >
      {/* Wenn NICHT eingeloggt, zeige das Formular */}
      {!state.isLoggedIn ? (
        <div>
          <h3>Bitte einloggen</h3>
          <input
            type="email"
            placeholder="E-Mail..."
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "input-change", value: e.target.value })
            }
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "5px",
            }}
          />
          <input
            type="password"
            placeholder="Passwort..."
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "5px",
            }}
          />
          <button
            onClick={() => dispatch({ type: "login" })}
            style={{ width: "100%", padding: "8px" }}
          >
            Einloggen
          </button>
        </div>
      ) : (
        /* Wenn EINGELOGGT, zeige die Willkommens-Nachricht */
        <div>
          <h3>Willkommen!</h3>
          <p>Eingeloggt als: {state.email || "Anonymer User"}</p>
          <button
            onClick={() => dispatch({ type: "logout" })}
            style={{ width: "100%", padding: "8px" }}
          >
            Ausloggen
          </button>
        </div>
      )}
    </div>
  );
}
