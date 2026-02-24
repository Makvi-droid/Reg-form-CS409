import { useState, useRef } from "react";
import styles from "./css/Register.module.css";

// --- Modal Components ---
function TermsModal({ onClose }) {
  return (
    <div className={`${styles.modalBox} ${styles.active}`} id="modalTerms">
      <div className={styles.modalHeader}>
        <h3>Terms and Conditions</h3>
        <button className={styles.closeModal} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles.modalBody}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          1. User must provide accurate information.
          <br />
          2. We respect your privacy.
          <br />
          3. Registration is free.
        </p>
      </div>
      <div className={styles.modalFooter}>
        <button className={styles.btnSecondary} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function ConfirmModal({ formData, onClose, onConfirm }) {
  return (
    <div className={`${styles.modalBox} ${styles.active}`} id="modalConfirm">
      <div className={styles.modalHeader}>
        <h3>Confirm Registration</h3>
        <button className={styles.closeModal} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles.modalBody}>
        <p>Please review your details before submitting:</p>
        <ul className={styles.summaryList}>
          {Object.entries(formData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.modalFooter}>
        <button className={styles.btnSecondary} onClick={onClose}>
          Edit
        </button>
        <button className={styles.btnPrimary} onClick={onConfirm}>
          Yes, Register
        </button>
      </div>
    </div>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div className={`${styles.modalBox} ${styles.active}`} id="modalSuccess">
      <div className={`${styles.modalBody} ${styles.centerContent}`}>
        <div className={styles.successIconLarge}>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h3>Success!</h3>
        <p>Your account has been successfully created.</p>
      </div>
      <div className={`${styles.modalFooter} ${styles.centerContent}`}>
        <button className={styles.btnPrimary} onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

// --- Input Field Component ---
function InputField({
  id,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  error,
  success,
  extra,
}) {
  return (
    <div
      className={`${styles.inputContainer} ${error ? styles.error : ""} ${success ? styles.success : ""}`}
    >
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...extra}
      />
      <i className={`fa-solid ${icon} ${styles.inputIcon}`}></i>
      <span className={styles.errorMsg}>{error}</span>
      <span className={styles.successMsg}>{success}</span>
    </div>
  );
}

// --- Select Field Component ---
function SelectField({ id, value, onChange, error, success, icon, children }) {
  return (
    <div
      className={`${styles.inputContainer} ${error ? styles.error : ""} ${success ? styles.success : ""}`}
    >
      <select id={id} value={value} onChange={onChange}>
        {children}
      </select>
      <i className={`fa-solid ${icon} ${styles.inputIcon}`}></i>
      <span className={styles.errorMsg}>{error}</span>
      <span className={styles.successMsg}>{success}</span>
    </div>
  );
}

// --- Main Register Component ---
export default function Register() {
  const initialFields = {
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    gender: "",
    birthday: "",
    civilStatus: "",
    nationality: "",
    address: "",
    password: "",
    confirmPass: "",
  };

  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [successes, setSuccesses] = useState({});
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [termsSuccess, setTermsSuccess] = useState("");

  // "terms" | "confirm" | "success" | null
  const [activeModal, setActiveModal] = useState(null);
  const [confirmData, setConfirmData] = useState({});

  // Birthday date input trick
  const [birthdayType, setBirthdayType] = useState("text");

  const handleChange = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    const newSuccesses = {};
    let hasError = false;

    const set = (field, err, suc) => {
      if (err) {
        newErrors[field] = err;
        hasError = true;
      } else newSuccesses[field] = suc;
    };

    if (!fields.firstName.trim()) set("firstName", "Firstname is required");
    else set("firstName", null, "Firstname Approved");

    if (!fields.lastName.trim()) set("lastName", "Lastname is required");
    else set("lastName", null, "Lastname Approved");

    if (!fields.username.trim()) set("username", "Username is required");
    else set("username", null, "Username Approved");

    if (!fields.email.trim()) set("email", "Email is required");
    else if (!fields.email.includes("@"))
      set("email", "Email is invalid format");
    else set("email", null, "Email Approved");

    const phone = fields.phone.trim();
    if (!phone) set("phone", "Phone number is required");
    else if (!/^[0-9]+$/.test(phone))
      set("phone", "Phone number must contain numbers only");
    else if (phone.length < 10 || phone.length > 11)
      set("phone", "Phone number must be 10-11 digits");
    else set("phone", null, "Phone number Approved");

    if (!fields.gender) set("gender", "Gender is required");
    else set("gender", null, "Gender Approved");

    if (!fields.birthday) set("birthday", "Birthday is required");
    else set("birthday", null, "Birthday Approved");

    if (!fields.civilStatus) set("civilStatus", "Civil Status is required");
    else set("civilStatus", null, "Status Approved");

    if (!fields.nationality.trim())
      set("nationality", "Nationality is required");
    else set("nationality", null, "Nationality Approved");

    if (!fields.address.trim()) set("address", "Address is required");
    else set("address", null, "Address Approved");

    if (!fields.password) set("password", "Password is required");
    else set("password", null, "Password Approved");

    if (!fields.confirmPass) set("confirmPass", "Confirm Password is required");
    else if (fields.confirmPass !== fields.password)
      set("confirmPass", "Passwords do not match");
    else set("confirmPass", null, "Password Match");

    if (!termsChecked) {
      setTermsError("You must accept terms");
      setTermsSuccess("");
      hasError = true;
    } else {
      setTermsError("");
      setTermsSuccess("Terms Accepted");
    }

    setErrors(newErrors);
    setSuccesses(newSuccesses);
    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setConfirmData({
        Name: `${fields.firstName} ${fields.lastName}`,
        Username: fields.username,
        Email: fields.email,
        Phone: fields.phone,
        Gender: fields.gender,
        "Civil Status": fields.civilStatus,
        Nationality: fields.nationality,
      });
      setActiveModal("confirm");
    }
  };

  const closeModal = () => setActiveModal(null);

  const handleConfirm = () => setActiveModal("success");

  const handleDone = () => {
    setActiveModal(null);
    setFields(initialFields);
    setErrors({});
    setSuccesses({});
    setTermsChecked(false);
    setTermsError("");
    setTermsSuccess("");
    setBirthdayType("text");
  };

  return (
    <>
      {/* Font Awesome */}
      <script
        src="https://kit.fontawesome.com/77d4dcdf26.js"
        crossOrigin="anonymous"
        async
      ></script>

      <div className={styles.mainWrapper}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>Create Account</h1>
            <p>Join us today! fill in the details below.</p>
          </div>

          <form
            id="regform"
            className={styles.regform}
            onSubmit={handleSubmit}
            noValidate
          >
            <InputField
              id="first-name"
              placeholder="First Name"
              icon="fa-user"
              value={fields.firstName}
              onChange={handleChange("firstName")}
              error={errors.firstName}
              success={successes.firstName}
            />

            <InputField
              id="last-name"
              placeholder="Last Name"
              icon="fa-user"
              value={fields.lastName}
              onChange={handleChange("lastName")}
              error={errors.lastName}
              success={successes.lastName}
            />

            <InputField
              id="username"
              placeholder="Username"
              icon="fa-at"
              value={fields.username}
              onChange={handleChange("username")}
              error={errors.username}
              success={successes.username}
            />

            <InputField
              id="phone"
              placeholder="Phone Number"
              icon="fa-phone"
              value={fields.phone}
              onChange={handleChange("phone")}
              error={errors.phone}
              success={successes.phone}
            />

            {/* Email - span 2 */}
            <div
              className={`${styles.inputContainer} ${styles.span2} ${errors.email ? styles.error : ""} ${successes.email ? styles.success : ""}`}
            >
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={fields.email}
                onChange={handleChange("email")}
              />
              <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
              <span className={styles.errorMsg}>{errors.email}</span>
              <span className={styles.successMsg}>{successes.email}</span>
            </div>

            <SelectField
              id="gender"
              value={fields.gender}
              onChange={handleChange("gender")}
              error={errors.gender}
              success={successes.gender}
              icon="fa-venus-mars"
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="lgbtq+">LGBTQ+</option>
              <option value="pnts">Prefer not to say</option>
            </SelectField>

            {/* Birthday with focus/blur type trick */}
            <div
              className={`${styles.inputContainer} ${errors.birthday ? styles.error : ""} ${successes.birthday ? styles.success : ""}`}
            >
              <input
                type={birthdayType}
                id="birthday"
                placeholder="Birthday"
                value={fields.birthday}
                onChange={handleChange("birthday")}
                onFocus={() => setBirthdayType("date")}
                onBlur={() => {
                  if (!fields.birthday) setBirthdayType("text");
                }}
              />
              <i className={`fa-solid fa-cake-candles ${styles.inputIcon}`}></i>
              <span className={styles.errorMsg}>{errors.birthday}</span>
              <span className={styles.successMsg}>{successes.birthday}</span>
            </div>

            <SelectField
              id="civil-status"
              value={fields.civilStatus}
              onChange={handleChange("civilStatus")}
              error={errors.civilStatus}
              success={successes.civilStatus}
              icon="fa-ring"
            >
              <option value="" disabled hidden>
                Civil Status
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
            </SelectField>

            <InputField
              id="nationality"
              placeholder="Nationality"
              icon="fa-flag"
              value={fields.nationality}
              onChange={handleChange("nationality")}
              error={errors.nationality}
              success={successes.nationality}
            />

            {/* Address - span 2 */}
            <div
              className={`${styles.inputContainer} ${styles.span2} ${errors.address ? styles.error : ""} ${successes.address ? styles.success : ""}`}
            >
              <input
                type="text"
                id="address"
                placeholder="Address"
                value={fields.address}
                onChange={handleChange("address")}
              />
              <i className={`fa-solid fa-location-dot ${styles.inputIcon}`}></i>
              <span className={styles.errorMsg}>{errors.address}</span>
              <span className={styles.successMsg}>{successes.address}</span>
            </div>

            <InputField
              id="password"
              type="password"
              placeholder="Password"
              icon="fa-lock"
              value={fields.password}
              onChange={handleChange("password")}
              error={errors.password}
              success={successes.password}
            />

            <InputField
              id="confirm-pass"
              type="password"
              placeholder="Confirm Password"
              icon="fa-lock"
              value={fields.confirmPass}
              onChange={handleChange("confirmPass")}
              error={errors.confirmPass}
              success={successes.confirmPass}
            />

            {/* Terms - span 2 */}
            <div
              className={`${styles.inputContainer} ${styles.span2} ${styles.termsContainer} ${termsError ? styles.error : ""} ${termsSuccess ? styles.success : ""}`}
            >
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              <label htmlFor="terms">
                I accept the{" "}
                <a
                  href="#"
                  id="terms-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveModal("terms");
                  }}
                >
                  Terms and Conditions
                </a>
              </label>
              <span className={styles.errorMsg}>{termsError}</span>
              <span className={styles.successMsg}>{termsSuccess}</span>
            </div>

            <button type="submit" id="submitBtn" className={styles.submitBtn}>
              Register Now
            </button>
          </form>
        </div>
      </div>

      {/* Modal Overlay */}
      <div
        className={`${styles.modalOverlay} ${activeModal ? styles.active : ""}`}
        id="modalOverlay"
        onClick={(e) => {
          if (e.target.id === "modalOverlay") closeModal();
        }}
      >
        {activeModal === "terms" && <TermsModal onClose={closeModal} />}
        {activeModal === "confirm" && (
          <ConfirmModal
            formData={confirmData}
            onClose={closeModal}
            onConfirm={handleConfirm}
          />
        )}
        {activeModal === "success" && <SuccessModal onClose={handleDone} />}
      </div>
    </>
  );
}
