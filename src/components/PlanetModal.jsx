import React, { useEffect, useRef } from "react";
import "../PlanetModal.css";

export default function PlanetModal({ planet, onClose, isOpen }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  const getOrdinalSuffix = (order) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = order % 100;
    return (
      suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]
    );
  };

  if (!isOpen || !planet) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" ref={modalRef}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="modal-header">
          <img
            src={planet.imageUrl}
            alt={planet.name}
            className="planet-image"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/200x200?text=Planet+Image";
            }}
          />
          <div className="planet-title">
            <h1>{planet.name}</h1>
            <p className="planet-subtitle">
              {planet.order}
              {getOrdinalSuffix(planet.order)} planet from the Sun
            </p>
          </div>
        </div>

        <div className="modal-content">
          <section className="info-section">
            <h2>Overview</h2>
            <p className="description">{planet.description}</p>
            <div className="fun-fact">
              <strong>🌟 Fun Fact:</strong> {planet.interestingFact}
            </div>
          </section>

          <section className="info-section">
            <h2>Key Characteristics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">Diameter</span>
                <span className="stat-value">{planet.diameter}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Mass</span>
                <span className="stat-value">{planet.mass}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Distance from Sun</span>
                <span className="stat-value">{planet.distanceFromSun}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Orbital Period</span>
                <span className="stat-value">{planet.orbitalPeriod}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Average Temperature</span>
                <span className="stat-value">{planet.temperature}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Number of Moons</span>
                <span className="stat-value">{planet.moons}</span>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Atmosphere Composition</h2>
            <p className="atmosphere-text">{planet.atmosphere}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
