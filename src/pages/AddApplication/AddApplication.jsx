import { useNavigate , useOutletContext } from "react-router";

import ApplicationForm from "../../components/ApplicationForm/ApplicationForm.jsx";
import "./AddApplication.css";

export default function AddApplication(){
    const { addApplication } = useOutletContext();
    const navigate = useNavigate();

    function handleAddApplication(formData) {
        addApplication(formData);
        navigate("/applications");
    }

    return (
        <section className="add-application">
            <div className="add-application_container">
                <header className="add-application_header">
                    <h1>Başvuru Ekle</h1>
                    <p>Yeni bir iş veya staj başvurusu kaydet.</p>
                </header>

                <ApplicationForm onSubmit={handleAddApplication}/>
            </div>
        </section>
    )
}