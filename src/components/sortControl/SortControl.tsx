import * as React from "react";
import "./SortControl.css";

interface SortControlProps {
  selectedValue: string;
  onChange: (value: string) => void;
}

const SortControl = ({ selectedValue, onChange }: SortControlProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="sort-control">
      <label htmlFor="sortby">Sort by:</label>
      <select id="sortby" value={selectedValue} onChange={handleChange}>
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortControl;
