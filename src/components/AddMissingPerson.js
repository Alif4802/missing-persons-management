import React, { useState } from 'react';
import web3 from '../ethereum/provider';
import contract from '../ethereum/contract';

function AddMissingPerson({ onSuccess }) {
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
      const accounts = await web3.eth.getAccounts();
      const caseId = Date.now().toString();
      const details = {
        name: formData.name,
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        description: formData.description,
        lastSeenLocation: formData.lastSeenLocation,
        contactNumber: formData.contactNumber
      };
      await contract.methods.addMissingPerson(caseId, details).send({ from: accounts[0] });
      
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
      console.error('Error adding missing person:', error);
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