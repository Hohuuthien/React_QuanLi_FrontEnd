import { useState, useEffect } from "react";
import { api } from "../services/api";
import "../styles/Dialog.css";
import Control from "../pages/Control";

export default function FormDialog({
  title,
  fields,
  endpoint,
  onSuccess,
  editData,
  isEdit,
  open,
  setOpen,
}) {
  const createInitForm = () => {
    const obj = {};
    fields.forEach((f) => (obj[f.name] = ""));
    return obj;
  };

  const [form, setForm] = useState(createInitForm());
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!open) return;

    const init = createInitForm();

    if (editData) {
      setForm({ ...init, ...editData });
    } else {
      setForm(init);
    }

    setErrors({});
  }, [open, editData, fields]);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleError = (name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  useEffect(() => {
    let hasEmpty = false;
    let hasError = false;

    for (let key in form) {
      if (!form[key]) {
        hasEmpty = true;
        break;
      }
    }

    for (let key in errors) {
      if (errors[key]) {
        hasError = true;
        break;
      }
    }

    setIsValid(!hasEmpty && !hasError);
  }, [form, errors]);
  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      if (isEdit) {
        await api.put(`${endpoint}/${form.id}`, form);
      } else {
        const newData = {
          ...form,
          id: crypto.randomUUID().slice(0, 4),
        };
        await api.post(endpoint, newData);
      }

      setOpen(false);
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="custom-dialog">
        <h3>{isEdit ? "Cập nhật" : title}</h3>

        <div className="form-content">
          {fields.map((field) => (
            <Control
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={form[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              minLength={field.minLength}
              options={field.options}
              onError={handleError}
            />
          ))}
        </div>

        <div className="dialog-actions">
          <button
            className={`btn-submit ${!isValid ? "disabled" : ""}`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </button>

          <button onClick={() => setOpen(false)} className="btn-cancel">
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
