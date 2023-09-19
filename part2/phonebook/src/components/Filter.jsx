const Filter = ({ search, onSearch }) => {
  return (
    <div>
      filter shown with: <input value={search} onChange={onSearch} />
    </div>
  );
};
export default Filter;
