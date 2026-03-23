import { useEffect, useState } from "react";
import { api } from "../services/api";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import "../styles/EmployeeManagement.css";
import FormDialog from "../components/FormDialog";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const loadEmployees = async () => {
    try {
      const data = await api.get("/employees");
      setEmployees(data || []);
    } catch (error) {
      console.error("Lỗi khi load employees:", error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      loadEmployees();
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const filtered = employees.filter((e) =>
    (e.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="page-header">
        <h2>Quản lý nhân viên</h2>
      </div>
      <FormDialog
        title="Thêm nhân viên"
        endpoint="/employees"
        onSuccess={loadEmployees}
        fields={[
          { name: "name", label: "Tên", required: true },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          },
          {
            name: "department",
            label: "Phòng ban",
            required: true,
          },
        ]}
      />
      <SearchBar value={search} onChange={setSearch} />

      <div className="table-wrapper">
        <Table
          data={filtered}
          onDelete={handleDelete}
          columns={[
            { key: "name", label: "Họ và Tên" },
            { key: "email", label: "Email" },
            { key: "department", label: "Phòng ban" },
          ]}
        />
      </div>
    </>
  );
}
