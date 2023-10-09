import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const EditYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born: parseInt(born) } });

    setName("");
    setBorn("");
  };

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit} style={{ maxWidth: "300px" }}>
        <Select
          defaultValue={name}
          onChange={({ value }) => setName(value)}
          options={options}
        />
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
export default EditYear;
