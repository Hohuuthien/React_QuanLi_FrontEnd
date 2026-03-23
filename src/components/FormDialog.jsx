import { useRef, useState, useEffect } from "react";
import { api } from "../services/api";
import "../styles/Dialog.css";
import Control from "../pages/Control";

export default function FormDialog({ title, fields, endpoint, onSuccess }) {
  const dialogRef = useRef();

  const initForm = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

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
    let valid = true;

    for (let key in form) {
      if (!form[key]) {
        valid = false;
        break;
      }
    }

    for (let key in errors) {
      if (errors[key]) {
        valid = false;
        break;
      }
    }

    setIsValid(valid);
  }, [form, errors]);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      const newData = {
        ...form,
        id: crypto.randomUUID().slice(0, 4),
      };

      await api.post(endpoint, newData);

      setForm(initForm);
      setErrors({});
      closeDialog();

      onSuccess && onSuccess();
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <button onClick={openDialog}>+ Thêm</button>

      <dialog ref={dialogRef} className="custom-dialog">
        <h3>{title}</h3>

        <div className="form-content">
          {fields.map((field) => (
            <Control
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
              minLength={field.minLength}
              options={field.options}
              onError={handleError}
            />
          ))}
        </div>

        <div style={{ marginTop: "12px" }} className="dialog-actions">
          <button onClick={handleSubmit} disabled={!isValid}>
            Thêm
          </button>

          <button
            onClick={closeDialog}
            style={{ marginLeft: "8px" }}
            className="cancel-btn"
          >
            Hủy
          </button>
        </div>
      </dialog>
    </div>
  );
}
