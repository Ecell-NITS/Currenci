import styles from "./inputFileds.module.css";
import ErrorFormFieldText from "../errorFormFieldText";

const InputField = ({
  label,
  type,
  inputMode,
  onChange,
  name,
  value,
  placeholder,
  validationError,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label
        htmlFor="username"
        className={styles.inputLabel}
        style={name === "otp" ? { marginBottom: "10px" } : {}}
      >
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        onChange={onChange}
        id={name}
        name={name}
        className={styles.inputField}
        value={value}
        placeholder={placeholder}
        maxLength={name === "otp" ? 6 : 100}
      />
      {validationError && <ErrorFormFieldText error={validationError} />}
    </div>
  );
};

export default InputField;
