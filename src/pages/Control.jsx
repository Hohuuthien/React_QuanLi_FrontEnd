import { useEffect, useRef } from "react";

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
  const errorRef = useRef("");
  const errorElRef = useRef(null);

  const validate = () => {
    let err = "";

    if (required && !value.trim()) {
      err = label + " không được để trống";
    } else if (minLength && value.length < minLength) {
      err = label + " phải có ít nhất " + minLength + " ký tự";
    } else if (
      name === "avatar" &&
      value &&
      !/\.(png|jpg|jpeg)$/i.test(value)
    ) {
      err = "URL hình ảnh phải có đuôi .png, .jpg hoặc .jpeg";
    }

    if (errorRef.current !== err) {
      errorRef.current = err;

      if (errorElRef.current) {
        errorElRef.current.textContent = err;
        errorElRef.current.style.display = err ? "block" : "none";
      }

      if (onError) {
        onError(name, err);
      }
    }
  };

  useEffect(() => {
    validate();
  }, [value, required, minLength, label, name]);

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="control-group" style={{ marginBottom: "10px" }}>
      <label>{label}</label>

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

      <p
        ref={errorElRef}
        style={{ color: "red", display: "none", margin: 0 }}
      />
    </div>
  );
}
