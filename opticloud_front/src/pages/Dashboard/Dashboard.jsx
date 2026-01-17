import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import MigTable from "../../components/MigTable/MigTable.jsx";
import MainTitle from "../../components/MainTitle/MainTitle.jsx";
import FileUpload from "../../components/FileUpload/FileUpload.jsx";
import "./Dashboard.css";

const Dashboard = ({ onLogout, onGoToTasks }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleUploadSuccess = () => {
        // Trigger refresh of file list
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div id="dashboard">
            <Header />
            <div id="dashboard-wrapper">
                <MainTitle title="Dashboard" />
                <FileUpload onUploadSuccess={handleUploadSuccess} />
                <MigTable refreshTrigger={refreshKey} />
            </div>
        </div>
    );
}

export default Dashboard;