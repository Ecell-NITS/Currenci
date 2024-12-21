import React from "react";
import OTPInput from "../otpField";
import ErrorText from "../errorText";
import SuccessText from "../successText";
import styles from "./styles.module.css";
import LoadingSpinner from "../loadingSpinner";

const VerificationCode = ({
  title = "",
  description = "",
  error,
  setError,
  success,
  otp = ["", "", "", "", "", ""],
  handleOTPChange,
  otpValidationErrors = "",
  onSubmit = () => {},
  loading = false,
  buttonText = "",
}) => {
  return (
    <>
      <p
        className={styles.verificationCodeTitle}
        style={{ fontFamily: "Sofia Pro Regular" }}
      >
        {title}
      </p>
      {error && <ErrorText error={error} setError={setError} />}
      {success && <SuccessText message={success} />}
      {description && (
        <p
          className={styles.verificationCodePara}
          style={{ fontFamily: "Sofia Pro Light" }}
        >
          {description}
        </p>
      )}
      <form
        className="w-full flex flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <OTPInput
          otp={otp}
          onChange={(updatedOtp) =>
            handleOTPChange(
              {
                target: { name: "otp", value: "" },
              } as React.ChangeEvent<HTMLInputElement>,
              updatedOtp,
            )
          }
          length={6}
          validationError={otpValidationErrors}
        />
        {buttonText && (
          <button
            onClick={onSubmit}
            type="button"
            className={styles.submitButton}
            disabled={loading}
            style={{ alignSelf: "center" }}
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

export default VerificationCode;
