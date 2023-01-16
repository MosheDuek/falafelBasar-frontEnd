import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { Fragment } = require("react");

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [suggests, setSuggest] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/products/names")
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  useEffect(() => {
    let d = [...data];
    let s = [];
    if (value) {
      d.forEach((element) => {
        if (element.name.includes(value)) {
          s.push(element.name);
        }
      });
      setSuggest(s);
    } else {
      setSuggest([]);
    }
  }, [value]);

  const handleBlur = () => {
    setSuggest([]);
  };

  const handleClick = (ev) => {
    setValue(ev.target.textContent);
  };

  const handleSubmit = (ev) => {
    setSuggest([]);
    ev.preventDefault();
    let d = [...data];
    d = d.filter((elem) => elem.name === value);
    navigate(`/מוצר/${d[0].idproducts}`);
  };

  return (
    <Fragment>
      {data && (
        <form role="search" onSubmit={handleSubmit}>
          <div className="d-flex">
            <input
              className="form-control ms-2"
              type="search"
              placeholder="חיפוש"
              aria-label="Search"
              value={value}
              onChange={handleChange}
            />
            <button className="btn btn-outline-warning" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          {suggests[0] && (
            <div className="list-group p-0 w-75" onBlur={handleBlur}>
              {suggests.map((suggest, idx) => (
                <button
                  className="list-group-item pointer absolute"
                  key={idx}
                  onClick={handleClick}
                >
                  {suggest}
                </button>
              ))}
            </div>
          )}
        </form>
      )}
    </Fragment>
  );
};

export default SearchBar;
