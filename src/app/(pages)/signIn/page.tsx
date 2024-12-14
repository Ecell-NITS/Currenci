"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./signin.module.css";
import InputField from "../../components/InputFields/inputFields";
import LoadingSpinner from "../../components/loadingSpinner";
import ErrorText from "../../components/errorText";
import SuccessText from "../../components/successText";
import { signInSchema } from "../../../schemas/signInSchema";

const SignIn = () => {
  const [error, setError] = useState(""); // State to manage if there is an error in the API call
  const [success, setSuccess] = useState(""); // State to manage if the API call is successful
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const login = async () => {
    try {
      signInSchema.parse(formData);

      try {
        setError("");
        setLoading(true);
        const response = await fetch("/api/v1/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong.");
          setLoading(false);
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess("Login Successful. Redirecting to home page...");
        setLoading(false);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      if (err.errors) {
        // Mapping the error messages to the respective fields
        const newValidationErrors = {};
        err.errors.forEach((er) => {
          newValidationErrors[er.path[0]] = er.message;
        });
        setValidationErrors(newValidationErrors);
      }
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.closeButton}
        onClick={() => {
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
        <h1 className={styles.welcomeTitle}>Welcome Back</h1>
        <p className={styles.loginTitle}>Login</p>
        {error && <ErrorText error={error} setError={setError} />}
        {success && <SuccessText message={success} />}
        <InputField
          label="Username or Email"
          type="text"
          inputMode="text"
          onChange={handleChange}
          name="usernameOrEmail"
          value={formData.usernameOrEmail}
          placeholder="johnsmith1717"
          validationError={validationErrors.usernameOrEmail}
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
        <button
          onClick={login}
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
            <span>Login</span>
          </div>{" "}
        </button>
        <p className={styles.forgotPasswordText}>Forgot Password?</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <p className={styles.signUpText}>Don&apos;t have an account?</p>
          <Link className={styles.signUpRedirect} href="/signUp">
            SignUp Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
