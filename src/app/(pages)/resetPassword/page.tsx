"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, CircleCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./styles.module.css";
import {
  resetPasswordSchema,
  usernameOrEmailSchema,
} from "../../../schemas/resetPasswordSchema";
import Form from "../../components/Forms/basicForm";

const SignUp = () => {
  const [isOtpSent, setIsOtpSent] = useState(false); // State to manage if OTP is sent or not
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // State to manage OTP input
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({}); // State to manage validation errors for form fields
  const [usernameOrEmailValidationError, setUsernameOrEmailValidationError] =
    useState(""); // State to manage validation errors for username or email field

  const [error, setError] = useState(""); // State to manage if there is an error in the API call
  const [success, setSuccess] = useState(""); // State to manage if the API call is successful
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    const { name, value } = e.target;
    if (name === "otp") {
      const numericValue = value === "" ? "" : value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, [name]: numericValue }));
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } else if (name === "usernameOrEmail") {
      setUsernameOrEmail(value);
      setUsernameOrEmailValidationError("");
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const sendOtp = async () => {
    try {
      usernameOrEmailSchema.parse(usernameOrEmail);
      setError("");
      setLoading(true);
      try {
        const response = await fetch("/api/v1/sendResetPasswordOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameOrEmail,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong.");
          setLoading(false);
          throw new Error(data.message || "Something went wrong.");
        }

        setLoading(false);
        setIsOtpSent(true);
        setError("");
      } catch (erro) {
        setError(erro.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      if (err.errors) {
        setUsernameOrEmailValidationError(err.errors[0].message);
      }
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      resetPasswordSchema.parse(formData);
      try {
        setError("");
        setLoading(true);
        const response = await fetch("/api/v1/resetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameOrEmail,
            otp: formData.otp,
            newPassword: formData.password,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message || "Something went wrong.");
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess(
          "Your Password has been reset successfully. Click Below to Login",
        );
        setIsOtpSent(false);
        setError("");
        setLoading(false);
      } catch (err) {
        console.error("Error Resetting Password ", err);
        setLoading(false);
        setError(`${err}`);
      }
    } catch (err) {
      if (err.errors) {
        // Mapping the error messages to the respective fields
        const newValidationErrors = {};
        err.errors.forEach((errr) => {
          newValidationErrors[errr.path[0]] = errr.message;
        });
        setValidationErrors(newValidationErrors);
      }
    }
  };

  return (
    <div
      className={styles.container}
      style={success === "" ? {} : { height: "100vh" }}
    >
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsOtpSent(false);
          setError("");
          setLoading(false);
          router.push("/");
        }}
        aria-label="Close"
      >
        <X width="50px" height="50px" />
      </button>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="logo" className={styles.logoImage} />
      </div>
      <div className={styles.signForm}>
        {!isOtpSent && success === "" && (
          <>
            <Form
              title="Forgot Password?"
              description="No worries! Enter your email address or username to reset your password."
              fields={[
                {
                  label: "Username or Email",
                  type: "text",
                  name: "usernameOrEmail",
                  value: usernameOrEmail,
                  placeholder: "johnsmith1717@gmail.com",
                  validationError: usernameOrEmailValidationError,
                  onChange: handleChange,
                },
              ]}
              loading={loading}
              onSubmit={sendOtp}
              error={error}
              buttonText="Reset Password"
              setError={setError}
            />
            <div
              className={`flex items-center justify-center mt-3 gap-2 hover:text-black cursor-pointer ${styles.backButton}`}
            >
              <ArrowLeft className="w-5 h-5" />
              <Link href="/signIn" className="text-sm font-medium ">
                Back to Login
              </Link>
            </div>
          </>
        )}
        {isOtpSent && success === "" && (
          <Form
            title="Set New Password"
            description="Verify your OTP and set a new password."
            fields={[
              {
                label: "OTP",
                type: "text",
                name: "otp",
                value: formData.otp,
                placeholder: "OTP",
                validationError: validationErrors.otp,
                onChange: handleChange,
              },
              {
                label: "New Password",
                type: "password",
                name: "password",
                value: formData.password,
                placeholder: "New Password",
                validationError: validationErrors.password,
                onChange: handleChange,
              },
              {
                label: "Confirm Password",
                type: "password",
                name: "confirmPassword",
                value: formData.confirmPassword,
                placeholder: "Confirm Password",
                validationError: validationErrors.confirmPassword,
                onChange: handleChange,
              },
            ]}
            onSubmit={resetPassword}
            error={error}
            loading={loading}
            buttonText="Reset"
            setError={setError}
          />
        )}
        {success && (
          <div className="flex flex-col items-center justify-center gap-6 p-6 max-w-md mx-auto">
            <CircleCheck className={`w-20 h-20 ${styles.circleCheck}`} />
            <p className={`text-center text-xl ${styles.successMessage}`}>
              {success}
            </p>
            <button
              onClick={() => {
                router.push("/signIn");
                setSuccess("");
              }}
              className={styles.submitButton}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
