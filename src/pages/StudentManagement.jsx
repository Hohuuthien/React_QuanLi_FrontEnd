import { useEffect, useState } from "react";
import { api } from "../services/api";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Filters from "../components/Filters";
import "../styles/StudentManagenment.css";
import FormDialog from "../components/FormDialog";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [filters, setFilters] = useState({});

  const loadStudents = async () => {
    const data = await api.get("/students");
    setStudents(data || []);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    loadStudents();
  };

  const handleEdit = (student) => {
    setEditData(student);
    setIsEdit(true);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setIsEdit(false);
    setOpen(true);
  };

  const studentFilterFields = [
    {
      name: "class",
      label: "Lớp",
      type: "select",
      options: [
        { label: "CNTT1", value: "CNTT1" },
        { label: "CNTT2", value: "CNTT2" },
        { label: "CNTT3", value: "CNTT3" },
        { label: "CNTT4", value: "CNTT4" },
      ],
    },
    {
      name: "birthDay",
      label: "Ngày sinh",
      type: "date-range",
    },
  ];

  const filtered = students.filter((s) => {
    const matchSearch = (s.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchClass = filters.class ? s.class === filters.class : true;

    const matchRoom = filters.room
      ? s.room?.toLowerCase().includes(filters.room.toLowerCase())
      : true;

    const matchDate =
      (!filters.birthDay?.from ||
        new Date(s.birthDay) >= new Date(filters.birthDay.from)) &&
      (!filters.birthDay?.to ||
        new Date(s.birthDay) <= new Date(filters.birthDay.to));

    return matchSearch && matchClass && matchRoom && matchDate;
  });

  return (
    <>
      <div className="page-header">
        <h2>Student Management</h2>
        <button onClick={handleAdd}>+ Thêm sinh viên</button>
      </div>

      <div className="action-bar">
        <SearchBar value={search} onChange={setSearch} />
        <Filters
          fields={studentFilterFields}
          value={filters}
          onChange={setFilters}
        />
      </div>

      <FormDialog
        title={isEdit ? "Cập nhật sinh viên" : "Thêm sinh viên"}
        endpoint="/students"
        onSuccess={loadStudents}
        open={open}
        setOpen={setOpen}
        isEdit={isEdit}
        editData={editData}
        fields={[
          { name: "name", label: "Tên", required: true },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          },
          {
            name: "birthDay",
            label: "Ngày sinh",
            type: "date",
            required: true,
          },
          { name: "avatar", label: "Hình đại diện", required: true },
          {
            name: "class",
            label: "Lớp học",
            required: true,
          },
        ]}
      />

      <div className="table-card">
        <Table
          data={filtered}
          onDelete={handleDelete}
          onEdit={handleEdit}
          columns={[
            { key: "name", label: "Họ và Tên" },
            { key: "email", label: "Email" },
            { key: "birthDay", label: "Ngày sinh" },
            { key: "avatar", label: "Hình đại diện" },
            { key: "class", label: "Lớp học" },
          ]}
        />
      </div>
    </>
  );
}
