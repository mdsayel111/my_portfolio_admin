import { Label } from "@antopolis/admin-component-library/dist/form-58cc0443";
import "./Switch.css";

export default function Switch({ value, setValue, label }) {
  return (
    <div>
      <div className="mb-2">
        <Label style={{ marginBottom: "2px" }}>{label}</Label>
      </div>
      <div className="container">
        <input
          checked={value}
          onChange={() => setValue(!value)}
          type="checkbox"
          name="checkbox"
          id="checkbox"
        />
        <label htmlFor="checkbox" className="label"></label>
      </div>
    </div>
  );
}
