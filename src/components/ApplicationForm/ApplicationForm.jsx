import applicationStatues from "../../data/applicationStatuses";
import "./ApplicationForm.css";

import { useState } from "react";

export default function ApplicationForm({
    onSubmit,
    initialValues,
    submitLabel = "Başvuruyu Kaydet"
}) {
    const today = new Date();

    const currentDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const [formData, setFormData] = useState({
        company: initialValues?.company ?? "",
        position: initialValues?.position ?? "",
        jobUrl: initialValues?.jobUrl ?? "",
        applicationDate:
            initialValues?.applicationDate ?? currentDate,
        status: initialValues?.status ?? "Başvuruldu",
        note: initialValues?.note ?? "",
    });

    function handleChange(e){
        const {name, value} = e.target;

        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form 
            className="application-form" 
            onSubmit={handleSubmit}
        >
            <div className="application-form_row">
                <div className="application-form_group">
                    <label htmlFor="company">Şirket Adı *</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="örn. Trendyol"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="application-form_group">
                    <label htmlFor="position">Pozisyon *</label>

                    <input 
                        type="text"
                        id="position"
                        name="position"
                        placeholder="örn. Frontend Developer Intern"
                        value={formData.position}
                        onChange={handleChange}
                        spellCheck={false}
                        required
                    />
                </div>    
            </div>

            <div className="application-form_group">
                <label htmlFor="jobUrl">İlan Linki</label>

                <input 
                    type="url" 
                    id="jobUrl"
                    name="jobUrl"
                    placeholder="https://..."   
                    value={formData.jobUrl}
                    onChange={handleChange} 
                />
            </div>

            <div className="application-form_row">
                <div className="application-form_group">
                    <label htmlFor="applicationDate">Başvuru Tarihi *</label>

                    <input 
                        type="date" 
                        id="applicationDate"
                        name="applicationDate"
                        defaultValue={currentDate}
                        value={formData.applicationDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="application-form_group">
                    <label htmlFor="status">Başvuru Durumu *</label>
                    <select
                        name="status"
                        id="status"
                        defaultValue="Başvuruldu"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        {applicationStatues.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>          
            </div>

            <div className="application-form_group">
                <label htmlFor="note">Not</label>
                <textarea 
                    id="note"
                    name="note"
                    placeholder="örn. React ve Javascript sorulacak."
                    rows={4}
                    value={formData.note}
                    onChange={handleChange}
                />
            </div>

            <button 
                type="submit" 
                className="btn application-form_submit"
            >
                {submitLabel}
            </button>
        </form>
    );
}