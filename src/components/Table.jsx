import "../styles/Table.css";

export default function Table({ data, columns, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>

            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}

            <th style={{ textAlign: "right" }}>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="id-column">#{item.id}</td>

              {columns.map((col) => (
                <td key={col.key}>
                  {col.key === "name" ? (
                    <div className="user-name-cell">
                      <div className="user-avatar-small">
                        {item.name?.charAt(0)}
                      </div>
                      <span>{item.name}</span>
                    </div>
                  ) : (
                    <span className="email-cell">{item[col.key]}</span>
                  )}
                </td>
              ))}

              <td style={{ textAlign: "right" }}>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
