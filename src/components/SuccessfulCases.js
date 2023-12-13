import React, { useContext, useEffect } from 'react'
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import SuccessfulCaseCard from './SuccessfulCaseCard';
export default function SuccessfulCases() {
  const context = useContext(serverCaseContext);
  const { getTransferredCasesByServer, TransferredCases } = context;
  useEffect(() => {
    getTransferredCasesByServer();
  }, []);


  return (
    <>
      <h1 className='text-center font-bold text-4xl pt-6'>Successfull Cases</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {TransferredCases.length === 0 ? (
          <p>No Successfull cases yet</p>
        ) : (
          TransferredCases.map((application) => (
            <SuccessfulCaseCard key={application.cno} application={application} donate={true} show={true} />
          ))
        )}
      </div>

    </>
  )
}
