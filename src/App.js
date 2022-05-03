import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router";
import * as _data from "./Sprint60.json";
import Zone from "./components/Zone";
import CONSTANT from "./constants";

const dbGenerator = () => {
  Object.values(_data.default).forEach((zone) => {
    const len = Object.keys(zone).length;
    Object.values(zone).forEach(
      (author) => (author.votes = Math.round(Math.random() * len))
    );
  });
  return _data.default;
};

const formatZoneName = (zn) => {
  var res = zn.replace(/\s/g, "-");
  const endIdx = zn.length - 1;
  if (zn[endIdx] === "?") res = res.slice(0, endIdx);
  return res;
};

const DB = dbGenerator();

function App() {
  const [filters, setFilters] = React.useState({ author: "", votes: "" });
  const location = useLocation();

  const handleChange = (type, value) => {
    switch (type) {
      case 1:
        setFilters({ ...filters, author: value.toLowerCase() });
        break;
      case 2:
        setFilters({ ...filters, votes: value.replace(/[^\d]/g, "") });
        break;
      default:
        break;
    }
  };

  const handleClear = () => setFilters({ author: "", votes: "" });

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark mb-2">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">MetroRetro</span>

          <div className="input-group m-0" style={{ width: "auto" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              value={filters.author}
              onChange={(e) => handleChange(1, e.target.value)}
            />
            <span className="input-group-text">with</span>
            <input
              type="text"
              className="form-control"
              placeholder="Votes"
              value={filters.votes}
              onChange={(e) => handleChange(2, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN APP */}
      <div className="container-fluid d-flex">
        {/* ZONE NAMES */}
        <div className="me-2">
          {Object.keys(DB).map((zoneName) => {
            const _zname = formatZoneName(zoneName);
            const _active = "/" + _zname === location.pathname ? " active" : "";

            return (
              <Link
                key={_zname}
                to={_zname}
                className={
                  "btn btn-outline-dark my-2 text-start pb-2 d-block" + _active
                }
                style={{ width: CONSTANT.NOTE_SIZE }}
              >
                {zoneName}
              </Link>
            );
          })}
        </div>

        {/* NOTES */}
        <div className="container-fluid m-0 p-0">
          <Routes>
            {Object.keys(DB).map((zoneName) => {
              const _zname = formatZoneName(zoneName);
              return (
                <Route
                  key={"route" + _zname}
                  path={_zname}
                  element={<Zone notes={DB[zoneName]} filters={filters} />}
                />
              );
            })}
            <Route path="/" exact />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
