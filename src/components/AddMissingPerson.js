import React, { useState } from 'react';

function AddMissingPerson({ contract, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    description: '',
    lastSeenLocation: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const tx = await contract.addMissingPerson(
        formData.name,
        parseInt(formData.age),
        parseInt(formData.height),
        formData.description,
        formData.lastSeenLocation,
        formData.contactNumber
      );
      
      await tx.wait();
      alert('Missing person report submitted successfully!');
      onSuccess();
      
      // Reset form
      setFormData({
        name: '',
        age: '',
        height: '',
        description: '',
        lastSeenLocation: '',
        contactNumber: ''
      });
    } catch (error) {
      console.error("Error adding missing person:", error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="add-missing-person">
      <h2>Report a Missing Person</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Last Seen Location (Division):</label>
          <input
            type="text"
            name="lastSeenLocation"
            value={formData.lastSeenLocation}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}

export default AddMissingPerson;