const Persons = ({ persons, onDeleteClick }) => {
  return persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => onDeleteClick(person.id)}>delete</button>
    </div>
  ));
};
export default Persons;
