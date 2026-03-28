import Control from "../pages/Control";

export default function SearchBar({ value, onChange }) {
  return (
    <Control
      placeholder="Tìm kiếm"
      name="search"
      type="text"
      value={value}
      onChange={(name, val) => onChange(val)}
      required={false}
    />
  );
}
