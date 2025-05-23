import contract from '../ethereum/contract';
import React, { useState, useEffect } from 'react';

function CasesList({ loading, userRole, refreshCases }) {
  const [cases, setCases] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      setFetching(true);
      try {
        const total = await contract.methods.totalCases().call();
        const caseList = [];
        for (let i = 0; i < total; i++) {
          const caseItem = await contract.methods.missingPersons(i).call();
          caseList.push(caseItem);
        }
        setCases(caseList);
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setFetching(false);
      }
    };
    fetchCases();
  }, [refreshCases]);

  if (loading || fetching) {
    return <div className="loading">Loading cases...</div>;
  }
  
  if (cases.length === 0) {
    return <div className="no-cases">No cases found.</div>;
  }
  
  return (
    <div className="cases-list">
      <h2>Missing Persons Cases</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Status</th>
            <th>Urgency</th>
            <th>Contact</th>
            {userRole === 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {cases.map(caseItem => (
            <tr key={caseItem.caseId} className={`urgency-${caseItem.urgencyLevel.toLowerCase()}`}>
              <td>{caseItem.caseId}</td>
              <td>{caseItem.name}</td>
              <td>{caseItem.age}</td>
              <td>{caseItem.lastSeenLocation}</td>
              <td>{caseItem.status}</td>
              <td>{caseItem.urgencyLevel}</td>
              <td>{caseItem.contactNumber}</td>
              {userRole === 0 && (
                <td>
                  {caseItem.status === 'Missing' && (
                    <button 
                      className="mark-found"
                      onClick={async () => {
                        try {
                          const tx = await contract.updateStatus(caseItem.caseId, 1);
                          await tx.wait();
                          refreshCases();
                        } catch (error) {
                          console.error("Error updating status:", error);
                          alert("Failed to update status");
                        }
                      }}
                    >
                      Mark as Found
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CasesList;