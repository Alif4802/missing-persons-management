// src/contractABI.js

const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "reporterAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "investigatorAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum MissingPersonsManagement.TimeSlot",
          "name": "timeSlot",
          "type": "uint8"
        }
      ],
      "name": "AppointmentBooked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "investigatorAddress",
          "type": "address"
        }
      ],
      "name": "InvestigatorAssigned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "enum MissingPersonsManagement.UrgencyLevel",
          "name": "urgencyLevel",
          "type": "uint8"
        }
      ],
      "name": "MissingPersonAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum MissingPersonsManagement.Status",
          "name": "status",
          "type": "uint8"
        }
      ],
      "name": "StatusUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "enum MissingPersonsManagement.Role",
          "name": "role",
          "type": "uint8"
        }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_age",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_height",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_lastSeenLocation",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_contactNumber",
          "type": "string"
        }
      ],
      "name": "addMissingPerson",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_caseId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_investigatorAddress",
          "type": "address"
        },
        {
          "internalType": "enum MissingPersonsManagement.TimeSlot",
          "name": "_timeSlot",
          "type": "uint8"
        }
      ],
      "name": "bookAppointment",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_caseId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_investigatorAddress",
          "type": "address"
        }
      ],
      "name": "assignInvestigator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "enum MissingPersonsManagement.TimeSlot",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "appointments",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "reporterAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "investigatorAddress",
          "type": "address"
        },
        {
          "internalType": "enum MissingPersonsManagement.TimeSlot",
          "name": "timeSlot",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isBooked",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "divisionCounts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllMissingPersons",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_investigatorAddress",
          "type": "address"
        },
        {
          "internalType": "enum MissingPersonsManagement.TimeSlot",
          "name": "_timeSlot",
          "type": "uint8"
        }
      ],
      "name": "getAppointmentStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_division",
          "type": "string"
        }
      ],
      "name": "getMissingPersonCountByDivision",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "isUserRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "missingPersons",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "caseId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "height",
          "type": "uint256"
        },
        {
          "internalType": "enum MissingPersonsManagement.Status",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "lastSeenLocation",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contactNumber",
          "type": "string"
        },
        {
          "internalType": "enum MissingPersonsManagement.UrgencyLevel",
          "name": "urgencyLevel",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "reporterAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "investigatorAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "enum MissingPersonsManagement.Role",
          "name": "_role",
          "type": "uint8"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalCases",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_caseId",
          "type": "uint256"
        },
        {
          "internalType": "enum MissingPersonsManagement.Status",
          "name": "_status",
          "type": "uint8"
        }
      ],
      "name": "updateStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "nid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "enum MissingPersonsManagement.Role",
          "name": "role",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  export default contractABI;