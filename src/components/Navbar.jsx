import { FaUserCircle } from "react-icons/fa";
// import Calendar from "react-calendar";
// import { useState } from "react";

export default function Navbar() {
    // const [date, setDate] = useState(new Date());
    return (
        <div id="navbar">
            <div className="navbar-container">
                <FaUserCircle className="reacticon-navbar" />
                <div className="calendar-container">
                    {/* <Calendar onChange={setDate} value={date} /> */}
                </div>
            </div>
        </div>
    );
}