import {
    useParams,
    useOutletContext,
    Link,
    useNavigate,
} from 'react-router';

import applicationStatuses from "../../data/applicationStatuses.js";
import "./ApplicationDetail.css";

export default function ApplicationDetail(){
    const { id } = useParams();
    const { 
        applications,
        deleteApplication, 
        updateApplicationStatus,
    } = useOutletContext();

    const navigate = useNavigate();

    const application = applications.find(
        (currentApplication) => 
            String(currentApplication.id) === String(id)
    );

    if(!application){
        return (
            <section className="application-detail_page">
                <div className="application-detail_container">
                    <h1>Başvuru Bulunamadı.</h1>
                    <p>Aradığınız başvuru silinmiş veya mevcut olmayabilir.</p>

                    <Link to={"/applications"}>
                        Başvurularıma dön
                    </Link>
                </div>
            </section>
        )
    }

    function handleDelete() {
        deleteApplication(application.id);
        navigate("/applications");
    }
    
    function handleStatusChange(e) {
        const newStatus = e.target.value;

        updateApplicationStatus(application.id,newStatus);
    }

    const progressStatuses = [
        "Başvuruldu",
        "İK Görüşmesi",
        "Teknik Mülakat",
        "Teklif",
    ];

    const currentStepIndex = progressStatuses.indexOf(application.status);

    return (
        <section className="application-detail_page">
            <div className="application-detail_container">
                <Link
                    to={"/applications"}
                    className='application-detail_back-link'
                >
                    ← Başvurularıma dön
                </Link>

                <article className="application-detail_card">
                    <header className="application-detail_header">
                        <div className="application-detail_identity">
                            <span className="application-detail_logo">
                                {application.company.charAt(0).toLocaleUpperCase("tr-TR")}
                            </span>

                            <div>
                                <h1>{application.company}</h1>
                                <p>{application.position}</p>
                            </div>
                        </div>

                        <span className="application-detail_badge">
                            {application.status}
                        </span>
                    </header>

                    <div className="application-detail_progress">
                        {progressStatuses.map((status, index) => {
                            const isCompleted = index < currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                            <div
                                key={status}
                                className={`application-detail_step ${
                                    isCompleted ? "application-detail_step--completed" : ""
                                } ${
                                    isCurrent ? "application-detail_step--current" : ""
                                }`}
                            >
                                <div className="application-detail_step-top">
                                    <span className="application-detail_step-circle">
                                        {isCompleted ? "✓" : index + 1}
                                    </span>

                                {index < progressStatuses.length - 1 && (
                                    <span className="application-detail_step-line" />
                                )}
                                </div>

                                <span className="application-detail_step-label">
                                    {status}
                                </span>
                            </div>
                            );
                        })}
                    </div>

                    <div className="application-detail_info">
                        <div className="application-detail_row">
                            <span>Başvuru Tarihi</span>
                            <strong>{application.applicationDate}</strong>
                        </div>

                        <div className="application-detail_row">
                            <span>Durum</span>
                            <strong>{application.status}</strong>
                        </div>

                        <div className="application-detail_row">
                            <span>İlan</span>

                            {application.jobUrl ? (
                                <a
                                    href={application.jobUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    İlana Git →
                                </a>
                            ) : (
                                <span>İlan bağlantısı bulunmuyor.</span>
                            )}
                        </div>

                        <div className="application-detail_notes">
                            <span>Notlar</span>
                            <p>{application.note || "Not eklenmemiş."}</p>
                        </div>

                        <div className="application-detail_actions">
                            <select
                                  className="application-detail_status-select"
                                  value={application.status}
                                  onChange={handleStatusChange}
                                  aria-label="Başvuru durumu"
                            >
                                {applicationStatuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                className="application-detail_delete-button"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteApplicationModal"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </article>

                <div
                    className="modal fade"
                    id="deleteApplicationModal"
                    tabIndex="-1"
                    aria-labelledby="deleteApplicationModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content application-delete-modal">
                            <div className="modal-header">
                                <h2
                                    className="modal-title fs-5"
                                    id="deleteApplicationModalLabel"
                                >
                                    Başvuruyu Sil
                                </h2>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Kapat"
                                />
                            </div>

                            <div className="modal-body">
                                <strong>{application.company}</strong> şirketine ait başvuruyu
                                silmek istediğine emin misin?
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn application-delete-modal_cancel"
                                    data-bs-dismiss="modal"
                                >
                                    Vazgeç
                                </button>

                                <button
                                    type="button"
                                    className="btn application-delete-modal_confirm"
                                    data-bs-dismiss="modal"
                                    onClick={handleDelete}
                                >
                                    Başvuruyu Sil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}