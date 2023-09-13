export function PersonForm({
  handleAddNumber,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) {
  return (
    <form onSubmit={(e) => handleAddNumber(e)}>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
