import { useState } from "react";

// Inline styles to avoid CSS module issues
const S = {
  // Global
  "@import":
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",

  mainWrapper: {
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  formContainer: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "560px",
    boxSizing: "border-box",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  formHeaderH1: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "5px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
  },
  formHeaderP: {
    color: "#777",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
  },
  regform: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px 15px",
  },
  span2: {
    gridColumn: "span 2",
  },
  // Input container
  inputContainer: (state) => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
  }),
  input: (state) => ({
    width: "100%",
    padding: "12px 40px 12px 15px",
    border: `1.5px solid ${state === "error" ? "#ff4757" : state === "success" ? "#2ed573" : "#ddd"}`,
    borderRadius: "8px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    backgroundColor: state === "error" ? "#fff0f0" : "#f8f9fa",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  }),
  icon: (state) => ({
    position: "absolute",
    top: "14px",
    right: "14px",
    color:
      state === "error" ? "#ff4757" : state === "success" ? "#2ed573" : "#aaa",
    pointerEvents: "none",
    fontSize: "14px",
  }),
  errorMsg: {
    fontSize: "11px",
    marginTop: "4px",
    fontWeight: 500,
    color: "#ff4757",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "16px",
  },
  successMsg: {
    fontSize: "11px",
    marginTop: "4px",
    fontWeight: 500,
    color: "#2ed573",
    fontFamily: "'Poppins', sans-serif",
    minHeight: "16px",
  },
  submitBtn: {
    gridColumn: "span 2",
    padding: "14px",
    backgroundColor: "#6c5ce7",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "10px",
    fontFamily: "'Poppins', sans-serif",
    transition: "background 0.3s ease, transform 0.2s",
  },
  termsContainer: {
    gridColumn: "span 2",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0 8px",
  },
  termsLabel: (hasError) => ({
    fontSize: "13px",
    color: hasError ? "#ff4757" : "#555",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  }),
  termsLink: {
    color: "#6c5ce7",
    textDecoration: "none",
  },
  // Modal
  overlay: (active) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(3px)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: active ? 1 : 0,
    visibility: active ? "visible" : "hidden",
    transition: "all 0.3s ease",
  }),
  modalBox: {
    background: "white",
    width: "90%",
    maxWidth: "450px",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    fontFamily: "'Poppins', sans-serif",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  modalHeaderH3: {
    color: "#333",
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#999",
    lineHeight: 1,
  },
  modalBody: {
    marginBottom: "20px",
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.6",
    fontFamily: "'Poppins', sans-serif",
  },
  modalBodyCenter: {
    marginBottom: "20px",
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.6",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  summaryList: {
    listStyle: "none",
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "10px",
    paddingLeft: "15px",
  },
  summaryLi: {
    marginBottom: "8px",
    fontSize: "13px",
    borderBottom: "1px solid #eef",
    paddingBottom: "5px",
    fontFamily: "'Poppins', sans-serif",
  },
  summaryKey: {
    color: "#6c5ce7",
    width: "100px",
    display: "inline-block",
    fontWeight: 600,
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  modalFooterCenter: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  btnPrimary: {
    background: "#6c5ce7",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  },
  btnSecondary: {
    background: "#eee",
    color: "#555",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  },
  successIcon: {
    fontSize: "50px",
    color: "#2ed573",
    marginBottom: "10px",
  },
};

// --- Field wrapper ---
function Field({ state, style, children }) {
  return (
    <div style={{ ...S.inputContainer(), ...style, position: "relative" }}>
      {children}
    </div>
  );
}

function InputField({
  id,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  error,
  success,
  extraStyle,
  extraProps,
}) {
  const state = error ? "error" : success ? "success" : "neutral";
  return (
    <div style={{ position: "relative", ...extraStyle }}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={S.input(state)}
        {...extraProps}
      />
      <i className={`fa-solid ${icon}`} style={S.icon(state)} />
      {error && <span style={S.errorMsg}>{error}</span>}
      {!error && success && <span style={S.successMsg}>{success}</span>}
    </div>
  );
}

function SelectField({
  id,
  value,
  onChange,
  error,
  success,
  icon,
  children,
  extraStyle,
}) {
  const state = error ? "error" : success ? "success" : "neutral";
  return (
    <div style={{ position: "relative", ...extraStyle }}>
      <select id={id} value={value} onChange={onChange} style={S.input(state)}>
        {children}
      </select>
      <i className={`fa-solid ${icon}`} style={S.icon(state)} />
      {error && <span style={S.errorMsg}>{error}</span>}
      {!error && success && <span style={S.successMsg}>{success}</span>}
    </div>
  );
}

// --- Modals ---
function TermsModal({ onClose }) {
  return (
    <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>
      <div style={S.modalHeader}>
        <h3 style={S.modalHeaderH3}>Terms and Conditions</h3>
        <button style={S.closeBtn} onClick={onClose}>
          &times;
        </button>
      </div>
      <div style={S.modalBody}>
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
      <div style={S.modalFooter}>
        <button style={S.btnSecondary} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function ConfirmModal({ formData, onClose, onConfirm }) {
  return (
    <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>
      <div style={S.modalHeader}>
        <h3 style={S.modalHeaderH3}>Confirm Registration</h3>
        <button style={S.closeBtn} onClick={onClose}>
          &times;
        </button>
      </div>
      <div style={S.modalBody}>
        <p>Please review your details before submitting:</p>
        <ul style={S.summaryList}>
          {Object.entries(formData).map(([key, val]) => (
            <li key={key} style={S.summaryLi}>
              <strong style={S.summaryKey}>{key}:</strong> {val}
            </li>
          ))}
        </ul>
      </div>
      <div style={S.modalFooter}>
        <button style={S.btnSecondary} onClick={onClose}>
          Edit
        </button>
        <button style={S.btnPrimary} onClick={onConfirm}>
          Yes, Register
        </button>
      </div>
    </div>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>
      <div style={{ ...S.modalBodyCenter }}>
        <div style={S.successIcon}>
          <i className="fa-solid fa-circle-check" />
        </div>
        <h3
          style={{
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "8px",
          }}
        >
          Success!
        </h3>
        <p>Your account has been successfully created.</p>
      </div>
      <div style={S.modalFooterCenter}>
        <button style={S.btnPrimary} onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

// --- Main ---
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

export default function Register() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [successes, setSuccesses] = useState({});
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [termsSuccess, setTermsSuccess] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [confirmData, setConfirmData] = useState({});
  const [birthdayType, setBirthdayType] = useState("text");

  const handleChange = (field) => (e) =>
    setFields((prev) => ({ ...prev, [field]: e.target.value }));

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
    else set("firstName", null, "✓ Firstname Approved");

    if (!fields.lastName.trim()) set("lastName", "Lastname is required");
    else set("lastName", null, "✓ Lastname Approved");

    if (!fields.username.trim()) set("username", "Username is required");
    else set("username", null, "✓ Username Approved");

    if (!fields.email.trim()) set("email", "Email is required");
    else if (!fields.email.includes("@"))
      set("email", "Email is invalid format");
    else set("email", null, "✓ Email Approved");

    const phone = fields.phone.trim();
    if (!phone) set("phone", "Phone number is required");
    else if (!/^[0-9]+$/.test(phone)) set("phone", "Numbers only");
    else if (phone.length < 10 || phone.length > 11)
      set("phone", "Must be 10-11 digits");
    else set("phone", null, "✓ Phone Approved");

    if (!fields.gender) set("gender", "Gender is required");
    else set("gender", null, "✓ Gender Approved");

    if (!fields.birthday) set("birthday", "Birthday is required");
    else set("birthday", null, "✓ Birthday Approved");

    if (!fields.civilStatus) set("civilStatus", "Civil Status is required");
    else set("civilStatus", null, "✓ Status Approved");

    if (!fields.nationality.trim())
      set("nationality", "Nationality is required");
    else set("nationality", null, "✓ Nationality Approved");

    if (!fields.address.trim()) set("address", "Address is required");
    else set("address", null, "✓ Address Approved");

    if (!fields.password) set("password", "Password is required");
    else set("password", null, "✓ Password Approved");

    if (!fields.confirmPass) set("confirmPass", "Confirm Password is required");
    else if (fields.confirmPass !== fields.password)
      set("confirmPass", "Passwords do not match");
    else set("confirmPass", null, "✓ Passwords Match");

    if (!termsChecked) {
      setTermsError("You must accept the terms");
      setTermsSuccess("");
      hasError = true;
    } else {
      setTermsError("");
      setTermsSuccess("✓ Terms Accepted");
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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div style={S.mainWrapper}>
        <div style={S.formContainer}>
          <div style={S.formHeader}>
            <h1 style={S.formHeaderH1}>Create Account</h1>
            <p style={S.formHeaderP}>
              Join us today! Fill in the details below.
            </p>
          </div>

          <form style={S.regform} onSubmit={handleSubmit} noValidate>
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
            <InputField
              id="email"
              type="email"
              placeholder="Email Address"
              icon="fa-envelope"
              value={fields.email}
              onChange={handleChange("email")}
              error={errors.email}
              success={successes.email}
              extraStyle={{ gridColumn: "span 2" }}
            />

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

            {/* Birthday */}
            <InputField
              id="birthday"
              type={birthdayType}
              placeholder="Birthday"
              icon="fa-cake-candles"
              value={fields.birthday}
              onChange={handleChange("birthday")}
              error={errors.birthday}
              success={successes.birthday}
              extraProps={{
                onFocus: () => setBirthdayType("date"),
                onBlur: () => {
                  if (!fields.birthday) setBirthdayType("text");
                },
              }}
            />

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
            <InputField
              id="address"
              placeholder="Address"
              icon="fa-location-dot"
              value={fields.address}
              onChange={handleChange("address")}
              error={errors.address}
              success={successes.address}
              extraStyle={{ gridColumn: "span 2" }}
            />

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

            {/* Terms */}
            <div style={S.termsContainer}>
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                style={{ width: "auto", margin: 0 }}
              />
              <label htmlFor="terms" style={S.termsLabel(!!termsError)}>
                I accept the{" "}
                <a
                  href="#"
                  style={S.termsLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveModal("terms");
                  }}
                >
                  Terms and Conditions
                </a>
              </label>
              {termsError && (
                <span style={{ ...S.errorMsg, width: "100%" }}>
                  {termsError}
                </span>
              )}
              {!termsError && termsSuccess && (
                <span style={{ ...S.successMsg, width: "100%" }}>
                  {termsSuccess}
                </span>
              )}
            </div>

            <button
              type="submit"
              style={S.submitBtn}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#5649c0";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#6c5ce7";
                e.currentTarget.style.transform = "none";
              }}
            >
              Register Now
            </button>
          </form>
        </div>
      </div>

      {/* Modal Overlay */}
      <div style={S.overlay(!!activeModal)} onClick={closeModal}>
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
