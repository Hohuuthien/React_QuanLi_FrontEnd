import { useEffect, useState } from "react";

export default function Control({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  required,
  minLength,
  options = [],
  onError,
}) {
  const [error, setError] = useState("");

  useEffect(() => {
    let err = "";

    if (required && !value.trim()) {
      err = label + " không được để trống";
    } else if (minLength && value.length < minLength) {
      err = label + " phải có ít nhất " + minLength + " ký tự";
    }

    setError(err);
    onError && onError(name, err);
  }, [value, required, minLength, label, name, onError]);

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="control-group" style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <br />

      {type === "select" ? (
        <select value={value} onChange={handleChange}>
          <option value="">-- Chọn --</option>
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} value={value} onChange={handleChange} />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
