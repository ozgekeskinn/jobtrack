// Bütün sayfaların ortak düzeni
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

import initialApplications from "../data/initialApplications.js";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "jobtrack-applications-v1";

export default function MainLayout(){
    const [applications, setApplications] = useState(() => {
        const storedApplications = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!storedApplications) {
            return initialApplications;
        }

        try {
            const parsedApplications = JSON.parse(storedApplications);

            return Array.isArray(parsedApplications)
                ? parsedApplications
                : initialApplications;
            } catch {
                return initialApplications;
        }
    });

    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(applications)
        );
    }, [applications])

    function addApplication(applicationData){
        const newApplication = {
            id: crypto.randomUUID(),
            ...applicationData,
            createdAt: new Date().toISOString(),
        };

        setApplications((previousApplications) =>[
            newApplication,
            ...previousApplications,
        ]);
    }

    function deleteApplication(applicationId) {
        setApplications((previousApplications) =>
            previousApplications.filter(
            (application) => application.id !== applicationId
            )
        );
    }

    function updateApplicationStatus(applicationId, newStatus) {
        setApplications((previousApplications) =>
            previousApplications.map((application) => 
                application.id === applicationId
                    ? {
                        ...application,
                        status: newStatus,
                    }
                : application
            )
        );
    }

    function updateApplication(applicationId, updatedApplicationData) {
        setApplications((previousApplications) =>
            previousApplications.map((application) =>
                application.id === applicationId
                    ? {
                        ...application,
                        ...updatedApplicationData,
                        id: application.id,
                    }
                    : application
            )
        );
    }

    return (
        <>
            <Navbar />

            <main className="main-content">
                <Outlet 
                    context={{
                        applications,
                        addApplication,
                        deleteApplication,
                        updateApplicationStatus,
                        updateApplication,
                    }}
                />
            </main>

            <Footer />
        </>
    );
}