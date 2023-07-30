import React from "react";
import Note from "./Note";

function Zone(props) {
  const { notes, filters } = props;

  var results = notes.filter((note) =>
    note.author.name.toLowerCase().includes(filters.author)
  );

  if (filters.votes) {
    // eslint-disable-next-line eqeqeq
    results = results.filter((note) => note.votes == filters.votes);
  }

  return (
    <div className="d-flex align-content-start flex-wrap m-0">
      {results.map((note, index) => (
        <Note key={index} note={note} />
      ))}
    </div>
  );
}

export default Zone;
