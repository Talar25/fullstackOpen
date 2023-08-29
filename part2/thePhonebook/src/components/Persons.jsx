import { Person } from "./Person";

export function Persons({ persons, filter }) {
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
          ></Person>
        ))}
    </>
  );
}
