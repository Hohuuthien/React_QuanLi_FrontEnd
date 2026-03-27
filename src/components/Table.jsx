import { useState } from "react";
import "../styles/Table.css";

const DEFAULT_IMAGE = "/images/user.png";

const SORT_DEFAULT = "/images/sorts.png";
const SORT_ASC = "/images/top.png";
const SORT_DESC = "/images/arrow-down.png";

export default function Table({ data = [], columns = [], onDelete, onEdit }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const parseDate = (value) => {
    if (!value) return new Date(0);

    if (value.includes("/")) {
      const [d, m, y] = value.split("/");
      return new Date(Number(y), Number(m) - 1, Number(d));
    }

    return new Date(value);
  };

  const sortedData = [...data].sort((a, b) => {
    const { key, direction } = sortConfig;

    if (!key) return 0;

    let valueA = a[key];
    let valueB = b[key];

    if (valueA == null) return 1;
    if (valueB == null) return -1;

    if (!valueA) return 1;
    if (!valueB) return -1;

    if (key === "name") {
      return direction === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    }

    if (key === "birthDay") {
      const dateA = parseDate(valueA);
      const dateB = parseDate(valueB);

      return direction === "asc" ? dateA - dateB : dateB - dateA;
    }

    return direction === "asc"
      ? Number(valueA) - Number(valueB)
      : Number(valueB) - Number(valueA);
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return SORT_DEFAULT;
    if (sortConfig.direction === "asc") return SORT_ASC;
    return SORT_DESC;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th width="80">
              <div className="header-content">
                ID
                <span onClick={() => handleSort("id")}>
                  <img src={getSortIcon("id")} className="btn-sort" />
                </span>
              </div>
            </th>

            {columns.map((col) => (
              <th key={col.key}>
                <div className="header-content">
                  {col.label}
                  <span onClick={() => handleSort(col.key)}>
                    <img src={getSortIcon(col.key)} className="btn-sort" />
                  </span>
                </div>
              </th>
            ))}

            <th style={{ textAlign: "right" }}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2} style={{ textAlign: "center" }}>
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            sortedData.map((item) => (
              <tr key={item.id}>
                <td className="id-column">#{item.id}</td>

                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "name" ? (
                      <div className="user-name-cell">
                        <div className="user-avatar-small">
                          {item.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <span style={{ fontWeight: 500 }}>
                          {item.name || "N/A"}
                        </span>
                      </div>
                    ) : col.key === "avatar" ? (
                      <img
                        src={
                          item.avatar && item.avatar.trim() !== ""
                            ? item.avatar
                            : DEFAULT_IMAGE
                        }
                        className="table-image"
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGE;
                        }}
                      />
                    ) : (
                      <span className="text-muted">{item[col.key] || "—"}</span>
                    )}
                  </td>
                ))}

                <td style={{ textAlign: "right" }}>
                  {onEdit && (
                    <button onClick={() => onEdit(item)} className="btn-edit">
                      Sửa
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn-delete"
                    >
                      Xóa
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
