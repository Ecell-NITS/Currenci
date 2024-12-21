import LoadingSpinner from "../loadingSpinner";
import ErrorText from "../errorText";
import ErrorFormFieldText from "../errorFormFieldText";
import styles from "./styles.module.css";
import SuccessText from "../successText";

const Form = ({
  title = "",
  description = "",
  fields,
  onSubmit,
  error = "",
  success = "",
  loading = false,
  buttonText,
  setError,
}) => {
  return (
    <>
      {title && (
        <p
          className={styles.formTitle}
          style={{ fontFamily: "Sofia Pro Regular" }}
        >
          {title}
        </p>
      )}
      {description && (
        <p
          className={styles.verificationCodePara}
          style={{ fontFamily: "Sofia Pro Light" }}
        >
          {description}
        </p>
      )}
      {error && <ErrorText error={error} setError={setError} />}
      {success && <SuccessText message={success} />}
      <form
        className="w-full flex flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        {fields.map((field) => (
          <div key={`${field.name}basicForm`} className="w-full mb-4">
            <label
              htmlFor={field.name}
              className={styles.inputLabel}
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              inputMode={field.name === "otp" ? "numeric" : "text"}
              onChange={field.onChange}
              id={field.name}
              name={field.name}
              className={styles.inputField}
              value={field.value}
              placeholder={field.placeholder}
              maxLength={field.name === "otp" ? 6 : 100}
              style={{ fontFamily: "Sofia Pro Light" }}
            />
            {field.validationError && (
              <ErrorFormFieldText error={field.validationError} />
            )}
          </div>
        ))}
        {buttonText && (
          <button
            onClick={onSubmit}
            type="button"
            className={styles.submitButton}
            disabled={loading}
            style={{ fontFamily: "Sofia Pro Regular" }}
          >
            <div className="flex flex-row items-center justify-center gap-3">
              {loading && <LoadingSpinner />}
              <span>{buttonText}</span>
            </div>
          </button>
        )}
      </form>
    </>
  );
};

export default Form;
