import React, { useState, useEffect } from 'react';

function AdminPanel({ contract, cases, timeSlots, statuses, roles, onCaseUpdated }) {
  const [investigators, setInvestigators] = useState([]);
  const [selectedCase, setSelectedCase] = useState('');
  const [selectedInvestigator, setSelectedInvestigator] = useState('');
  const [divisionStats, setDivisionStats] = useState({});
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setInvestigators([
      { address: '0x123...', name: 'Investigator 1' },
      { address: '0x456...', name: 'Investigator 2' }
    ]);
  }, []);
  
  useEffect(() => {
    const stats = {};
    cases.forEach(caseItem => {
      if (!stats[caseItem.lastSeenLocation]) {
        stats[caseItem.lastSeenLocation] = 0;
      }
      stats[caseItem.lastSeenLocation]++;
    });
    setDivisionStats(stats);
  }, [cases]);
  
  const assignInvestigator = async () => {
    if (!selectedCase || !selectedInvestigator) {
      alert('Please select both a case and an investigator');
      return;
    }
    
    setLoading(true);
    try {
      const tx = await contract.assignInvestigator(
        parseInt(selectedCase),
        selectedInvestigator
      );
      
      await tx.wait();
      alert('Investigator assigned successfully!');
      onCaseUpdated();
      
      // Reset form
      setSelectedCase('');
      setSelectedInvestigator('');
    } catch (error) {
      console.error("Error assigning investigator:", error);
      alert('Failed to assign investigator. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>
      
      <div className="panel-section">
        <h3>Division Statistics</h3>
        <div className="stats-grid">
          {Object.entries(divisionStats).map(([division, count]) => (
            <div key={division} className="stat-card">
              <h4>{division}</h4>
              <p>{count} missing person{count !== 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Assign Investigator</h3>
        <div className="assign-form">
          <div className="form-group">
            <label>Select Case:</label>
            <select 
              value={selectedCase} 
              onChange={(e) => setSelectedCase(e.target.value)}
            >
              <option value="">-- Select a case --</option>
              {cases
                .filter(caseItem => caseItem.status === 'Missing' && caseItem.investigatorAddress === '0x0000000000000000000000000000000000000000')
                .map(caseItem => (
                  <option key={caseItem.caseId} value={caseItem.caseId}>
                    #{caseItem.caseId} - {caseItem.name} ({caseItem.urgencyLevel})
                  </option>
                ))
              }
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
          
          <button 
            className="assign-button" 
            onClick={assignInvestigator} 
            disabled={loading || !selectedCase || !selectedInvestigator}
          >
            {loading ? 'Assigning...' : 'Assign Investigator'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;