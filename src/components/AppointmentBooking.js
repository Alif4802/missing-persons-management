import React, { useState, useEffect, useCallback } from 'react';
import web3 from '../ethereum/provider';
import contract from '../ethereum/contract';

function AppointmentBooking({ cases, timeSlots }) {
  const [investigators, setInvestigators] = useState([]);
  const [selectedCase, setSelectedCase] = useState('');
  const [selectedInvestigator, setSelectedInvestigator] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [slotAvailability, setSlotAvailability] = useState({});
  
  useEffect(() => {
    setInvestigators([
      { address: '0x123...', name: 'Investigator 1' },
      { address: '0x456...', name: 'Investigator 2' }
    ]);
  }, []);
  
  const checkSlotAvailability = useCallback(async (investigatorAddress) => {
    try {
      const availability = {};
      for (let i = 0; i < timeSlots.length; i++) {
        const isBooked = await contract.getAppointmentStatus(investigatorAddress, i);
        availability[i] = !isBooked;
      }
      setSlotAvailability(availability);
    } catch (error) {
      console.error("Error checking slot availability:", error);
    }
  }, [timeSlots]);

  useEffect(() => {
    if (selectedInvestigator) {
      checkSlotAvailability(selectedInvestigator);
    }
  }, [selectedInvestigator, checkSlotAvailability]);
  
  const bookAppointment = async () => {
    if (!selectedCase || !selectedInvestigator || selectedTimeSlot === '') {
      alert('Please select all required fields');
      return;
    }
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.bookAppointment(
        selectedCase,
        selectedInvestigator,
        selectedTimeSlot
      ).send({ from: accounts[0], value: web3.utils.toWei('0.01', 'ether') });
      alert('Appointment booked successfully!');
      setSelectedCase('');
      setSelectedTimeSlot('');
      checkSlotAvailability(selectedInvestigator);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="appointment-booking">
      <h2>Book Investigation Appointment</h2>
      
      <div className="form-group">
        <label>Select Case:</label>
        <select 
          value={selectedCase} 
          onChange={(e) => setSelectedCase(e.target.value)}
        >
          <option value="">-- Select a case --</option>
          {cases.map(caseItem => (
            <option key={caseItem.caseId} value={caseItem.caseId}>
              #{caseItem.caseId} - {caseItem.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Select Investigator:</label>
        <select 
          value={selectedInvestigator} 
          onChange={(e) => setSelectedInvestigator(e.target.value)}
        >
          <option value="">-- Select an investigator --</option>
          {investigators.map((investigator, index) => (
            <option key={index} value={investigator.address}>
              {investigator.name}
            </option>
          ))}
        </select>
      </div>
      
      {selectedInvestigator && (
        <div className="form-group">
          <label>Select Time Slot:</label>
          <div className="time-slots">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                className={`time-slot ${selectedTimeSlot === index.toString() ? 'selected' : ''} ${!slotAvailability[index] ? 'booked' : ''}`}
                disabled={!slotAvailability[index]}
                onClick={() => setSelectedTimeSlot(index.toString())}
              >
                {slot}
                {!slotAvailability[index] && <span className="booked-label">Booked</span>}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="payment-info">
        <p>Booking Fee: 0.01 ETH</p>
      </div>
      
      <button 
        className="book-button" 
        onClick={bookAppointment} 
        disabled={loading || !selectedCase || !selectedInvestigator || selectedTimeSlot === ''}
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </div>
  );
}

export default AppointmentBooking;