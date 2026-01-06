// import { useState, useEffect } from "react";
// import { useUser } from "../../Contex/UserContex";
import Header from "../../components/Header/Header.jsx";
import MigTable from "../../components/MigTable/MigTable.jsx";

const Dashboard = ({ onLogout, onGoToTasks }) => {
    // const { user } = useUser();
    // const [data, setData] = useState(null);
    return (
        <div id="dashboard-page">
            <Header />
            <MigTable />
        </div>
    );
}

export default Dashboard;