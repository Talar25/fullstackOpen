import { Part } from "./Part";

export function Content({ parts }) {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
    </>
  );
}
