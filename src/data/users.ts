export async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users"); 
  

  if (!response.ok) {
    throw new Error("Fehler beim Laden der Benutzer");
  }

  return response.json();
}

export async function fetchUsersById(userId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  ); 


  if (!response.ok) {
    throw new Error("Fehler beim Laden der Benutzer");
  }

  return response.json();

}

export async function createUser(newUser: {name: string; email: string;}){
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {'Content-Type': 'application-json'},
        body: JSON.stringify(newUser)
      }
    );

    if (!response.ok){
        throw new Error("Fehler beim Erstellen des Benutzers")
    }
    return response.json();
}
