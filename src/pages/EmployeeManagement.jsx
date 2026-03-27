import { useEffect, useState } from "react";
import { api } from "../services/api";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Filters from "../components/Filters";
import "../styles/EmployeeManagement.css";
import FormDialog from "../components/FormDialog";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [filters, setFilters] = useState({});

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

  const handleAdd = () => {
    setEditData(null);
    setIsEdit(false);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsEdit(true);
    setOpen(true);
  };

  const employeeFilterFields = [
    {
      name: "department",
      label: "Phòng ban",
      type: "select",
      options: [
        { label: "IT", value: "IT" },
        { label: "HR", value: "HR" },
        { label: "Marketing", value: "Marketing" },
      ],
    },
    {
      name: "birthDay",
      label: "Ngày sinh",
      type: "date-range",
    },
  ];

  const filtered = employees.filter((e) => {
    const matchSearch = (e.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDepartment = filters.department
      ? e.department === filters.department
      : true;

    const matchDate =
      (!filters.birthDay?.from ||
        new Date(e.birthDay) >= new Date(filters.birthDay.from)) &&
      (!filters.birthDay?.to ||
        new Date(e.birthDay) <= new Date(filters.birthDay.to));

    return matchSearch && matchDepartment && matchDate;
  });

  return (
    <>
      <div className="page-header">
        <h2>Quản lý nhân viên</h2>
        <button onClick={handleAdd}>+ Thêm nhân viên</button>
      </div>

      <FormDialog
        title={isEdit ? "Cập nhật nhân viên" : "Thêm nhân viên"}
        endpoint="/employees"
        onSuccess={loadEmployees}
        fields={[
          { name: "name", label: "Tên", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "birthDay",
            label: "Ngày sinh",
            type: "date",
            required: true,
          },
          { name: "avatar", label: "Hình đại diện", required: true },
          { name: "department", label: "Phòng ban", required: true },
        ]}
        open={open}
        setOpen={setOpen}
        isEdit={isEdit}
        editData={editData}
      />

      <div className="action-bar">
        <SearchBar value={search} onChange={setSearch} />
        <Filters
          fields={employeeFilterFields}
          value={filters}
          onChange={setFilters}
        />
      </div>

      <div className="table-wrapper">
        <Table
          data={filtered}
          onDelete={handleDelete}
          onEdit={handleEdit}
          columns={[
            { key: "name", label: "Họ và Tên" },
            { key: "email", label: "Email" },
            { key: "birthDay", label: "Ngày sinh" },
            { key: "avatar", label: "Hình đại diện" },
            { key: "department", label: "Phòng ban" },
          ]}
        />
      </div>
    </>
  );
}
