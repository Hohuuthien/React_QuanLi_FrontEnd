import { useEffect, useState } from "react";
import { api } from "../services/api";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import "../styles/StudentManagenment.css";
import FormDialog from "../components/FormDialog";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const loadStudents = async () => {
    const data = await api.get("/students");
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    loadStudents();
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="page-header">
        <h2>Student Management</h2>
        <p>Danh sách sinh viên đang theo học tại hệ thống</p>
      </div>
      <FormDialog
        title="Thêm sinh viên"
        endpoint="/students"
        onSuccess={loadStudents}
        fields={[
          { name: "name", label: "Tên", required: true },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          },
          {
            name: "class",
            label: "Lớp học",
            required: true,
          },
        ]}
      />
      <div className="action-bar">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="table-card">
        <Table
          data={filtered}
          onDelete={handleDelete}
          columns={[
            { key: "name", label: "Họ và Tên" },
            { key: "email", label: "Email" },
            { key: "class", label: "Lớp học" },
          ]}
        />
      </div>
    </>
  );
}
