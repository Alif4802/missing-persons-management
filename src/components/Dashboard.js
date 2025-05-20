import React, { useState, useEffect, useCallback } from 'react';
import AddMissingPerson from './AddMissingPerson';
import CasesList from './CasesList';
import AppointmentBooking from './AppointmentBooking';
import AdminPanel from './AdminPanel';
import contract from '../ethereum/contract';

function Dashboard({ userRole, account, roles, statuses, urgencyLevels, timeSlots }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('cases');

  const fetchCases = useCallback(async () => {
    try {
      setLoading(true);
      const caseIds = await contract.getAllMissingPersons();
      const casePromises = caseIds.map(async (id) => {
        const caseData = await contract.missingPersons(id);
        return {
          caseId: caseData.caseId.toNumber(),
          name: caseData.name,
          age: caseData.age.toNumber(),
          height: caseData.height.toNumber(),
          status: statuses[caseData.status],
          description: caseData.description,
          lastSeenLocation: caseData.lastSeenLocation,
          contactNumber: caseData.contactNumber,
          urgencyLevel: urgencyLevels[caseData.urgencyLevel],
          reporterAddress: caseData.reporterAddress,
          investigatorAddress: caseData.investigatorAddress,
        };
      });
      const fetchedCases = await Promise.all(casePromises);
      setCases(fetchedCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  }, [statuses, urgencyLevels]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // Subscribe to MissingPersonAdded events
  useEffect(() => {
    const subscription = contract.events.MissingPersonAdded()
      .on('data', (event) => {
        // Optionally, you can fetch the new case or just refetch all
        fetchCases();
      })
      .on('error', (error) => {
        console.error('Error in MissingPersonAdded event subscription:', error);
      });
    return () => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, [fetchCases]);

  // Filter cases based on user role
  const filteredCases = cases.filter(caseItem => {
    if (userRole === 0) return true; // Admin sees all
    if (userRole === 1) return caseItem.reporterAddress === account; // Reporter sees own cases
    if (userRole === 2) return caseItem.investigatorAddress === account; // Investigator sees assigned cases
    return false;
  });

  return (
    <div className="dashboard">
      <div className="tabs">
        <button 
          className={activeTab === 'cases' ? 'active' : ''} 
          onClick={() => setActiveTab('cases')}
        >
          Cases
        </button>
        
        {userRole === 1 && ( // Reporter options
          <>
            <button 
              className={activeTab === 'add' ? 'active' : ''} 
              onClick={() => setActiveTab('add')}
            >
              Report New Case
            </button>
            <button 
              className={activeTab === 'appointments' ? 'active' : ''} 
              onClick={() => setActiveTab('appointments')}
            >
              Book Appointment
            </button>
          </>
        )}
        
        {userRole === 0 && ( // Admin options
          <button 
            className={activeTab === 'admin' ? 'active' : ''} 
            onClick={() => setActiveTab('admin')}
          >
            Admin Panel
          </button>
        )}
      </div>
      
      <div className="content">
        {activeTab === 'cases' && (
          <CasesList 
            cases={filteredCases} 
            loading={loading} 
            userRole={userRole}
            refreshCases={fetchCases}
            contract={contract}
          />
        )}
        
        {activeTab === 'add' && userRole === 1 && (
          <AddMissingPerson 
            contract={contract} 
            onSuccess={fetchCases}
          />
        )}
        
        {activeTab === 'appointments' && userRole === 1 && (
          <AppointmentBooking 
            contract={contract}
            cases={filteredCases}
            timeSlots={timeSlots}
          />
        )}
        
        {activeTab === 'admin' && userRole === 0 && (
          <AdminPanel 
            contract={contract}
            cases={cases}
            timeSlots={timeSlots}
            statuses={statuses}
            roles={roles}
            onCaseUpdated={fetchCases}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;