"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorText from "../../../../components/errorText";
import SuccessText from "../../../../components/successText";
import ErrorFormFieldText from "../../../../components/errorFormFieldText";
import { teamMemberSchema } from "../../../../../schemas/teamMember";
import LoadingSpinner from "../../../../components/loadingSpinner";

const EditTeam = () => {
  const params = useParams();
  const router = useRouter();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [deleteLoading, setDeleteLoading] = useState(false); // State to manage loading state of API Call
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [newUploadedImageUrl, setNewUploadedImageUrl] = useState(null);
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
  const [newFormData, setNewFormData] = useState({
    name: "",
    designation: "",
    email: "",
    linkedin: "",
  });

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const res = await fetch(`/api/v1/getTeamMember/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch team member");
        }
        setFormData({
          name: data.teamMember.name,
          designation: data.teamMember.designation,
          email: data.teamMember.email,
          linkedin: data.teamMember.linkedin || "",
        });
        setNewFormData({
          name: data.teamMember.name,
          designation: data.teamMember.designation,
          email: data.teamMember.email,
          linkedin: data.teamMember.linkedin || "",
        });
        setUploadedImageUrl(data.teamMember.image || null);
        setNewUploadedImageUrl(data.teamMember.image || null);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load team member.");
      }
    };
    fetchTeamMember();
  }, [params.id]);

  const handleImageUpload = async (event) => {
    setError("");
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          },
        );
        const data = await response.json();
        setNewUploadedImageUrl(data.secure_url);
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
    setNewFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const saveTeamMember = async (e) => {
    e.preventDefault();
    try {
      teamMemberSchema.parse(formData);
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/editTeamMember/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newFormData.name === formData.name ? null : newFormData.name,
            designation:
              newFormData.designation === formData.designation
                ? null
                : newFormData.designation,
            email:
              newFormData.email === formData.email ? null : newFormData.email,
            ...(newFormData.linkedin !== formData.linkedin && {
              linkedin: newFormData.linkedin,
            }),
            ...(newUploadedImageUrl !== uploadedImageUrl && {
              image: newUploadedImageUrl,
            }),
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message || "Something went wrong.");
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess("Team member updated successfully");
        setError("");
        setTimeout(() => {
          setLoading(false);
          router.push("/admin/team");
        }, 3000);
      } catch (err) {
        setLoading(false);
        setError(`${err}`);
      }
    } catch (err) {
      if (err.errors) {
        const newValidationErrors = {};
        err.errors.forEach((errr) => {
          newValidationErrors[errr.path[0]] = errr.message;
        });
        setValidationErrors(newValidationErrors);
      }
    }
  };

  const DeleteMember = async (e) => {
    setDeleteLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/removeTeamMember/${params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setDeleteLoading(false);
        setShowDeletePopup(false);
        setError(data.message || "Something went wrong.");
        throw new Error(data.message || "Something went wrong.");
      }
      setTimeout(() => {
        setDeleteLoading(false);
        setShowDeletePopup(false);
        router.push("/admin/team");
      }, 3000);
    } catch (err) {
      setDeleteLoading(false);
      setShowDeletePopup(false);
      setError(`${err}`);
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
          Team Member Details
        </h1>
        <X
          onClick={() => router.push("/admin/team")}
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
              src={
                newUploadedImageUrl || "/images/addTeamMemberPlaceholder.png"
              }
              alt="addMember"
              fill
            />
          </button>
          {newUploadedImageUrl && (
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
              value={newFormData.name}
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
              value={newFormData.designation}
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
              value={newFormData.email}
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
              value={newFormData.linkedin}
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
      <div className="md:relative w-full fixed bottom-0 flex flex-col md:flex-row items-center justify-center md:gap-2">
        <button
          onClick={saveTeamMember}
          disabled={
            formData.name === newFormData.name &&
            formData.designation === newFormData.designation &&
            formData.email === newFormData.email &&
            formData.linkedin === newFormData.linkedin &&
            uploadedImageUrl === newUploadedImageUrl
          } // Disable the button if all fields are the same
          className={`mt-10 md:rounded-3xl rounded-none px-5 py-1 text-2xl md:w-fit w-full font-medium text-center self-center ${
            formData.name === newFormData.name &&
            formData.designation === newFormData.designation &&
            formData.email === newFormData.email &&
            formData.linkedin === newFormData.linkedin &&
            uploadedImageUrl === newUploadedImageUrl
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
        <button
          onClick={() => setShowDeletePopup(true)}
          className="mt-0 md:mt-10 md:rounded-3xl rounded-none px-8 py-2 text-2xl md:w-fit w-full font-medium text-center self-center text-white bg-red-500 hover:bg-red-900 cursor-pointer "
          style={{ fontFamily: "Sofia Pro Light" }}
        >
          <div className="w-full flex items-center justify-center">
            <Trash2 />
          </div>
        </button>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this team member?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={DeleteMember}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <div className="flex items-center justify-center gap-2">
                  {deleteLoading && <LoadingSpinner />}
                  <span>Delete</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTeam;
