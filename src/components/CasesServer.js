import React, { useEffect } from 'react'
import CaseCardServer from './CaseCardServer'
import CaseCard from './CaseCard'
import { useContext } from 'react';
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import alertContext from '../context/alertContext/AlertContext';
import CaseApprovalServer from './CaseApprovalServer';
import { useNavigate } from 'react-router-dom';
export default function CasesServer() {
    const context = useContext(serverCaseContext);
    const context2 = useContext(alertContext);
    const { UserApplications, NonTransferredCompletedCases, getNonTransferredCompletedCases, getUserApplications, ServerRegisteredCases, getServerRegisteredCases } = context;
    const { showAlert } = context2;
   
    const navigate=useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserApplications();
            getServerRegisteredCases();
            getNonTransferredCompletedCases();
        } else {
          navigate('/login_server');
        }
      }, []);

    return (
        <>
            <h1 className='text-center font-bold text-4xl py-2'>Case Applications</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {UserApplications.length > 0 ? (
                    UserApplications.map((application) => (
                        <CaseApprovalServer key={application.cno} application={application} case />
                    ))
                ) : (
                    <p>No applications available</p>
                )}
            </div>

            <h1 className='text-center font-bold text-4xl pt-6'>On Going Approved Cases</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {ServerRegisteredCases.map((application) => (
                    <CaseCardServer key={application.cno} application={application}  />
                ))}
            </div>
            
        </>

    )
}
