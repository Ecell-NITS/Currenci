"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";
import { signUpSchema, otpSchema } from "../../../schemas/signUpSchema";
import LoadingSpinner from "../../components/loadingSpinner";
import ErrorText from "../../components/errorText";
import SuccessText from "../../components/successText";
import InputField from "../../components/InputFields/inputFields";

const SignUp = () => {
  const [isOtpSent, setIsOtpSent] = useState(false); // State to manage if OTP is sent or not
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(""); // State to manage OTP input
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({}); // State to manage validation errors for form fields
  const [otpValidationErrors, setOtpValidationErrors] = useState(""); // State to manage validation errors for OTP field
  const [error, setError] = useState(""); // State to manage if there is an error in the API call
  const [success, setSuccess] = useState(""); // State to manage if the API call is successful
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [timer, setTimer] = useState(60); // State to manage the timer for OTP resend

  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown); // cleanup
    }

    // Ensure return statement is present, even when the timer is 0
    return undefined;
  }, [timer]);

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "otp") {
      const numericValue = value === "" ? "" : value.replace(/\D/g, "");
      setOtp(numericValue);
      setOtpValidationErrors("");
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const registerUser = async () => {
    try {
      otpSchema.parse(otp);
      setError("");
      setLoading(true);
      try {
        const response = await fetch("/api/v1/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            otp,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong.");
          setLoading(false);
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess(
          "Registration Successful. Please login with your credentials now. Redirecting to login page...",
        );
        setLoading(false);
        setTimeout(() => {
          router.push("/signIn");
        }, 3000);
      } catch (erro) {
        setError(erro.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      if (err.errors) {
        setOtpValidationErrors(err.errors[0].message);
      }
    }
  };

  const resendOtp = async () => {
    setTimer(60);
    try {
      const response = await fetch("/api/v1/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        setTimer(60);
        setLoading(false);
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error sending OTP", error);
      setError(err);
      setTimer(60);
      setLoading(false);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      signUpSchema.parse(formData);

      try {
        setLoading(true);
        const response = await fetch("/api/v1/sendOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message || "Something went wrong.");
          throw new Error(data.message || "Something went wrong.");
        }
        setLoading(false);
        setIsOtpSent(true);
        setError("");
        setTimer(60);
      } catch (err) {
        console.error("Error sending OTP", err);
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
      style={isOtpSent ? { height: "100vh" } : {}}
    >
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsOtpSent(false);
          setTimer(60);
          setError("");
          setLoading(false);
          router.push("/");
        }}
      >
        <img
          src="/images/close.webp"
          alt="Close"
          className={styles.closeImage}
        />
      </button>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="logo" className={styles.logoImage} />
      </div>
      <div className={styles.signForm}>
        {!isOtpSent && (
          <>
            <p className={styles.signUpTitle}>Sign Up</p>
            {error && <ErrorText error={error} setError={setError} />}
            <InputField
              label="Username"
              type="text"
              inputMode="text"
              onChange={handleChange}
              name="username"
              value={formData.username}
              placeholder="johnsmith1717"
              validationError={validationErrors.username}
            />
            <InputField
              label="Email"
              type="text"
              inputMode="email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              placeholder="johnsmith@email.com"
              validationError={validationErrors.email}
            />
            <InputField
              label="Password"
              type="password"
              inputMode="text"
              onChange={handleChange}
              name="password"
              value={formData.password}
              placeholder="Your Password"
              validationError={validationErrors.password}
            />
            <InputField
              label="Confirm Password"
              type="password"
              inputMode="text"
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Your Password"
              validationError={validationErrors.confirmPassword}
            />
            <button
              onClick={sendOtp}
              type="button"
              className={styles.submitButton}
              disabled={loading}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {loading && <LoadingSpinner />}
                <span>Sign Up</span>
              </div>
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "50px",
              }}
            >
              <p className={styles.signUpText}>Already have an account?</p>
              <Link className={styles.signInRedirect} href="/signIn">
                SignIn Now
              </Link>
            </div>
          </>
        )}
        {isOtpSent && (
          <>
            <p className={styles.verificationCodeTitle}>Verification Code</p>
            {error && <ErrorText error={error} setError={setError} />}
            {success && <SuccessText message={success} />}
            <InputField
              label="We have sent a verification code to your email address."
              type="text"
              inputMode="text"
              onChange={handleChange}
              name="otp"
              value={otp}
              placeholder="OTP"
              validationError={otpValidationErrors}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-start",
                width: "100%",
              }}
            >
              <p
                className={styles.signUpText}
                style={{ textAlign: "left", alignSelf: "flex-start" }}
              >
                {timer > 0 ? (
                  `You can resend OTP in ${timer} secs.`
                ) : (
                  <button
                    onClick={resendOtp}
                    className={styles.resendButton}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                )}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                  gap: "10px",
                }}
              >
                <button
                  onClick={registerUser}
                  type="button"
                  className={styles.submitButton}
                  disabled={loading}
                  style={{ alignSelf: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {loading && <LoadingSpinner />}
                    <span>{loading ? "Verifying..." : "Confirm"}</span>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
