import { useMemo, useState } from "react";
import "./App.css";

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
    score: 94,
    status: "READY",
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
    score: 78,
    status: "LIMITED",
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
    score: 42,
    status: "OVERLOADED",
  },
];

const preparationItems = [
  "Emergency Bed",
  "ICU",
  "Emergency Doctor",
  "O+ Blood",
  "Trauma Team",
  "Emergency OT",
];

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [recording, setRecording] = useState(false);
  const [notification, setNotification] = useState(false);
  const [simulation, setSimulation] = useState(false);
  const [selectedHospitalCode, setSelectedHospitalCode] =
    useState("HOSP-01");
  const [search, setSearch] = useState("");

  const selectedHospital =
    hospitals.find(
      (hospital) => hospital.code === selectedHospitalCode
    ) || hospitals[0];

  const filteredHospitals = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return hospitals;
    }

    return hospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(value) ||
        hospital.code.toLowerCase().includes(value) ||
        hospital.status.toLowerCase().includes(value)
    );
  }, [search]);

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

  const selectHospital = (hospital) => {
    if (confirmed) {
      return;
    }

    setSelectedHospitalCode(hospital.code);

    setTimeout(() => {
      scrollToSection("recommendation-panel");
    }, 150);
  };

  const confirmDestination = () => {
    setConfirmed(true);
    setNotification(true);

    setTimeout(() => {
      scrollToSection("preparation-panel");
    }, 300);

    setTimeout(() => {
      setNotification(false);
    }, 4500);
  };

  const toggleSimulation = () => {
    setSimulation((current) => !current);
  };

  const resetDemo = () => {
    setConfirmed(false);
    setRecording(false);
    setNotification(false);
    setSimulation(false);
    setSelectedHospitalCode("HOSP-01");
    setSearch("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentEta = simulation ? 8 : 9;
  const currentDistance = simulation ? "5.1 km" : "5.8 km";

  return (
    <div className="app">

      {/* SUCCESS NOTIFICATION */}
      {notification && (
        <div className="success-toast" role="status">
          <div className="toast-icon">✓</div>

          <div>
            <strong>Hospital Notified Successfully</strong>

            <span>
              {selectedHospital.name} received the emergency
              profile and ambulance ETA.
            </span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="header">

        <div className="brand">

          <div className="brand-logo">
            +
          </div>

          <div>
            <h1>Dual Link</h1>

            <p>
              Emergency Healthcare Coordination Platform
            </p>
          </div>

        </div>

        <div className="header-actions">

          <div className="system-status">
            <span className="online-dot"></span>
            System Online
          </div>

          <button
            className="reset-button"
            onClick={resetDemo}
          >
            Reset Demo
          </button>

        </div>

      </header>

      <main className="dashboard">

        {/* HERO */}
        <section className="hero-section">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <span className="hero-label">
              EMERGENCY COMMAND CENTRE
            </span>

            <h2>
              See the emergency.
              <br />
              <strong>
                Prepare before it arrives.
              </strong>
            </h2>

            <p>
              Dual Link connects ambulance movement,
              patient information and hospital readiness
              into one emergency coordination workflow.
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

            <span>
              ACTIVE EMERGENCY
            </span>

            <strong>
              DL-2026-0842
            </strong>

            <small>
              Trauma Response · Synthetic Demo
            </small>

          </div>

        </section>

        {/* KPI CARDS */}
        <section className="cards">

          <div className="card">

            <div className="card-icon ambulance-bg">
              🚑
            </div>

            <div>
              <span>AMBULANCE</span>
              <strong>AMB-042</strong>
              <small>
                GPS tracking active
              </small>
            </div>

          </div>

          <div className="card">

            <div className="card-icon patient-bg">
              ♥
            </div>

            <div>
              <span>PATIENT</span>
              <strong>
                Trauma — Urgent
              </strong>
              <small>
                Continuous monitoring
              </small>
            </div>

          </div>

          <div className="card">

            <div className="card-icon eta-bg">
              ⌖
            </div>

            <div>
              <span>LIVE ETA</span>

              <strong>
                {currentEta} minutes
              </strong>

              <small>
                {simulation
                  ? "Traffic-adjusted demo"
                  : "5.8 km remaining"}
              </small>
            </div>

          </div>

          <div className="card">

            <div className="card-icon hospital-bg">
              ✚
            </div>

            <div>
              <span>HOSPITALS</span>
              <strong>
                3 Analysed
              </strong>
              <small>
                Readiness comparison
              </small>
            </div>

          </div>

        </section>

        {/* EMERGENCY ALERT */}
        <section className="emergency-alert">

          <div className="alert-icon">
            !
          </div>

          <div className="alert-content">

            <span>
              EMERGENCY CASE DETECTED
            </span>

            <h3>
              Trauma patient requires an immediate
              receiving hospital
            </h3>

            <p>
              Dual Link is analysing patient needs,
              ambulance ETA and operational readiness
              before presenting a destination option.
            </p>

          </div>

          <div className="eta-box">

            <span>
              AMBULANCE ETA
            </span>

            <strong>
              {simulation ? "08:00" : "09:00"}
            </strong>

          </div>

        </section>

        {/* AMBULANCE LINK */}
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

              <span>
                LOCATION
              </span>

              <strong>
                Avinashi Road
              </strong>

              <small>
                Moving toward hospital
              </small>

            </div>

            <div className="info-box">

              <span>
                DISTANCE
              </span>

              <strong>
                {currentDistance}
              </strong>

              <small>
                Remaining route
              </small>

            </div>

            <div className="info-box">

              <span>
                ETA
              </span>

              <strong>
                {currentEta} min
              </strong>

              <small className="green">
                On schedule
              </small>

            </div>

          </div>

        </section>

        {/* PATIENT LINK */}
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
              Deep wound on the left leg with visible
              bleeding. Patient is conscious and responding.
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

        {/* MEDICAL ASSISTANT */}
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

            <span className="secure-pill">
              Structured input
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
                  VOICE INPUT
                </span>

                <p>
                  {recording
                    ? "Listening to medical observation..."
                    : "Describe visible injuries using voice."}
                </p>

                <button
                  className="voice-button"
                  onClick={() =>
                    setRecording((current) => !current)
                  }
                >
                  {recording
                    ? "Stop Recording"
                    : "Start Voice Input"}
                </button>

              </div>

            </div>

            <div className="structured-card">

              <span className="muted">
                STRUCTURED EMERGENCY INFORMATION
              </span>

              <p>
                “Patient has a deep wound on the left
                leg with visible bleeding. Patient is
                conscious and responding.”
              </p>

              <div className="tags">

                <span>
                  Body Part: Left Leg
                </span>

                <span>
                  Bleeding: Visible
                </span>

                <span>
                  Conscious: Yes
                </span>

              </div>

              <small className="demo-note">
                Prototype demonstration:
                voice-to-structure is simulated.
              </small>

            </div>

          </div>

        </section>

        {/* HOSPITAL READINESS */}
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
                Operational readiness is evaluated
                alongside travel time.
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

          {/* SEARCH + SIMULATION */}
          <div className="hospital-tools">

            <div className="search-box">

              <span>
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search hospital or status..."
                aria-label="Search hospitals"
              />

            </div>

            <button
              className="simulation-button"
              onClick={toggleSimulation}
            >
              {simulation
                ? "Stop Route Simulation"
                : "▶ Simulate Live Movement"}
            </button>

          </div>

          <div className="hospital-list">

            <div className="hospital-header">

              <span>
                HOSPITAL
              </span>

              <span>
                EMERGENCY BEDS
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

            {filteredHospitals.map((hospital) => (

              <button
                key={hospital.code}
                type="button"
                className={`hospital-row ${
                  selectedHospital.code === hospital.code
                    ? "recommended-row"
                    : ""
                }`}
                onClick={() =>
                  selectHospital(hospital)
                }
              >

                <span className="hospital-name">

                  <span className="hospital-logo">
                    ✚
                  </span>

                  <span>

                    <strong>
                      {hospital.name}
                    </strong>

                    <small>
                      {hospital.code}
                    </small>

                  </span>

                </span>

                <span className="hospital-metric">

                  <span>
                    EMERGENCY BEDS
                  </span>

                  <strong>
                    {hospital.beds}
                  </strong>

                </span>

                <span className="hospital-metric">

                  <span>
                    ICU
                  </span>

                  <strong>
                    {hospital.icu}
                  </strong>

                </span>

                <span className="hospital-metric">

                  <span>
                    DOCTOR
                  </span>

                  <strong
                    className={
                      hospital.doctor === "Available"
                        ? "available"
                        : "busy"
                    }
                  >
                    {hospital.doctor}
                  </strong>

                </span>

                <span className="hospital-metric">

                  <span>
                    BLOOD
                  </span>

                  <strong>
                    {hospital.blood}
                  </strong>

                </span>

                <span className="hospital-metric">

                  <span>
                    ETA
                  </span>

                  <strong>
                    {simulation
                      ? Math.max(hospital.eta - 1, 1)
                      : hospital.eta}{" "}
                    min
                  </strong>

                </span>

                <span
                  className={`hospital-status ${
                    hospital.status.toLowerCase()
                  }`}
                >
                  {hospital.status}
                </span>

              </button>

            ))}

            {filteredHospitals.length === 0 && (

              <div className="empty-state">
                No matching hospitals found.
              </div>

            )}

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
                resources required. Dual Link compares
                emergency capacity, ICU, doctors, blood,
                trauma support and ETA before presenting
                a destination option.
              </p>

            </div>

          </div>

        </section>

        {/* DECISION ENGINE */}
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
                SELECTED RECEIVING HOSPITAL
              </span>

              <h2>
                {selectedHospital.name}
              </h2>

              <p>
                This prototype prioritises operational
                readiness and practical travel time for
                the current emergency profile.
              </p>

              <div className="score-bar">

                <span
                  style={{
                    width: `${selectedHospital.score}%`,
                  }}
                ></span>

              </div>

              <div className="recommendation-factors">

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
                {selectedHospital.status === "READY"
                  ? "High readiness"
                  : "Review required"}
              </small>

            </div>

          </div>

          <div className="recommendation-note">

            <strong>
              Dual Link insight:
            </strong>

            <span>
              Destination selection considers patient
              needs, hospital readiness and ambulance
              ETA instead of distance alone.
            </span>

          </div>

          <div className="action-buttons">

            <button
              className="secondary-button"
              onClick={reviewHospitals}
            >
              Review Hospital Details
            </button>

            <button
              className="primary-button"
              onClick={confirmDestination}
              disabled={confirmed}
            >
              {confirmed
                ? "✓ Destination Confirmed"
                : "Confirm Destination"}
            </button>

          </div>

        </section>

        {/* PRE-ARRIVAL PREPARATION */}
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
                  Ambulance AMB-042 · ETA {currentEta} minutes
                </small>

              </div>

            </div>

            <div className="arrival">

              <span>
                ESTIMATED ARRIVAL
              </span>

              <strong>
                {String(currentEta).padStart(2, "0")} MIN
              </strong>

            </div>

          </div>

          <div className="preparation-grid">

            {preparationItems.map((item) => (

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

        {/* LIVE ROUTE */}
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
                HOSPITAL
              </span>

            </div>

            <div className="map-info">

              <strong>
                {currentDistance}
              </strong>

              <span>
                Estimated travel · {currentEta} min
              </span>

            </div>

          </div>

        </section>

        {/* WORKFLOW */}
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

            <b>→</b>

            <span>
              ♥ Patient
            </span>

            <b>→</b>

            <span>
              ✦ Dual Link
            </span>

            <b>→</b>

            <span>
              🏥 Hospital
            </span>

            <b>→</b>

            <span>
              ✓ Prepared
            </span>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer>

        <span>
          Dual Link · Emergency Healthcare Coordination
        </span>

        <span>
          Prototype · Synthetic demonstration data · Not for clinical use
        </span>

      </footer>

    </div>
  );
}

export default App;