import React, { useContext, useEffect } from 'react';
import CaseCard from './CaseCard';
import userCaseContext from '../context/userCaseContext';

export default function Cards() {
    const context = useContext(userCaseContext);
    const { RegisteredCases, getAllRegisteredCases } = context;
    useEffect(() => {
        getAllRegisteredCases();
        console.log(RegisteredCases)
    }, []);

    return (
        <>
            <h1 className='text-center font-bold text-4xl'>Donate and Make a Change</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {RegisteredCases == null ? (<p>No cases yet</p>) : RegisteredCases.map((caseItem) => {
                    return <CaseCard caseItem={caseItem} key={caseItem.cno} approved={true} />;
                })}
            </div>
        </>
    );
}
