import React, { useState } from "react";
import Modal from "react-modal";
import "./LeaveRequestsList.css";

Modal.setAppElement("#root");

const LeaveRequestsList = ({ requests, onApprove, onDeny }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState("");

  const openModal = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRequest(null);
    setActionType("");
  };

  const handleConfirm = () => {
    const index = requests.indexOf(selectedRequest);
    if (actionType === "approve") {
      onApprove(index);
    } else if (actionType === "deny") {
      onDeny(index);
    }
    closeModal();
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  );

  return (
    <div className="leave-requests-list">
      <h3>Leave Requests:</h3>
      {pendingRequests.length === 0 ? (
        <p id="notification">The are no new notifications</p>
      ) : (
        <ul>
          {pendingRequests.map((request, index) => (
            <li key={index} className="request-item">
              <div className="request-details">
                <p>
                  <strong>Employee:</strong> {request.employee}
                </p>
                <p>
                  <strong>Leave Type:</strong> {request.leaveType}
                </p>
                <p>
                  <strong>Period:</strong> from {request.startDate} to{" "}
                  {request.endDate}
                </p>
                <p>
                  <strong>Reason:</strong> {request.reason}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>
              </div>
              <div className="buttons">
                <button
                  className="approve-button"
                  onClick={() => openModal(request, "approve")}
                >
                  Approve
                </button>
                <button
                  className="deny-button"
                  onClick={() => openModal(request, "deny")}
                >
                  Deny
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Action"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Confirm {actionType === "approve" ? "Approval" : "Denial"}</h2>
        <p>Are you sure you want to {actionType} this request?</p>
        <div className="modal-buttons">
          <button onClick={handleConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={closeModal} className="cancel-button">
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveRequestsList;