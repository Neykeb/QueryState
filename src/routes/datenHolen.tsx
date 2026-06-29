import { createFileRoute } from "@tanstack/react-router";
// import { useState, useEffect } from "react";
import { fetchUsersById, createUser, fetchUsers } from "../data/users";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/datenHolen")({
  component: RouteComponent,
});

function RouteComponent() {
 interface User {
   id: number;
   name: string;
   email: string;
 } 
 
 const queryClient = useQueryClient();
//  Wir brauchen useQueryClient(), um an den Cache-Verwalter heranzukommen, damit wir ihm sagen können "die Daten mit dem Key ['users'] sind jetzt veraltet, bitte neu laden".

 // LESEN
const { data: users, isPending, isFetching, isError, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})

const userId = 4

const { data: singleUser, isPending: isUserPending } = useQuery({
  queryKey: ["user", userId], 
  queryFn: () => fetchUsersById(userId),
});

// SCHREIBEN
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: ()=>{
    //onSuccess: führe diese Funktion aus, NACHDEM die Mutation erfolgreich war
    queryClient.invalidateQueries({ queryKey: ["users"] });
    // { queryKey: ['users'] } = das Argument für invalidateQueries
    // sagt: "markiere GENAU die Query mit diesem Key als veraltet"
  }
})
function handleClick(){
  mutation.mutate({name: 'Max', email: 'max@bnb.com'})
}


if (isPending) {
  return <p>Lädt...</p>;
}

if (isError) {
  return <p> {error.message} </p>;
}


return (
  <>
  {isFetching && <p>Aktualisiere im Hintergrund...</p> }
    <ul>
      {users.map((item: User) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
    <button
      style={{
        backgroundColor: "darkred",
        padding: ".2rem",
        borderRadius: ".2rem",
      }}
      onClick={handleClick}
    >
      Add new User
    </button>
    {mutation.isPending && <p>Wird geladen...</p>}
    {mutation.isError && <p>Fehler beim Laden</p>}
    {mutation.isSuccess && (
      <p>
        User wurde angelegt: {mutation.data.name} (ID: {mutation.data.id})
      </p>
    )}

    <div>
      <h3>Ein einzelner User:</h3>
      {isUserPending ? <p>Lädt...</p> : <p>{singleUser.name}</p>}
    </div>
  </>
);
}


///////// Die Reihenfolge, die dabei abläuft:

// Du klickst → mutation.mutate(...) → createUser läuft → Server antwortet
// weil es erfolgreich war → onSuccess wird automatisch aufgerufen
// innerhalb von onSuccess → queryClient.invalidateQueries({ queryKey: ['users'] }) läuft
// dadurch → dein useQuery mit queryKey: ['users'] merkt: "ich bin veraltet" → lädt automatisch neu
// dadurch → users in deiner Komponente bekommt (eigentlich) die frischen Daten – bei dir sieht man's nur nicht, weil die Fake-API nichts wirklich speichert (wie eben besprochen)
