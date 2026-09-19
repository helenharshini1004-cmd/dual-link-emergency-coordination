import { useEffect, useRef, useState } from "react";
import "./App.css";

/* =========================================================
   HOSPITAL DATA
   ========================================================= */

const hospitals = [
  {
    name: "Apollo Emergency Centre",
    code: "HOSP-01",
    beds: 8,
    icu: 2,
    doctor: "Available",
    blood: "O+ Available",
    ot: "Ready",
    trauma: "Ready",
    eta: 9,
    status: "READY",
    score: 94,
    specialties: [
      "Trauma Care",
      "Emergency Medicine",
      "Critical Care",
      "Emergency Surgery",
    ],
  },
  {
    name: "CityCare Multispeciality",
    code: "HOSP-02",
    beds: 4,
    icu: 1,
    doctor: "Available",
    blood: "O+ Available",
    ot: "Ready",
    trauma: "Ready",
    eta: 10,
    status: "LIMITED",
    score: 78,
    specialties: [
      "Emergency Medicine",
      "General Surgery",
      "Critical Care",
      "Orthopaedics",
    ],
  },
  {
    name: "Metro General Hospital",
    code: "HOSP-03",
    beds: 0,
    icu: 0,
    doctor: "Busy",
    blood: "O+ Low",
    ot: "Occupied",
    trauma: "Limited",
    eta: 7,
    status: "OVERLOADED",
    score: 42,
    specialties: [
      "General Emergency",
      "Basic Trauma Care",
      "General Medicine",
    ],
  },
];

/* =========================================================
   LOGIN CREDENTIALS
   ========================================================= */

const credentials = {
  ambulance: {
    id: "AMB-042",
    password: "ambulance123",
  },
  hospital: {
    id: "HOSP-01",
    password: "hospital123",
  },
};

/* =========================================================
   LOGIN SCREEN
   ========================================================= */

