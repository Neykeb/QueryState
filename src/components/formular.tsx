import { useContext, useState } from "react";
import { FormularContext } from "../context/formularContext";


export function Formular() {
  // Globale Daten abholen
  const context = useContext(FormularContext);

  if (!context) {
    return <p>Fehler: FormularProvider nicht gefunden!</p>;
  }

  const { formData, handleChange } = context;

  // Error-State bleibt lokal (nur diese Komponente)
  const [error, setError] = useState({
    username: "",
    email: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = {
      username: "",
      email: "",
    };

    if (!formData.username) {
      nextErrors.username = "Bitte gib einen Benutzernamen ein.";
    }

    if (!formData.email) {
      nextErrors.email = "Bitte gib eine E-Mail-Adresse ein.";
    }

    setError(nextErrors);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error.username && <p>{error.username}</p>}
        {error.email && <p>{error.email}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          onChange={handleChange}
          value={formData.email}
        />
        <button>abschicken</button>
      </form>
    </>
  );
}
