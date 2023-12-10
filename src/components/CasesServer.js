import React from 'react'
import CaseCardServer from './CaseCardServer'
import CaseCard from './CaseCard'

export default function CasesServer() {
    return (
        <> 
            <h1 className='text-center font-bold text-4xl py-2'>Case Applications</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                <CaseCardServer />
                <CaseCardServer />
                <CaseCardServer />
                <CaseCardServer />
                <CaseCardServer />
                <CaseCardServer />
                <CaseCardServer />
            </div>
            <h1 className='text-center font-bold text-4xl py-2'>Non -Transferred Cases</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {/* <CaseCard/> */}
            </div>
        </>

    )
}
