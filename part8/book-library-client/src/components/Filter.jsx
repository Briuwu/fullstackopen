const Filter = ({ genres, setGenre }) => {
  return (
    <div>
      {genres.map((genre, i) => (
        <button onClick={() => setGenre(genre)} key={i}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};
export default Filter;
