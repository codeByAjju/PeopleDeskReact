import PropTypes from "prop-types";
import { useState } from "react";
import { FormControl, Form } from "react-bootstrap";
// import { uploadImage } from "../../../../apiEndPoints/Media";
import { toast } from "react-toastify";

export function Input({
  type = "",
  extraClass = "",
  position = "",
  iconName = "",
  overlineLabel = "",
  size = "",
  name,
  setFieldValue = () => { },
  ...props
}) {
  const [isPassword, setPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  //   const [imageUrl, setImageUrl] = useState(null);

  const togglePassword = () => setPassword((prev) => !prev);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("Only JPG/PNG images are allowed.");
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      toast.error("Image must be smaller than 5MB.");
    }

    return isJpgOrPng && isLt5M;
  };
  //   const getBase64 = (img, callback) => {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => callback(reader.result));
  //     reader.readAsDataURL(img);
  //   };
  const handleFileChange = async (e) => {
    const { mediaType, mediaFor } = props;
    const file = e.target.files?.[0];
    if (!file) return;

    if (!beforeUpload(file)) return;
    setUploading(true);
    // try {
    //   const res = await uploadImage(file, mediaFor, mediaType);
    //   const imagePath = res?.data?.result?.basePath;
    //   setFieldValue(name, imagePath);
    //   //   getBase64(file, (url) => setImageUrl(url));
    //   toast.success("Image uploaded successfully");
    // } catch (error) {
    //   console.error("Upload error", error);
    //   toast.error("Image upload failed");
    // } finally {
    //   setUploading(false);
    // }
  };

  // Handle password type
  if (type === "password") {
    return (
      <>
        <div
          role="button"
          className={`form-icon ${position && `form-icon-${position}`
            } ${size} ${isPassword ? "is-shown" : "is-hidden"}`}
          onClick={togglePassword}
        >
          {isPassword ? (
            <em className="passcode-icon icon-hide icon ni ni-eye-off" />
          ) : (
            <em className="passcode-icon icon-show icon ni ni-eye" />
          )}
        </div>
        <FormControl
          type={isPassword ? "text" : "password"}
          className={`${size ? `form-control-${size}` : ""} ${extraClass}`}
          name={name}
          {...props}
        />
      </>
    );
  }

  // Handle file input type
  if (type === "file") {
    return (
      <>
        <Form.Control
          type="file"
          name={name}
          className={`${size ? `form-control-${size}` : ""} ${extraClass}`}
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          {...props}
        />
        {uploading && <div className="text-info mt-1">Uploading...</div>}
      </>
    );
  }

  // Default input
  return (
    <>
      {iconName && (
        <div className={`form-icon form-icon-${position} ${size}`}>
          <em className={`icon ni ni-${iconName}`} />
        </div>
      )}
      {overlineLabel && (
        <div className={`form-text-hint ${position} ${size}`}>
          <span className="overline-title">{overlineLabel}</span>
        </div>
      )}
      <FormControl
        type={type}
        name={name}
        className={`${size ? `form-control-${size}` : ""} ${extraClass}`}
        {...props}
      />
    </>
  );
}