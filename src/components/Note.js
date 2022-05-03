import React from "react";
import CONSTANT from "../constants";

const formatTime = (timestamp) => {
  const time = new Date(timestamp);
  return new Intl.DateTimeFormat("en-DE", {
    timeStyle: "medium",
    dateStyle: "short"
  }).format(time);
};

function Note({ note }) {
  const { author, content, votes, date } = note;
  return (
    <div
      className="card m-2 border-warning bg-warning shadow-sm d-inline-flex"
      style={{
        width: CONSTANT.NOTE_SIZE,
        height: CONSTANT.NOTE_SIZE
      }}
    >
      <div className="card-header">
        <h5 className="card-title">
          {author.name}
          <span className="badge bg-secondary ms-2">{votes}</span>
        </h5>
      </div>
      <div
        className="card-body"
        style={{ backgroundColor: CONSTANT.NOTE_BACKGROUND_COLOR }}
      >
        <p className="card-text">{content}</p>
      </div>
      <div
        className="card-footer text-muted fst-italic py-1"
        style={{ backgroundColor: CONSTANT.NOTE_BACKGROUND_COLOR }}
      >
        {formatTime(date)}
      </div>
    </div>
  );
}

export default Note;
