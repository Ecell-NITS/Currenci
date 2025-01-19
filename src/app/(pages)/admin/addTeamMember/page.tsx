"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import ErrorText from "../../../components/errorText";
import SuccessText from "../../../components/successText";
import ErrorFormFieldText from "../../../components/errorFormFieldText";
import { teamMemberSchema } from "../../../../schemas/teamMember";
import LoadingSpinner from "../../../components/loadingSpinner";

const AddTeamMember = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({}); // State to manage validation errors for form fields
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    linkedin: "",
  });

  const handleImageUpload = async (event) => {
    setError("");
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      ); // Replace with your preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          },
        );
        const data = await response.json();
        setUploadedImageUrl(data.secure_url);
      } catch (err) {
        console.error("Upload failed:", err);
        setError("Failed to upload image. Please try again.");
      }
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const addMember = async (e) => {
    e.preventDefault();
    try {
      teamMemberSchema.parse(formData);
      try {
        const response = await fetch("/api/v1/addTeamMember", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            designation: formData.designation,
            email: formData.email,
            ...(formData.linkedin && { linkedin: formData.linkedin }),
            ...(uploadedImageUrl && { image: uploadedImageUrl }),
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message || "Something went wrong.");
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess("Team member added successfully. You can add more members.");
        setError("");
        setTimeout(() => {
          setLoading(false);
          router.push("/admin");
        }, 3000);
      } catch (err) {
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
    <div className="flex flex-col mb-10">
      <div className="flex items-center px-[10vw] py-[10vh]">
        <svg
          className="md:w-7 w-5"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="15.5" fill="white" stroke="#A48111" />
          <path
            d="M14.3989 15.9937L14.0846 16.3333L14.3989 16.6729L18.1379 20.7131L17.9367 20.9305L13.6821 16.3332L17.9329 11.7352L18.137 11.9545L14.3989 15.9937Z"
            fill="#A48111"
            stroke="#A48111"
          />
        </svg>

        <h1
          className="md:text-3xl text-2xl font-semibold ms-2"
          style={{ fontFamily: "Sofia Pro Light" }}
        >
          Add Member
        </h1>
        <X
          onClick={() => router.push("/admin")}
          className="absolute right-[10vw] md:w-11 md:h-9 w-10 h-9 hover:scale-[1.1] cursor-pointer"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-20 gap-2 md:px-[10vw]">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="relative md:w-60 md:h-60 w-40 h-40 bg-white rounded-lg shadow-lg"
          >
            <Image
              className="object-cover rounded-lg"
              src={uploadedImageUrl || "/images/addTeamMemberPlaceholder.png"}
              alt="addMember"
              fill
            />
          </button>
          {uploadedImageUrl && (
            <button
              className="text-md text-red-500 cursor-pointer underline"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Change Image
            </button>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <form className="flex flex-col gap-4 mt-4 md:mb-0 mb-20 md:w-fit w-full md:px-0 px-[10vw]">
          {error && <ErrorText error={error} setError={setError} />}
          {success && <SuccessText message={success} />}
          <div className="flex flex-col">
            <label
              htmlFor="nameInput"
              className="text-md font-medium mb-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Name
            </label>
            <input
              id="nameInput"
              onChange={handleChange}
              value={formData.name}
              name="name"
              type="text"
              placeholder="John Smith"
              className="lg:w-[25vw] w-full  border border-gray-300 rounded-md p-2 focus:border-[#1e3432]"
            />
            {validationErrors.name && (
              <ErrorFormFieldText error={validationErrors.name} />
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="designationInput"
              className="text-md font-medium mb-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Designation
            </label>
            <input
              id="designationInput"
              onChange={handleChange}
              value={formData.designation}
              name="designation"
              type="text"
              placeholder="Manager"
              className="lg:w-[25vw] w-full border border-gray-300 rounded-md p-2 focus:border-[#1e3432]"
            />
            {validationErrors.designation && (
              <ErrorFormFieldText error={validationErrors.designation} />
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="emailInput"
              className="text-md font-medium mb-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Email
            </label>
            <input
              id="emailInput"
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="text"
              placeholder="john@gmail.com"
              className="lg:w-[25vw] w-full border border-gray-300 rounded-md p-2 focus:border-[#1e3432]"
            />
            {validationErrors.email && (
              <ErrorFormFieldText error={validationErrors.email} />
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="linkedinInput"
              className="text-md font-medium mb-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Linkdin (Optional)
            </label>
            <input
              id="linkedinInput"
              onChange={handleChange}
              value={formData.linkedin}
              name="linkedin"
              type="text"
              placeholder="Linkdin url"
              className="lg:w-[25vw] w-full border border-gray-300 rounded-md p-2 focus:border-[#1e3432]"
            />
            {validationErrors.linkedin && (
              <ErrorFormFieldText error={validationErrors.linkedin} />
            )}
          </div>
        </form>
        <div></div>
      </div>
      <button
        onClick={addMember}
        disabled={!formData.name || !formData.designation || !formData.email} // Disable the button if any required field is empty
        className={`md:relative fixed bottom-0 mt-10 md:rounded-3xl rounded-none px-5 py-1 text-2xl md:w-fit w-full font-medium text-center self-center ${
          !formData.name || !formData.designation || !formData.email
            ? "bg-gray-400 text-white cursor-not-allowed" // Disabled styles
            : "text-white bg-[#1e3432] hover:bg-[#172625] cursor-pointer" // Active styles
        } md:border-2 border-none border-[#fac16a] transition-all ease-in-out duration-200`}
        style={{ fontFamily: "Sofia Pro Light" }}
      >
        <div className="flex flex-row items-center justify-center gap-3">
          {loading && <LoadingSpinner />}
          <span>Save</span>
        </div>
      </button>
    </div>
  );
};

export default AddTeamMember;
