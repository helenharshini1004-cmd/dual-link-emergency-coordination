import { useState } from "react";
import "./App.css";

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [recording, setRecording] = useState(false);

  return (
    <div className="app">

      <header className="header">
        <div>
          <h1>Dual Link</h1>
          <p>Emergency Healthcare Coordination Platform</p>
        </div>
        <div className="online">● System Online</div>
      </header>

      <main className="dashboard">

        <section className="welcome">
          <p>HOSPITAL COMMAND CENTRE</p>
          <h2>Emergency Operations Dashboard</h2>
          <span>Real-time coordination between ambulances and hospitals</span>
        </section>

        <section className="cards">
          <div className="card">
            <p>Emergency Beds</p>
            <h3>42</h3>
            <span>Available</span>
          </div>
          <div className="card">
            <p>ICU Beds</p>
            <h3>7</h3>
            <span>Available</span>
          </div>
          <div className="card">
            <p>Doctors</p>
            <h3>24</h3>
            <span>Available</span>
          </div>
          <div className="card">
            <p>Ambulances</p>
            <h3>12</h3>
            <span>Connected</span>
          </div>
        </section>

        <section className="emergency-alert">
          <div className="alert-icon">!</div>
          <div className="alert-content">
            <p>INCOMING EMERGENCY</p>
            <h3>Ambulance A12 approaching</h3>
            <span>Case EMG-1047 • GPS connected • Hospital preparation required</span>
          </div>
          <div className="eta">
            <small>ETA</small>
            <strong>09</strong>
            <span>MIN</span>
          </div>
        </section>

        <section className="ambulance-panel">
          <div className="panel-heading">
            <div>
              <p>AMBULANCE NETWORK</p>
              <h3>Live Emergency Transport</h3>
            </div>
            <div>
              <span className="gps-status">● GPS CONNECTED</span>
              <div className="data-link-status">
                <span className="data-link-dot"></span>
                Live data link active
              </div>
            </div>
          </div>

          <div className="ambulance-info">
            <div className="ambulance-icon">🚑</div>
            <div className="ambulance-name">
              <strong>Ambulance A12</strong>
              <span>Emergency Case EMG-1047</span>
            </div>
            <div className="transport-detail">
              <small>Distance</small>
              <strong>6.8 km</strong>
            </div>
            <div className="transport-detail">
              <small>ETA</small>
              <strong>09 min</strong>
            </div>
            <div className="moving-status">MOVING</div>
          </div>
        </section>

        <section className="hospital-panel">
          <div className="panel-heading">
            <div>
              <p>HOSPITAL NETWORK</p>
              <h3>Operational Readiness</h3>
            </div>
            <span className="hospital-count">3 HOSPITALS</span>
          </div>

          <div className="hospital-row">
            <div className="hospital-logo">+</div>
            <div className="hospital-info">
              <strong>Hospital A</strong>
              <span>8 Emergency Beds • 2 ICU • Blood Available</span>
            </div>
            <div className="hospital-eta">
              <small>ETA</small>
              <strong>9 min</strong>
            </div>
            <div className="status ready">READY</div>
          </div>

          <div className="hospital-row">
            <div className="hospital-logo">+</div>
            <div className="hospital-info">
              <strong>Hospital B</strong>
              <span>4 Emergency Beds • 1 ICU • Blood Available</span>
            </div>
            <div className="hospital-eta">
              <small>ETA</small>
              <strong>10 min</strong>
            </div>
            <div className="status limited">LIMITED</div>
          </div>

          <div className="hospital-row">
            <div className="hospital-logo hospital-danger">+</div>
            <div className="hospital-info">
              <strong>Hospital C</strong>
              <span>0 Emergency Beds • ICU Full • Blood Low</span>
            </div>
            <div className="hospital-eta">
              <small>ETA</small>
              <strong>7 min</strong>
            </div>
            <div className="status overloaded">OVERLOADED</div>
          </div>
        </section>

        <section className="case-panel">
          <div className="panel-heading">
            <div>
              <p>EMERGENCY CASE</p>
              <h3>Live Patient Assessment</h3>
            </div>
            <span className="case-id">EMG-1047</span>
          </div>

          <div className="vitals-grid">
            <div className="vital-card">
              <span>Heart Rate</span>
              <strong>118</strong>
              <small>BPM</small>
            </div>
            <div className="vital-card">
              <span>SpO₂</span>
              <strong>89</strong>
              <small>%</small>
            </div>
            <div className="vital-card">
              <span>Blood Pressure</span>
              <strong>90/60</strong>
              <small>mmHg</small>
            </div>
            <div className="vital-card">
              <span>Temperature</span>
              <strong>37.2</strong>
              <small>°C</small>
            </div>
          </div>

          <div className="observation-box">
            <div className="observation-title">MEDICAL ASSISTANT OBSERVATION</div>
            <p>
              Patient has a deep wound on the left leg with visible bleeding.
              Patient is conscious and responding.
            </p>
          </div>

          <div className="case-details">
            <div><span>Blood Group</span><strong>O+</strong></div>
            <div><span>Consciousness</span><strong>Conscious</strong></div>
            <div><span>Injury</span><strong>Left Leg</strong></div>
            <div><span>Bleeding</span><strong>Visible</strong></div>
          </div>
        </section>

        <section className="recommendation-panel">
          <div className="recommendation-header">
            <div>
              <p>DUAL LINK INTELLIGENCE</p>
              <h3>Emergency Destination Recommendation</h3>
            </div>
            <span className="ai-badge">AI-ASSISTED</span>
          </div>

          <div className="recommendation-content">
            <div className="recommendation-icon">✓</div>
            <div className="recommendation-text">
              <span>RECOMMENDED FOR REVIEW</span>
              <h2>Hospital A</h2>
              <p>
                Hospital A has emergency capacity, ICU availability,
                blood availability and emergency staff ready for the
                incoming patient.
              </p>
            </div>
            <div className="recommendation-eta">
              <small>ARRIVAL ETA</small>
              <strong>09</strong>
              <span>MINUTES</span>
            </div>
          </div>

          <div className="decision-note">
            <strong>Why Hospital A?</strong>
            <span>
              Readiness is evaluated using operational capacity,
              emergency resources and estimated arrival time.
              Final destination decisions remain with qualified
              medical professionals.
            </span>
          </div>

          <div className="recommendation-actions">
            <button className="review-button">
              Review Hospital Details
            </button>
            <button
              className="confirm-button"
              onClick={() => setConfirmed(true)}
            >
              {confirmed ? "Destination Confirmed" : "Confirm Destination"}
            </button>
          </div>
        </section>

        <section className="preparation-panel">
          <div className="panel-heading">
            <div>
              <p>RECEIVING HOSPITAL</p>
              <h3>Pre-Arrival Preparation</h3>
            </div>
            <span className="preparation-status">
              {confirmed ? "CONFIRMED" : "PREPARING"}
            </span>
          </div>

          <div className="preparation-top">
            <div className="receiving-hospital">
              <div className="hospital-main-icon">H</div>
              <div>
                <h4>Hospital A</h4>
                <p>Emergency Receiving Centre</p>
              </div>
            </div>
            <div className="arrival-time">
              <span>Estimated Arrival</span>
              <strong>09 min</strong>
            </div>
          </div>

          <div className="preparation-grid">
            {[
              "Emergency Bed",
              "ICU",
              "Emergency Doctor",
              "Blood O+",
              "Trauma Team",
              "Emergency OT",
            ].map((item) => (
              <div
                key={item}
                className={
                  confirmed
                    ? "preparation-item completed"
                    : "preparation-item"
                }
              >
                <span className="check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="preparation-message">
            {confirmed
              ? "Hospital A has been notified. Emergency resources are being prepared before ambulance arrival."
              : "Destination confirmation is required before the receiving hospital begins preparation."}
          </div>
        </section>

        <section className="assistant-panel">
          <div className="panel-heading">
            <div>
              <p>AMBULANCE ASSISTANT</p>
              <h3>Emergency Observation Input</h3>
            </div>
            <span className="voice-status">
              ● {recording ? "RECORDING" : "READY"}
            </span>
          </div>

          <div className="assistant-content">
            <div className="voice-box">
              <div className="microphone">🎙</div>
              <div className="voice-text">
                <strong>Voice Observation</strong>
                <span>Speak the patient's visible condition</span>
              </div>
              <button
                className="voice-button"
                onClick={() => setRecording(!recording)}
              >
                {recording ? "Stop Recording" : "Start Recording"}
              </button>
            </div>

            <div className="observation-result">
              <span>STRUCTURED EMERGENCY INFORMATION</span>
              <p>
                Deep wound on left leg with visible bleeding.
                Patient conscious and responding.
              </p>
              <div className="observation-tags">
                <span>External Injury</span>
                <span>Visible Bleeding</span>
                <span>Conscious</span>
              </div>
            </div>
          </div>
        </section>

        <section className="route-panel">
          <div className="panel-heading">
            <div>
              <p>LIVE LOCATION</p>
              <h3>Ambulance Route</h3>
            </div>
            <span className="route-live">● LIVE</span>
          </div>

          <div className="map-area">
            <div className="road road-one"></div>
            <div className="road road-two"></div>
            <div className="road road-three"></div>

            <div className="map-point ambulance-location">
              <div className="map-marker">🚑</div>
              <div className="map-label">
                <strong>Ambulance A12</strong>
                <span>6.8 km away</span>
              </div>
            </div>

            <div className="route-path"></div>

            <div className="map-point hospital-location">
              <div className="hospital-marker">+</div>
              <div className="map-label">
                <strong>Hospital A</strong>
                <span>Destination</span>
              </div>
            </div>

            <div className="map-info">
              <span>ESTIMATED ARRIVAL</span>
              <strong>09 min</strong>
              <small>Route updated 12 seconds ago</small>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;