import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import RequestLeaveForm from "./RequestLeaveForm";
import TimeClock from "./TimeClock";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  addDays,
  format,
  getDay,
  differenceInCalendarDays,
} from "date-fns";
import "./EmployeeDashboard.css";
import "./PaySlip.css";

const EmployeeDashboard = () => {
  const { loggedInUser } = useAuth();
  const [user, setUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [daysOff, setDaysOff] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [onDutyWorkers, setOnDutyWorkers] = useState([]);
  const [paySlips, setPaySlips] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const scrollingContainerRef = useRef(null);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
      const storedRequests =
        JSON.parse(localStorage.getItem("leaveRequests")) || [];
      const userRequests = storedRequests.filter(
        (request) => request.employee === loggedInUser.email
      );
      setLeaveRequests(userRequests);

      const offDays = [];
      userRequests.forEach((request) => {
        if (request.status === "Approved") {
          let currentDate = new Date(request.startDate);
          const endDate = new Date(request.endDate);
          while (currentDate <= endDate) {
            offDays.push(format(currentDate, "yyyy-MM-dd"));
            currentDate = addDays(currentDate, 1);
          }
        }
      });
      setDaysOff(offDays);

      const storedPaySlips = JSON.parse(localStorage.getItem("paySlips")) || [];
      const userPaySlips = storedPaySlips.filter(
        (paySlip) => paySlip.email === loggedInUser.email
      );
      setPaySlips(userPaySlips);

      const storedNotifications =
        JSON.parse(localStorage.getItem("notifications")) || [];
      const userNotifications = storedNotifications.filter(
        (notification) =>
          notification.recipients.includes(loggedInUser.email) &&
          !notification.readBy.includes(loggedInUser.email)
      );
      setNotifications(userNotifications);

      const fetchOnDutyWorkers = () => {
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const onDutyEmails =
          JSON.parse(localStorage.getItem("onDutyWorkers")) || [];
        const onDuty = allUsers.filter((user) =>
          onDutyEmails.includes(user.email)
        );
        const onDutyExcludingSelf = onDuty.filter(
          (worker) => worker.email !== loggedInUser.email
        );
        setOnDutyWorkers(onDutyExcludingSelf);
      };

      fetchOnDutyWorkers();
    }
  }, [loggedInUser]);

  useEffect(() => {
    const today = new Date();
    setCurrentMonth(startOfMonth(today));
    const daysFromStart = differenceInCalendarDays(today, startOfMonth(today));

    setTimeout(() => {
      if (scrollingContainerRef.current) {
        const todayElement =
          scrollingContainerRef.current.children[daysFromStart];
        if (todayElement) {
          scrollingContainerRef.current.scrollLeft = todayElement.offsetLeft;
        }
      }
    }, 0);
  }, []);

  const scrollToStartOfMonth = () => {
    setTimeout(() => {
      if (scrollingContainerRef.current) {
        scrollingContainerRef.current.scrollLeft = 0;
      }
    }, 0);
  };

  const handleAcknowledge = (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
    const allNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    const notificationIndex = allNotifications.findIndex(
      (notification) => notification.id === notificationId
    );
    if (notificationIndex !== -1) {
      allNotifications[notificationIndex].readBy.push(loggedInUser.email);
    }
    localStorage.setItem("notifications", JSON.stringify(allNotifications));
  };

  const handleRequestSubmit = (request) => {
    const newRequest = { ...request, employee: user.email };
    const storedRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const updatedRequests = [...storedRequests, newRequest];

    const uniqueRequests = updatedRequests.filter(
      (req, index, self) =>
        index ===
        self.findIndex(
          (r) =>
            r.startDate === req.startDate &&
            r.endDate === req.endDate &&
            r.employee === req.employee &&
            r.reason === req.reason &&
            r.status === req.status
        )
    );

    localStorage.setItem("leaveRequests", JSON.stringify(uniqueRequests));
    setLeaveRequests(
      uniqueRequests.filter((request) => request.employee === user.email)
    );
    updateDaysOff(
      uniqueRequests.filter(
        (request) =>
          request.employee === user.email && request.status === "Approved"
      )
    );

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const updateDaysOff = (requests) => {
    const offDays = [];
    requests.forEach((request) => {
      if (request.status === "Approved") {
        let currentDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        while (currentDate <= endDate) {
          offDays.push(format(currentDate, "yyyy-MM-dd"));
          currentDate = addDays(currentDate, 1);
        }
      }
    });
    setDaysOff(offDays);
  };

  const renderMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const dateFormat = "d";
    const daysArray = [];
    const today = new Date();

    let day = monthStart;

    while (day <= monthEnd) {
      const date = format(day, "yyyy-MM-dd");
      const dayOfWeek = format(day, "EEEE");
      const isOffDay = daysOff.includes(date) || getDay(day) === 0;
      const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

      daysArray.push(
        <div
          key={date}
          className={`day-card ${isOffDay ? "free" : "occupied"} ${
            isToday ? "highlight-today" : ""
          }`}
        >
          <span>{dayOfWeek}</span>
          <span>{format(day, dateFormat)}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    return daysArray;
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const next = addMonths(prevMonth, 1);
      scrollToStartOfMonth();
      return next;
    });
  };

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const prev = subMonths(prevMonth, 1);
      scrollToStartOfMonth();
      return prev;
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-employee">
      <div className="header">
        <div className="header-container">
          <h1>Home</h1>
          <div
            className="bell-icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {notifications.length > 0 && (
              <div className="notification-dot"></div>
            )}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="card">
          <h2>Summary</h2>
          {user && (
            <div>
              <div className="grid">
                <div className="summary-item">
                  <span>Name:</span>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="summary-item">
                  <span>Role:</span>
                  <span>{user.role}</span>
                </div>
                <div className="summary-item">
                  <span>Hours Worked:</span>
                  <span>{user.hoursWorked}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <TimeClock />
        <div className="calendar-nav">
          <button className="nav-button" onClick={prevMonth}>
            Prev
          </button>
          <h2>{format(currentMonth, "MMMM yyyy")}</h2>
          <button className="nav-button" onClick={nextMonth}>
            Next
          </button>
        </div>
        <div className="scrolling-container" ref={scrollingContainerRef}>
          {renderMonth()}
        </div>
        <div className="card on-duty-workers">
          <h3>On Duty Workers</h3>
          <ul>
            {onDutyWorkers.map((worker) => (
              <li key={worker.email}>
                {worker.firstName} {worker.lastName} - Clocked in at:{" "}
                {new Date(
                  localStorage.getItem(`${worker.email}-startTime`)
                ).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="card request-leave">
          <h3>Request Leave</h3>
          <RequestLeaveForm onSubmit={handleRequestSubmit} />
        </div>
        <div className="card my-leave-requests">
          <h3>My Leave Requests</h3>
          <ul>
            {leaveRequests.map((request, index) => (
              <li key={index}>
                {request.leaveType} from {request.startDate} to{" "}
                {request.endDate} - {request.status}
                <br />
                Reason: {request.reason}
              </li>
            ))}
          </ul>
        </div>
        <div className="card pay-slip-container">
          <h3>My Pay Slips</h3>
          <div>
            {paySlips.length > 0 ? (
              <ul>
                {paySlips.map((paySlip, index) => (
                  <li key={index} className="pay-slip-item">
                    <span>
                      {paySlip.month} {paySlip.year}
                    </span>
                    <span> Amount: ${paySlip.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pay slips available.</p>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <p>Your request has been sent!</p>
        </div>
      )}
      {showNotifications && (
        <div className="notifications">
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <button
                    className="confirm-button"
                    onClick={() => handleAcknowledge(notification.id)}
                  >
                    Confirm
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      )}
      <div className="footer">
        <a href="#">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="#">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </a>
        <a href="/settings">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
