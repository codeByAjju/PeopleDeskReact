import { useState } from "react";
import {
  AppstoreOutlined as FaTh,
  MenuOutlined as FaBars,
  UserOutlined as FaUserAlt,
  MessageOutlined as FaCommentAlt,
  ProjectOutlined as FaBriefcase,
  CaretDownOutlined as FaCaretDown,
  CaretRightOutlined as FaCaretRight,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleHR, setToggleHR] = useState(false);
  const [toggelWork, setToggelWork] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleToggleWork = () => {
    setToggelWork((prevToggleWork) => !prevToggleWork);
  };

  const handleToggleHR = () => {
    setToggleHR((prevToggleHR) => !prevToggleHR);
  };

  return (
    <div className="" style={{ display: "flex" }}>
      <div
        style={{ position: "fixed", width: isOpen ? "200px" : "50px" }}
        className="sidebar"
      >
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            TIME
          </h1>
          <div style={{ marginLeft: isOpen ? "80px" : "0px" }} className="bars">
            <FaBars onClick={toggle} className="cursor" />
          </div>
        </div>

        <NavLink to="/" className="link" activeClassName="active">
          <div className="icon">
            <FaTh />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Dashboard
          </div>
        </NavLink>

        {/* HR */}
        <div className="link">
          <div className="icon">
            <FaUserAlt className="cursor" />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none", cursor: "pointer " }}
            className="link_text"
            onClick={handleToggleHR}
          >
            HR
          </div>
          <span>
            {!toggleHR ? (
              <FaCaretRight
                className="mt-2"
                onClick={handleToggleHR}
                style={{
                  display: isOpen ? "block" : "none",
                  marginLeft: "70px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FaCaretDown
                className="mt-2"
                onClick={handleToggleHR}
                style={{ marginLeft: "70px", cursor: "pointer" }}
              />
            )}
          </span>
        </div>
        <div>
          {toggleHR && (
            <>
              <NavLink to="/leaves" className="link" activeClassName="active">
                <div className="icon">&bull;</div>
                Leaves
              </NavLink>
              <NavLink
                to="/attendance"
                className="link"
                activeClassName="active"
              >
                <div className="icon">&bull;</div>
                Attendance
              </NavLink>
              <NavLink to="/holiday" className="link" activeClassName="active">
                <div className="icon">&bull;</div>
                Holiday
              </NavLink>
              <NavLink
                to="/punch-In-report"
                className="link"
                activeClassName="active"
              >
                <div className="icon">&bull;</div>
                Punch-In Report
              </NavLink>
            </>
          )}
        </div>

        <div className="link cursor" activeClassName="active">
          <div className="icon">
            <FaBriefcase />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
            onClick={handleToggleWork}
          >
            Work
          </div>
          <span>
            {!toggelWork ? (
              <FaCaretRight
                className="mt-2"
                onClick={handleToggleWork}
                style={{
                  display: isOpen ? "block" : "none",
                  marginLeft: "48px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <FaCaretDown
                className="mt-2"
                onClick={handleToggleWork}
                style={{ marginLeft: "48px", cursor: "pointer" }}
              />
            )}
          </span>
        </div>

        {toggelWork && (
          <>
            <NavLink to="/projects" className="link" activeClassName="active">
              <div className="icon">&bull;</div>
              Projects
            </NavLink>
            <NavLink to="/time-logs" className="link" activeClassName="active">
              <div className="icon">&bull;</div>
              Time Logs
            </NavLink>
          </>
        )}

        {/* Messages */}
        <NavLink to="/message" className="link" activeClassName="active">
          <div className="icon">
            <FaCommentAlt />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Messages
          </div>
        </NavLink>
      </div>
      <main
        style={{
          marginLeft: isOpen ? "14.3%" : "3.3%",
          transition: isOpen ? " all 0.5s" : "all 0.5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
