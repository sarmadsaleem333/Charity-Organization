import React, { useEffect } from 'react'
import CaseCardServer from './CaseCardServer'
import CaseCard from './CaseCard'
import { useContext } from 'react';
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import alertContext from '../context/alertContext/AlertContext';
export default function CasesServer() {
    const context = useContext(serverCaseContext);
    const context2 = useContext(alertContext);
    const { UserApplications, getUserApplications,ServerRegisteredCases,getServerRegisteredCases} = context;
    const { showAlert } = context2;
    useEffect(() => {
        getUserApplications();
        getServerRegisteredCases();
    }, [])


    return (
        <>
            <h1 className='text-center font-bold text-4xl py-2'>Case Applications</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {UserApplications.map((application) => (
                    <CaseCardServer key={application.cno} application={application} donate={false} />
                ))}
            </div>
            <h1 className='text-center font-bold text-4xl pt-6'>On Going Approved Cases</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {ServerRegisteredCases.map((application) => (
                    <CaseCardServer key={application.cno} application={application} donate={true} />
                ))}
            </div>
        </>

    )
}
