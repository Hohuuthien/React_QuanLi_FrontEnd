import Control from "../pages/Control";

export default function SearchBar({ value, onChange }) {
  return (
    <Control
      label="Tìm kiếm"
      Placeholder="Tìm kiếm "
      name="search"
      type="text"
      value={value}
      onChange={(name, val) => onChange(val)}
      required={false}
    />
  );
}
