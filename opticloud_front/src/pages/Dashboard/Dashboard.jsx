// import { useState, useEffect } from "react";
// import { useUser } from "../../Contex/UserContex";
import Header from "../../components/Header/Header.jsx";
import MigTable from "../../components/MigTable/MigTable.jsx";
import MainTitle from "../../components/MainTitle/MainTitle.jsx";
import "./Dashboard.css";

const Dashboard = ({ onLogout, onGoToTasks }) => {
    // const { user } = useUser();
    // const [data, setData] = useState(null);
    return (
        <div id="dashboard">
            <Header />
            <div id="dashboard-wrapper">
            <MainTitle title="Dashboard" />
            <MigTable />
            </div>
        </div>
    );
}

export default Dashboard;