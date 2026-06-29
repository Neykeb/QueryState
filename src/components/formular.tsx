import { useState } from "react";

export function Formular() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [error, setError] = useState({
    username: '',
    email: ''
  })


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const nextErrors = {
      username: "",
      email: "",
    }

    if (!formData.username) {
      nextErrors.username = "Bitte gib einen Benutzernamen ein."
    }

    if (!formData.email) {
      nextErrors.email = "Bitte gib eine E-Mail-Adresse ein."
    }

    setError(nextErrors)
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        {error.username && <p>{error.username}</p>}
        {error.email && <p>{error.email}</p>}
        <input
          type="text"
          name="username" 
          // name="username": Das ist der Schlüssel, den handleChange über e.target.name ausliest. Damit weiß der Handler, welches Feld sich geändert hat.
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