function LoginScreen({ onLogin }) {
  const [role, setRole] = useState("ambulance");

  const [userId, setUserId] = useState(
    credentials.ambulance.id
  );

  const [password, setPassword] = useState(
    credentials.ambulance.password
  );

  const [error, setError] = useState("");

  const changeRole = (newRole) => {
    setRole(newRole);
    setUserId(credentials[newRole].id);
    setPassword(credentials[newRole].password);
    setError("");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (
      userId === credentials[role].id &&
      password === credentials[role].password
    ) {
      onLogin(role, userId);
    } else {
      setError("Invalid demo credentials.");
    }
  };

  return (
    <div className="login-screen">
      <div className="login-background"></div>

      <div className="login-container">
        <div className="login-brand">
          <div className="login-logo">+</div>

          <div>
            <h1>Dual Link</h1>
            <p>Emergency Healthcare Coordination Platform</p>
          </div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <span>SECURE ACCESS</span>

            <h2>Emergency Command Portal</h2>

            <p>
              Select your operational workspace to continue.
            </p>
          </div>

          <div className="role-selector">
            <button
              className={role === "ambulance" ? "active" : ""}
              onClick={() => changeRole("ambulance")}
              type="button"
            >
              <span className="role-icon">🚑</span>

              <span>
                <strong>Ambulance</strong>
                <small>Field Medical Team</small>
              </span>
            </button>

            <button
              className={role === "hospital" ? "active" : ""}
              onClick={() => changeRole("hospital")}
              type="button"
            >
              <span className="role-icon">🏥</span>

              <span>
                <strong>Hospital</strong>
                <small>Receiving Hospital</small>
              </span>
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <label>
              {role === "ambulance"
                ? "AMBULANCE ID"
                : "HOSPITAL ID"}
            </label>

            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={
                role === "ambulance"
                  ? "Enter ambulance ID"
                  : "Enter hospital ID"
              }
            />

            <label>PASSWORD</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button className="login-button" type="submit">
              Enter{" "}
              {role === "ambulance"
                ? "Ambulance Workspace"
                : "Hospital Workspace"}
              <span>→</span>
            </button>
          </form>

          <div className="demo-credentials">
            <strong>Hackathon Demo Credentials</strong>

            <span>
              {role === "ambulance"
                ? "AMB-042 / ambulance123"
                : "HOSP-01 / hospital123"}
            </span>
          </div>
        </div>

        <div className="login-footer">
          <span>● System Online</span>
          <span>Dual Link Prototype</span>
          <span>Synthetic Demonstration Data</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceError, setVoiceError] = useState("");

  const [selectedHospitalCode, setSelectedHospitalCode] =
    useState("HOSP-01");

  const [simulation, setSimulation] = useState(false);
  const [notification, setNotification] = useState("");

  const recognitionRef = useRef(null);

  const selectedHospital =
    hospitals.find(
      (hospital) =>
        hospital.code === selectedHospitalCode
    ) || hospitals[0];

  const ambulanceEta = simulation
    ? Math.max(selectedHospital.eta - 2, 5)
    : selectedHospital.eta;

  const distance = simulation
    ? "3.9 km"
    : "5.8 km";

  /* =======================================================
     LOGIN
     ======================================================= */

  const handleLogin = (selectedRole, id) => {
    setRole(selectedRole);
    setUserId(id);
    setLoggedIn(true);
  };

  const logout = () => {
    stopVoiceRecognition();

    setLoggedIn(false);
    setRole(null);
    setUserId("");
    setConfirmed(false);
    setTranscript("");
    setVoiceError("");
  };

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const scrollToSection = (className) => {
    document
      .querySelector(`.${className}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const reviewHospitals = () => {
    scrollToSection("hospital-panel");
  };

  /* =======================================================
     HOSPITAL SELECTION
     ======================================================= */

  const selectHospital = (code) => {
    setSelectedHospitalCode(code);
    setConfirmed(false);
  };

  /* =======================================================
     DESTINATION CONFIRMATION
     ======================================================= */

  const confirmDestination = () => {
    setConfirmed(true);

    setNotification(
      `${selectedHospital.name} confirmed as receiving hospital.`
    );

    setTimeout(() => {
      scrollToSection("preparation-panel");
    }, 300);

    setTimeout(() => {
      setNotification("");
    }, 4000);
  };

  /* =======================================================
     SIMULATION
     ======================================================= */

  const toggleSimulation = () => {
    setSimulation((current) => !current);
  };

  /* =======================================================
     VOICE-TO-TEXT
     ======================================================= */

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Recognition already stopped.");
      }

      recognitionRef.current = null;
    }

    setRecording(false);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        "Voice-to-text is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );

      return;
    }

    if (recording) {
      stopVoiceRecognition();
      return;
    }

    try {
      const recognition = new SpeechRecognition();

      recognition.lang = "en-IN";

      /*
       * One complete sentence at a time is more reliable
       * for the hackathon demo than continuous recognition.
       */
      recognition.continuous = false;

      recognition.interimResults = true;

      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setRecording(true);

        setVoiceError(
          "🎙 Microphone active. Speak now..."
        );
      };

      recognition.onaudiostart = () => {
        setVoiceError(
          "🎙 Microphone connected. Listening..."
        );
      };

      recognition.onspeechstart = () => {
        setVoiceError(
          "Listening to your voice..."
        );
      };

      recognition.onresult = (event) => {
        let finalText = "";
        let interimText = "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result = event.results[i];

          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        /* Final converted speech */
        if (finalText.trim()) {
          setTranscript((previous) => {
            const newText = finalText.trim();

            if (!previous.trim()) {
              return newText;
            }

            return `${previous.trim()} ${newText}`;
          });

          setVoiceError(
            "✓ Voice converted to text successfully."
          );
        }

        /* Live speech feedback */
        if (interimText.trim()) {
          setVoiceError(
            `Listening: ${interimText.trim()}`
          );
        }
      };

      recognition.onerror = (event) => {
        console.error(
          "Speech recognition error:",
          event.error
        );

        if (event.error === "not-allowed") {
          setVoiceError(
            "Microphone permission denied. Please allow microphone access in Chrome."
          );
        } else if (event.error === "no-speech") {
          setVoiceError(
            "No speech detected. Please speak clearly and try again."
          );
        } else if (event.error === "audio-capture") {
          setVoiceError(
            "Microphone not detected. Please check your microphone."
          );
        } else if (event.error === "network") {
          setVoiceError(
            "Speech recognition network error. Check your internet connection."
          );
        } else {
          setVoiceError(
            `Voice recognition error: ${event.error}`
          );
        }

        setRecording(false);
      };

      recognition.onspeechend = () => {
        setVoiceError(
          "Processing voice..."
        );
      };

      recognition.onend = () => {
        setRecording(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;

      recognition.start();
    } catch (error) {
      console.error(
        "Unable to start speech recognition:",
        error
      );

      setRecording(false);

      setVoiceError(
        "Unable to start microphone. Please check browser permissions."
      );
    }
  };

  /* =======================================================
     CLEANUP
     ======================================================= */

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log("Voice recognition cleanup.");
        }
      }
    };
  }, []);

  /* =======================================================
     LOGIN GATE
     ======================================================= */

  if (!loggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  /* =======================================================
     MAIN DASHBOARD
     ======================================================= */

  return (
    <div className="app">

      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="header">

        <div className="brand">

          <div className="brand-logo">
            <span>+</span>
          </div>

          <div>
            <h1>Dual Link</h1>

            <p>
              Emergency Healthcare Coordination Platform
            </p>
          </div>

        </div>

        <div className="header-actions">

          <div className="workspace-badge">
            {role === "ambulance"
              ? "🚑"
              : "🏥"}

            <span>
              {role === "ambulance"
                ? "Ambulance Workspace"
                : "Hospital Workspace"}
            </span>

            <small>{userId}</small>
          </div>

          <div className="system-status">
            <span className="online-dot"></span>
            System Online
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </header>

      <main className="dashboard">

        {/* =================================================
            HERO
            ================================================= */}

        <section className="hero-section">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <span className="hero-label">
              {role === "ambulance"
                ? "AMBULANCE EMERGENCY WORKSPACE"
                : "HOSPITAL RECEIVING WORKSPACE"}
            </span>

            <h2>
              See the emergency.
              <br />
              <strong>
                Prepare before it arrives.
              </strong>
            </h2>

            <p>
              Dual Link connects ambulances, patients
              and hospital readiness in real time to
              coordinate emergency care.
            </p>

            <div className="hero-buttons">

              <button
                className="hero-primary"
                onClick={reviewHospitals}
              >
                View Hospital Readiness
              </button>

              <span className="hero-live">
                <span className="online-dot"></span>
                Live emergency monitoring
              </span>

            </div>

          </div>

          <div className="hero-case">

            <span>ACTIVE EMERGENCY</span>

            <strong>
              DL-2026-0842
            </strong>

            <small>
              Trauma Response
            </small>

          </div>

        </section>

        {/* =================================================
            ROLE INFORMATION
            ================================================= */}

        <section className="role-banner">

          <div>

            <span>
              CURRENT WORKSPACE
            </span>

            <strong>
              {role === "ambulance"
                ? "🚑 Ambulance Medical Team"
                : "🏥 Receiving Hospital Team"}
            </strong>

            <small>
              {role === "ambulance"
                ? "Collect patient information, communicate observations and track destination readiness."
                : "Monitor incoming emergency cases, review patient information and prepare hospital resources."}
            </small>

          </div>

          <div className="role-status">

            <span>
              SESSION ACTIVE
            </span>

            <strong>
              {userId}
            </strong>

          </div>

        </section>

        {/* =================================================
            KPI CARDS
            ================================================= */}

        <section className="cards">

          <div className="card">

            <div className="card-icon ambulance-bg">
              🚑
            </div>

            <div>
              <span>AMBULANCE</span>
              <strong>AMB-042</strong>
              <small>GPS tracking active</small>
            </div>

          </div>

          <div className="card">

            <div className="card-icon patient-bg">
              ♥
            </div>

            <div>
              <span>PATIENT</span>
              <strong>Trauma — Urgent</strong>
              <small>Continuous monitoring</small>
            </div>

          </div>

          <div className="card">

            <div className="card-icon eta-bg">
              ⌖
            </div>

            <div>
              <span>LIVE ETA</span>

              <strong>
                {ambulanceEta} minutes
              </strong>

              <small>
                {distance} remaining
              </small>
            </div>

          </div>

          <div className="card">

            <div className="card-icon hospital-bg">
              ✚
            </div>

            <div>
              <span>HOSPITALS</span>
              <strong>3 Analysed</strong>
              <small>Readiness comparison</small>
            </div>

          </div>

        </section>

        {/* =================================================
            EMERGENCY ALERT
            ================================================= */}

        <section className="emergency-alert">

          <div className="alert-icon">
            !
          </div>

          <div className="alert-content">

            <span>
              EMERGENCY CASE DETECTED
            </span>

            <h3>
              Trauma patient requires immediate
              receiving hospital
            </h3>

            <p>
              Dual Link is analysing patient condition,
              ambulance ETA and hospital operational
              readiness.
            </p>

          </div>

          <div className="eta-box">

            <span>
              AMBULANCE ETA
            </span>

            <strong>
              0{ambulanceEta}:00
            </strong>

          </div>

        </section>

        {/* =================================================
            AMBULANCE
            ================================================= */}

        <section className="panel ambulance-panel">

          <div className="panel-heading">

            <div>

              <span className="section-label">
                01 · AMBULANCE LINK
              </span>

              <h3>
                Live Ambulance Connection
              </h3>

            </div>

            <span className="live-pill">
              ● LIVE GPS
            </span>

          </div>

          <div className="ambulance-grid">

            <div className="ambulance-main">

              <div className="ambulance-visual">
                🚑
              </div>

              <div>

                <span className="muted">
                  AMBULANCE ID
                </span>

                <h4>
                  AMB-042
                </h4>

                <p>
                  Emergency Medical Transport Unit
                </p>

              </div>

            </div>

            <div className="info-box">

              <span>LOCATION</span>

              <strong>
                Avinashi Road
              </strong>

              <small>
                Moving toward hospital
              </small>

            </div>

            <div className="info-box">

              <span>DISTANCE</span>

              <strong>
                {distance}
              </strong>

              <small>
                Remaining route
              </small>

            </div>

            <div className="info-box">

              <span>ETA</span>

              <strong>
                {ambulanceEta} min
              </strong>

              <small className="green">
                On schedule
              </small>

            </div>

          </div>

        </section>

        {/* =================================================
            PATIENT
            ================================================= */}

        <section className="panel patient-panel">

          <div className="panel-heading">

            <div>

              <span className="section-label">
                02 · PATIENT LINK
              </span>

              <h3>
                Patient Emergency Profile
              </h3>

            </div>

            <span className="live-pill">
              ● DATA STREAM ACTIVE
            </span>

          </div>

          <div className="patient-summary">

            <div>
              <span className="muted">
                CASE ID
              </span>

              <strong>
                DL-2026-0842
              </strong>
            </div>

            <div>
              <span className="muted">
                BLOOD GROUP
              </span>

              <strong>
                O+
              </strong>
            </div>

            <div>
              <span className="muted">
                CONDITION
              </span>

              <strong className="urgent">
                TRAUMA — URGENT
              </strong>
            </div>

            <div>
              <span className="muted">
                CONSCIOUSNESS
              </span>

              <strong>
                Conscious & Responding
              </strong>
            </div>

          </div>

          <div className="vitals-grid">

            <div className="vital-card">
              <span>
                ♥ HEART RATE
              </span>

              <strong>
                112 <small>BPM</small>
              </strong>

              <em>
                Elevated
              </em>
            </div>

            <div className="vital-card">
              <span>
                ◉ SpO₂
              </span>

              <strong>
                96 <small>%</small>
              </strong>

              <em>
                Stable
              </em>
            </div>

            <div className="vital-card">
              <span>
                BP
              </span>

              <strong>
                138/86
              </strong>

              <em>
                Monitoring
              </em>
            </div>

            <div className="vital-card">
              <span>
                🌡 TEMPERATURE
              </span>

              <strong>
                37.2 <small>°C</small>
              </strong>

              <em>
                Normal
              </em>
            </div>

          </div>

          {/* VOICE RESULT ALSO APPEARS HERE */}

          <div className="observation">

            <div className="observation-title">

              <span>
                VISIBLE INJURY OBSERVATION
              </span>

              <b>
                MEDICAL ASSISTANT
              </b>

            </div>

            <p>
              {transcript ||
                "Deep wound on the left leg with visible bleeding. Patient is conscious and responding."}
            </p>

            <div className="tags">

              <span>
                Left Leg Injury
              </span>

              <span>
                Visible Bleeding
              </span>

              <span>
                Conscious
              </span>

              <span>
                Trauma
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            VOICE TO TEXT
            ================================================= */}

        <section className="panel assistant-panel">

          <div className="panel-heading">

            <div>

              <span className="section-label">
                03 · MEDICAL ASSISTANT
              </span>

              <h3>
                Voice-to-Emergency Information
              </h3>

            </div>

            <span className="voice-supported">
              🎙 SPEECH RECOGNITION
            </span>

          </div>

          <div className="assistant-grid">

            <div className="voice-card">

              <div
                className={`microphone ${
                  recording ? "recording" : ""
                }`}
              >
                🎙
              </div>

              <div>

                <span className="muted">
                  LIVE VOICE INPUT
                </span>

                <p>
                  {recording
                    ? "Listening... Speak the patient's visible injury."
                    : "Describe visible injuries using your voice."}
                </p>

                <button
                  className={`voice-button ${
                    recording ? "recording" : ""
                  }`}
                  onClick={startVoiceRecognition}
                  type="button"
                >
                  {recording
                    ? "■ Stop Listening"
                    : "🎙 Start Voice Input"}
                </button>

                {voiceError && (
                  <small className="voice-message">
                    {voiceError}
                  </small>
                )}

              </div>

            </div>

            <div className="structured-card">

              <span className="muted">
                RECOGNISED EMERGENCY INFORMATION
              </span>

              <p>
                {transcript
                  ? transcript
                  : "Your recognised speech will appear here."}
              </p>

              {transcript && (
                <button
                  className="clear-voice"
                  onClick={() => {
                    setTranscript("");
                    setVoiceError("");
                  }}
                  type="button"
                >
                  Clear Voice Text
                </button>
              )}

              <div className="tags">

                <span>
                  Speech-to-Text
                </span>

                <span>
                  Medical Observation
                </span>

                <span>
                  Real-Time Input
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            HOSPITAL READINESS
            ================================================= */}

        <section className="panel hospital-panel">

          <div className="panel-heading">

            <div>

              <span className="section-label">
                04 · HOSPITAL LINK
              </span>

              <h3>
                Hospital Readiness Analysis
              </h3>

              <p>
                Operational readiness, specialties and
                travel time are evaluated together.
              </p>

            </div>

            <div className="hospital-counter">

              <strong>
                3
              </strong>

              <span>
                Hospitals Analysed
              </span>

            </div>

          </div>

          <div className="hospital-list">

            <div className="hospital-header">

              <span>
                HOSPITAL
              </span>

              <span>
                BEDS
              </span>

              <span>
                ICU
              </span>

              <span>
                DOCTOR
              </span>

              <span>
                BLOOD
              </span>

              <span>
                ETA
              </span>

              <span>
                STATUS
              </span>

            </div>

            {hospitals.map((hospital) => (

              <button
                key={hospital.code}
                className={`hospital-row ${
                  selectedHospitalCode ===
                  hospital.code
                    ? "recommended-row"
                    : ""
                }`}
                onClick={() =>
                  selectHospital(hospital.code)
                }
                type="button"
              >

                <div className="hospital-name">

                  <div className="hospital-logo">
                    ✚
                  </div>

                  <div className="hospital-name-content">

                    <strong>
                      {hospital.name}
                    </strong>

                    <small>
                      {hospital.code}
                    </small>

                    <div className="specialty-tags">

                      {hospital.specialties
                        .slice(0, 3)
                        .map((specialty) => (
                          <span
                            className="specialty-tag"
                            key={specialty}
                          >
                            {specialty}
                          </span>
                        ))}

                    </div>

                  </div>

                </div>

                <div className="hospital-metric">

                  <span>
                    EMERGENCY BEDS
                  </span>

                  <strong>
                    {hospital.beds}
                  </strong>

                </div>

                <div className="hospital-metric">

                  <span>
                    ICU
                  </span>

                  <strong>
                    {hospital.icu}
                  </strong>

                </div>

                <div className="hospital-metric">

                  <span>
                    DOCTOR
                  </span>

                  <strong
                    className={
                      hospital.doctor ===
                      "Available"
                        ? "available"
                        : "busy"
                    }
                  >
                    {hospital.doctor}
                  </strong>

                </div>

                <div className="hospital-metric">

                  <span>
                    BLOOD
                  </span>

                  <strong>
                    {hospital.blood}
                  </strong>

                </div>

                <div className="hospital-metric">

                  <span>
                    ETA
                  </span>

                  <strong>
                    {hospital.eta} min
                  </strong>

                </div>

                <span
                  className={`hospital-status ${hospital.status.toLowerCase()}`}
                >
                  {hospital.status}
                </span>

              </button>

            ))}

          </div>

          <div className="readiness-explanation">

            <div className="explanation-icon">
              ✦
            </div>

            <div>

              <strong>
                Why readiness matters
              </strong>

              <p>
                The nearest hospital may not have the
                resources or specialty required. Dual Link
                compares emergency capacity, ICU, doctors,
                blood availability, trauma support,
                specialties and ETA before presenting
                the destination option.
              </p>

            </div>

          </div>

          <div className="simulation-control">

            <button
              className={
                simulation
                  ? "simulation-active"
                  : ""
              }
              onClick={toggleSimulation}
              type="button"
            >
              {simulation
                ? "● Live Movement Active"
                : "▶ Simulate Live Movement"}
            </button>

            <span>
              {simulation
                ? "Ambulance position and ETA are updating."
                : "Use simulation for the hackathon demonstration."}
            </span>

          </div>

        </section>

        {/* =================================================
            AI RECOMMENDATION
            ================================================= */}

        <section className="recommendation-panel">

          <div className="recommendation-header">

            <div>

              <span className="section-label">
                05 · DUAL LINK DECISION ENGINE
              </span>

              <h3>
                AI-Assisted Destination Recommendation
              </h3>

            </div>

            <span className="ai-badge">
              ✦ AI ASSISTED
            </span>

          </div>

          <div className="recommendation">

            <div className="recommendation-hospital-icon">
              ✚
            </div>

            <div className="recommendation-text">

              <span>
                RECOMMENDED RECEIVING HOSPITAL
              </span>

              <h2>
                {selectedHospital.name}
              </h2>

              <p>
                Hospital readiness is compared using
                available emergency resources,
                specialty capability and practical
                ambulance travel time.
              </p>

              {/* HOSPITAL SPECIALTIES */}

              <div className="recommendation-specialties">

                <span>
                  Available Specialties
                </span>

                <div className="recommendation-factors">

                  {selectedHospital.specialties.map(
                    (specialty) => (
                      <span key={specialty}>
                        ✓ {specialty}
                      </span>
                    )
                  )}

                </div>

              </div>

              {/* READINESS FACTORS */}

              <div
                className="recommendation-factors"
                style={{ marginTop: "10px" }}
              >

                <span>
                  ✓ Emergency Bed
                </span>

                <span>
                  ✓ ICU
                </span>

                <span>
                  ✓ Emergency Doctor
                </span>

                <span>
                  ✓ O+ Blood
                </span>

                <span>
                  ✓ Trauma Team
                </span>

                <span>
                  ✓ Emergency OT
                </span>

              </div>

            </div>

            <div className="score">

              <span>
                READINESS
              </span>

              <strong>
                {selectedHospital.score}%
              </strong>

              <small>
                Operational readiness
              </small>

            </div>

          </div>

          <div className="recommendation-note">

            <strong>
              Dual Link insight:
            </strong>

            <span>
              Destination selection considers patient
              needs, hospital readiness, specialty
              capability and ambulance ETA instead
              of distance alone.
            </span>

          </div>

          <div className="action-buttons">

            <button
              className="secondary-button"
              onClick={reviewHospitals}
              type="button"
            >
              Review Hospital Details
            </button>

            <button
              className="primary-button"
              onClick={confirmDestination}
              disabled={confirmed}
              type="button"
            >
              {confirmed
                ? "✓ Destination Confirmed"
                : "Confirm Destination"}
            </button>

          </div>

        </section>

        {/* =================================================
            PREPARATION
            ================================================= */}

        <section className="panel preparation-panel">

          <div className="panel-heading">

            <div>

              <span className="section-label">
                06 · PRE-ARRIVAL PREPARATION
              </span>

              <h3>
                Receiving Hospital Preparation
              </h3>

            </div>

            <span
              className={`preparation-status ${
                confirmed ? "confirmed" : ""
              }`}
            >
              {confirmed
                ? "● CONFIRMED"
                : "○ AWAITING CONFIRMATION"}
            </span>

          </div>

          <div className="receiving-card">

            <div className="receiving-info">

              <div className="receiving-icon">
                ✚
              </div>

              <div>

                <span>
                  RECEIVING HOSPITAL
                </span>

                <strong>
                  {selectedHospital.name}
                </strong>

                <small>
                  {selectedHospital.code} · Ambulance
                  AMB-042 · ETA {ambulanceEta} minutes
                </small>

              </div>

            </div>

            <div className="arrival">

              <span>
                ESTIMATED ARRIVAL
              </span>

              <strong>
                {String(ambulanceEta).padStart(2, "0")} MIN
              </strong>

            </div>

          </div>

          <div className="preparation-grid">

            {[
              "Emergency Bed",
              "ICU",
              "Emergency Doctor",
              "O+ Blood",
              "Trauma Team",
              "Emergency OT",
            ].map((item) => (

              <div
                key={item}
                className={`preparation-item ${
                  confirmed ? "completed" : ""
                }`}
              >

                <span className="check">
                  {confirmed ? "✓" : "○"}
                </span>

                <span>
                  {item}
                </span>

              </div>

            ))}

          </div>

          <div className="preparation-message">

            {confirmed ? (
              <>
                <strong>
                  Hospital notified.
                </strong>{" "}
                Emergency resources are being prepared
                before ambulance arrival.
              </>
            ) : (
              <>
                Confirm the destination to trigger the
                pre-arrival preparation workflow.
              </>
            )}

          </div>

        </section>

        {/* =================================================
            ROUTE
            ================================================= */}

        <section className="panel route-panel">

          <div className="panel-heading">

            <div>

              <span className="section-label">
                07 · LIVE ROUTE
              </span>

              <h3>
                Ambulance Route & ETA
              </h3>

            </div>

            <span className="live-pill">
              ● LIVE ROUTE
            </span>

          </div>

          <div className="map-area">

            <div className="map-grid"></div>

            <div className="road road-1"></div>
            <div className="road road-2"></div>
            <div className="road road-3"></div>

            <div
              className={`route-line ${
                simulation ? "moving" : ""
              }`}
            ></div>

            <div className="map-marker ambulance-marker">
              🚑
              <span>
                AMB-042
              </span>
            </div>

            <div className="map-marker hospital-marker">
              ✚
              <span>
                {selectedHospital.code}
              </span>
            </div>

            <div className="map-info">

              <strong>
                {distance}
              </strong>

              <span>
                Estimated travel · {ambulanceEta} min
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            WORKFLOW
            ================================================= */}

        <section className="workflow-section">

          <div>

            <span className="section-label">
              DUAL LINK WORKFLOW
            </span>

            <h3>
              From accident to prepared hospital
            </h3>

            <p>
              Patient data + Ambulance ETA + Hospital
              readiness → coordinated emergency response.
            </p>

          </div>

          <div className="workflow">

            <span>
              🚑 Ambulance
            </span>

            <b>
              →
            </b>

            <span>
              ♥ Patient
            </span>

            <b>
              →
            </b>

            <span>
              ✦ Dual Link
            </span>

            <b>
              →
            </b>

            <span>
              🏥 Hospital
            </span>

            <b>
              →
            </b>

            <span>
              ✓ Prepared
            </span>

          </div>

        </section>

      </main>

      {/* ===================================================
          FOOTER
          =================================================== */}

      <footer>

        <span>
          Dual Link · Emergency Healthcare Coordination
        </span>

        <span>
          Prototype · Synthetic demonstration data ·
          Not for clinical use
        </span>

      </footer>

      {/* ===================================================
          NOTIFICATION
          =================================================== */}

      {notification && (
        <div className="notification-toast">
          ✓ {notification}
        </div>
      )}

    </div>
  );
}

export default App;