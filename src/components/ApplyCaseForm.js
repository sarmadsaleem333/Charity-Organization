import React, { useContext, useState } from 'react';
import userCaseContext from '../context/userCaseContext';
import alertContext from '../context/alertContext/AlertContext';
const ApplyCaseForm = () => {
    const context = useContext(userCaseContext);
    const context2 = useContext(alertContext);
    const { applyCase } = context;
    const { showAlert } = context2;
    const [CaseCredentials, setCaseCredentials] = useState({ cdescription: "", clastdate: "", camountreq: "", caccountno: "", caccounttitle: "" });
    const onChange = (e) => {
        setCaseCredentials({ ...CaseCredentials, [e.target.name]: e.target.value });
    }
    const handleApplication = async (e) => {
        e.preventDefault();
        const response = await applyCase(CaseCredentials.cdescription, CaseCredentials.clastdate, CaseCredentials.camountreq, CaseCredentials.caccountno, CaseCredentials.caccounttitle);
        showAlert(response, "success");
        setCaseCredentials({ cdescription: "", clastdate: "", camountreq: "", caccountno: "", caccounttitle: "" });

        
    }

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-10 mx-auto">

                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="text-center font-bold text-4xl py-2 text-black">
                        Case Application Form
                    </h1> 

                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Case Application does not guarantee case approval.
                        Remember Your information will be hided and all your collected donations will reach you before specified date.
                    </p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="w-full">
                        <div className="relative">
                            <label
                                htmlFor="message"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Write Description of your case here
                            </label>
                            <textarea
                                id="message"
                                name="cdescription"
                                value={CaseCredentials.cdescription}
                                onChange={onChange}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                defaultValue={""}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="caccounttitle"
                                    value={CaseCredentials.caccounttitle}
                                    onChange={onChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                    Account No.
                                </label>
                                <input
                                    type='number'

                                    name="caccountno"
                                    value={CaseCredentials.caccountno}
                                    onChange={onChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                    Amount Required
                                </label>
                                <input
                                    type='number'
                                    id="name"
                                    name="camountreq"
                                    value={CaseCredentials.camountreq}
                                    onChange={onChange}

                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                    Last Date
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder='dd-mm-yyyy'
                                    name="clastdate"
                                    value={CaseCredentials.clastdate}
                                    onChange={onChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full flex justify-center">
                            <div className="btn btn-primary py-2 " onClick={handleApplication}>Apply For the Case</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
};

export default ApplyCaseForm;
