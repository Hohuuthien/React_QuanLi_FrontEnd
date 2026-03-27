import { useEffect, useState } from "react";
import "../styles/Filters.css";

export default function Filters({ fields = [], value = {}, onChange }) {
  const [filters, setFilters] = useState(value);

  useEffect(() => {
    onChange && onChange(filters);
  }, [filters]);

  const handleChange = (name, val) => {
    setFilters((prev) => ({ ...prev, [name]: val }));
  };

  const handleReset = () => {
    const empty = {};
    fields.forEach((f) => (empty[f.name] = ""));
    setFilters(empty);
  };

  return (
    <div className="filters">
      {fields.map((f) =>
        f.type === "select" ? (
          <select
            key={f.name}
            value={filters[f.name] || ""}
            onChange={(e) => handleChange(f.name, e.target.value)}
          >
            <option value="">-- {f.label} --</option>
            {f.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : f.type === "date-range" ? (
          <div key={f.name} className="date-range">
            <input
              type="date"
              value={filters[f.name]?.from || ""}
              onChange={(e) =>
                handleChange(f.name, {
                  ...filters[f.name],
                  from: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={filters[f.name]?.to || ""}
              onChange={(e) =>
                handleChange(f.name, {
                  ...filters[f.name],
                  to: e.target.value,
                })
              }
            />
          </div>
        ) : (
          <input
            key={f.name}
            type="text"
            placeholder={f.label}
            value={filters[f.name] || ""}
            onChange={(e) => handleChange(f.name, e.target.value)}
          />
        ),
      )}

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
