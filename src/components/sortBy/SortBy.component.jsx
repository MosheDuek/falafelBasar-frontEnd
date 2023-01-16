import { Fragment } from "react";

const SortBy = ({ onSortBy }) => {
  const handleChange = (ev) => {
    onSortBy(ev.target.value);
  };
  return (
    <Fragment>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleChange}
      >
        <option>מיין לפי:</option>
        <option value="0">רגיל</option>
        <option value="1">מהזול ליקר</option>
        <option value="2">מהיקר לזול</option>
      </select>
    </Fragment>
  );
};

export default SortBy;
