export function Person({ name, number, handleDelete }) {
  return (
    <div>
      <span>
        {name} {number}
      </span>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
