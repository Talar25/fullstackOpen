import { Person } from "./Person";

export function Persons({ persons, filter, handleDelete }) {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            handleDelete={() => handleDelete(person)}
          ></Person>
        ))}
    </>
  );
}
