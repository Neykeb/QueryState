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


  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const nextErrors = {
    username: "",
    email: "",
  }

  if (nextErrors ) {
    nextErrors.username = "Bitte gib einen Benutzernamen ein."
  }

  if (nextErrors) {
    nextErrors.email = "Bitte gib eine E-Mail-Adresse ein."
  }

  return nextErrors
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
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
