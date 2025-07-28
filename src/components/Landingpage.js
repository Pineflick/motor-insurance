import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCheck } from 'react-icons/fa';
import './Landingpage.css';

function InsuranceQuoteGenerator() {
  
  const [showForm, setShowForm] = useState(false);
  const [quote, setQuote] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const [countdown, setCountdown] = useState(10);
  
  const [formData, setFormData] = useState({
    carMake: '',
    vehicleRegistration: '',
    color: '',
    chassisNo: '',
    bodyType: 'saloon',
    duration: 'year',
    coverageType: 'comprehensive'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate insurance quote
  const calculateQuote = (e) => {
    e.preventDefault();
    
    const bodyTypePrices = {
      saloon: 5000,
      suv: 7500,
      'pick-up': 6500,
      truck: 10000,
      bus: 12000
    };
    
    const coverageMultipliers = {
      comprehensive: 2.0,
      'third party': 0.6
    };
    
    const durationMultipliers = {
      year: 1.0,
      quarter: 0.3
    };
    
    const basePrice = bodyTypePrices[formData.bodyType];
    const coveragePrice = basePrice * coverageMultipliers[formData.coverageType];
    const finalPrice = coveragePrice * durationMultipliers[formData.duration];
    
    setQuote({
      ...formData,
      price: finalPrice.toFixed(2)
    });
  };

  // Handle purchase completion
  const handlePurchase = () => {
    setPurchaseSuccess({
      coverageType: quote.coverageType,
      bodyType: quote.bodyType,
      price: quote.price
    });
    setQuote(null);
    setCountdown(10);
  };

  // Reset all states
  const resetApplication = () => {
    setShowForm(false);
    setQuote(null);
    setPurchaseSuccess(null);
    setFormData({
      carMake: '',
      vehicleRegistration: '',
      color: '',
      chassisNo: '',
      bodyType: 'saloon',
      duration: 'year',
      coverageType: 'comprehensive'
    });
  };

  // Countdown timer for auto-redirect
  useEffect(() => {
    let timer;
    if (purchaseSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      resetApplication();
    }
    return () => clearTimeout(timer);
  }, [purchaseSuccess, countdown]);

  return (
    <div className="insurance-app">
    
      {!showForm && !quote && !purchaseSuccess && (
        <div className="landing-page">
          <div className="landing-overlay">
            <div className="landing-content">
              <h1 className="brand-name">ShieldCover Insurance</h1>
              <p className="brand-motto">"Drive with Confidence, We've Got You Covered"</p>
              <button 
                className="quote-btn pulse"
                onClick={() => setShowForm(true)}
              >
                Get Your Quote Now
              </button>
            </div>
            <div className="social-icons">
              <a href="#"><FaFacebook className="icon" /></a>
              <a href="#"><FaTwitter className="icon" /></a>
              <a href="#"><FaInstagram className="icon" /></a>
              <a href="#"><FaLinkedin className="icon" /></a>
            </div>
          </div>
        </div>
      )}

      
      {showForm && !quote && !purchaseSuccess && (
        <div className="form-modal">
          <form className="quote-form" onSubmit={calculateQuote}>
            <h2>Vehicle Insurance Quote</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Car Make</label>
                <input
                  type="text"
                  name="carMake"
                  value={formData.carMake}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Registration</label>
                <input
                  type="text"
                  name="vehicleRegistration"
                  value={formData.vehicleRegistration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Chassis No</label>
                <input
                  type="text"
                  name="chassisNo"
                  value={formData.chassisNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Body Type</label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="saloon">Saloon</option>
                  <option value="suv">SUV</option>
                  <option value="pick-up">Pick-Up</option>
                  <option value="truck">Truck</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                >
                  <option value="quarter">Quarter</option>
                  <option value="year">Year</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Coverage Type</label>
                <select
                  name="coverageType"
                  value={formData.coverageType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="third party">Third Party</option>
                  <option value="comprehensive">Comprehensive</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={resetApplication}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Calculate Quote
              </button>
            </div>
          </form>
        </div>
      )}

    
      {quote && !purchaseSuccess && (
        <div className="result-modal">
          <div className="quote-result">
            <h2>Your Insurance Quote</h2>
            
            <div className="quote-details">
              <div className="detail-row">
                <span className="detail-label">Car Make:</span>
                <span className="detail-value">{quote.carMake}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Registration:</span>
                <span className="detail-value">{quote.vehicleRegistration}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Color:</span>
                <span className="detail-value">{quote.color}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Body Type:</span>
                <span className="detail-value">{quote.bodyType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Coverage:</span>
                <span className="detail-value">{quote.coverageType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{quote.duration}</span>
              </div>
              
              <div className="price-summary">
                <h3>Estimated Premium</h3>
                <div className="price-amount">K{quote.price}</div>
              </div>
            </div>
            
            <div className="result-actions">
              <button className="btn btn-outline" onClick={resetApplication}>
                Get Another Quote
              </button>
              <button className="btn btn-purchase" onClick={handlePurchase}>
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      )}

      
      {purchaseSuccess && (
        <div className="success-modal">
          <div className="success-card">
            <div className="success-icon">
              <FaCheck />
            </div>
            
            <h2>Purchase Successful!</h2>
            
            <div className="success-details">
              <p>
                You've purchased <strong>{purchaseSuccess.coverageType}</strong> coverage
                for your <strong>{purchaseSuccess.bodyType}</strong>.
              </p>
              
              <div className="success-price">
                <span>Total Amount:</span>
                <span>K{purchaseSuccess.price}</span>
              </div>
            </div>
            
            <div className="countdown-message">
              Returning to homepage in {countdown} seconds...
            </div>
            
            <button 
              className="btn btn-return"
              onClick={resetApplication}
            >
              Return Home Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InsuranceQuoteGenerator;