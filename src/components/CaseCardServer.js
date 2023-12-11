import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import alertContext from '../context/alertContext/AlertContext';

export default function CaseCardServer(props) {
  const { application } = props;
  const context = useContext(serverCaseContext);
  const context2 = useContext(alertContext);
  const { approveCase } = context;
  const { showAlert } = context2
  const { nameCase, setnameCase } = useState("");
  const onChange = (e) => {
    setnameCase({ ...nameCase, [e.target.name]: e.target.value });
  }

  const handleClick = async (cno) => {
    // const response = await approveCase(cno);
    // showAlert(response, "success");
    console.log(nameCase)
  }


  return (
    <>
      {/* Modal */}
      <div className="modal fade" id={`add-comment__${application.cno}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{application.cdescription}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
              {/* Additional footer content goes here */}
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id={`confirmcase__${application.cno}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Approving Case</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor={`caseNameInput_${application.cno}`} className="form-label">Case Name:</label>
                <input type="text" className="form-control" name={nameCase} onChange={onChange} />
              </div>
            </div>
            <div className="modal-footer">
              {/* Save and Close buttons */}
              <button className="btn btn-primary" onClick={() => handleClick(application.cno)} data-bs-dismiss="modal">Save</button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>




      <div className="p-4">
        <div className="max-w-md rounded overflow-hidden shadow-lg border-2 border-gray-300">
          <div className="px-6 py-4">
            <div className="font-semibold text-lg mb-2 text-red-900">By: {application.uname}</div>
            <p className="py-2 text-base font-semibold">Apply Date: {application.capplydate.slice(0, 10)}</p>
            <div className="font-semibold text-lg mb-2">Amount Requested: PKR {application.camountreq}</div>
            <p className="text-gray-700 text-base">
              {application.cdescription.slice(0, 100)}
            </p>
            <div className="btn-primary btn mt-4" data-bs-toggle="modal" data-bs-target={`#add-comment__${application.cno}`}  >Read More</div>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <div className="text-base font-semibold text-red-500">Last Date: {application.clastdate.slice(0, 10)}</div>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                data-bs-toggle="modal" data-bs-target={`#confirmcase__${application.cno}`}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
