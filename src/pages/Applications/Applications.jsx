import { useState } from "react";
import { Link , useOutletContext } from "react-router";

import applicationStatuses from "../../data/applicationStatuses.js";
import "./Applications.css";

const statusClassNames = {
    Kaydedildi: "applications-status--saved",
    Başvuruldu: "applications-status--applied",
    "İK Görüşmesi": "applications-status--hr",
    "Teknik Mülakat": "applications-status--technical",
    Teklif: "applications-status--offer",
    Reddedildi: "applications-status--rejected",
};

function formatApplicationDate(dateString) {
  if (!dateString) {
    return "-";
  }

  const [year, month, day] = dateString.split("-");

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function Applications() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tümü");
    const [sortOption, setSortOption] = useState("newest");
    const [selectedApplication, setSelectedApplication] = useState(null);

    const { 
        applications,
        deleteApplication, 
    } = useOutletContext();

    console.log(applications);

    const normalizedSearchTerm = searchTerm
        .trim()
        .toLocaleLowerCase("tr-TR");

    const filteredApplications = applications
        .filter((application) => {
            const searchableText =
            `${application.company} ${application.position}`
                .toLocaleLowerCase("tr-TR");

            return searchableText.includes(normalizedSearchTerm);
        })
        .filter((application) => {
            if (statusFilter === "Tümü") {
               return true;
            }

            return application.status === statusFilter;
        });

    const sortedApplications = [...filteredApplications].sort(
        (firstApplication, secondApplication) => {
            if (sortOption === "oldest") {
                return firstApplication.applicationDate.localeCompare(
                    secondApplication.applicationDate
                );
            }

            if (sortOption === "company") {
                return firstApplication.company.localeCompare(
                    secondApplication.company,
                    "tr"
                );
            }

            return secondApplication.applicationDate.localeCompare(
                firstApplication.applicationDate
            );
        }
    );

    const hasApplications = applications.length > 0;
    const hasFilteredApplications = filteredApplications.length > 0;

    function handleDeleteApplication() {
        if (!selectedApplication) {
            return;
        }

        deleteApplication(selectedApplication.id);
        setSelectedApplication(null);
    }

    return (
        <section className="applications-page">
            <div className="applications-page_container">
                <header className="applications-page_header">
                    <div>
                        <h1>Başvurularım</h1>
                        <p>Tüm iş ve staj başvurularını görüntüle.</p>
                    </div>

                    <Link
                        to={"/applications/add"}
                        className="btn applications-page_add-button"
                    >
                        + Yeni Başvuru
                    </Link>
                </header>

                <div className="applications-filters">
                    <div className="applications-filters_search">
                        <label
                            htmlFor="applicationSearch"
                            className="visually-hidden"
                        >
                            Şirket veya pozisyon ara
                        </label>

                        <input
                            type="search"
                            id="applicationSearch"
                            className="form-control"
                            placeholder="Şirket veya pozisyon ara..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>

                    <div className="applications-filters_select">
                        <label
                            htmlFor="statusFilter"
                            className="visually-hidden"
                        >
                            Duruma göre filtrele
                        </label>

                        <select
                            id="statusFilter"
                            className="form-select"
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                        >
                            <option value="Tümü">Durum: Tümü</option>

                            {applicationStatuses.map((status) => (
                                <option key={status} value={status}>
                                Durum: {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="applications-filters_select">
                        <label
                            htmlFor="sortOption"
                            className="visually-hidden"
                        >
                            Başvuruları sırala
                        </label>

                        <select
                            id="sortOption"
                            className="form-select"
                            value={sortOption}
                            onChange={(event) => setSortOption(event.target.value)}
                        >
                            <option value="newest">Sırala: En Yeni</option>
                            <option value="oldest">Sırala: En Eski</option>
                            <option value="company">Sırala: Şirket Adı</option>
                        </select>
                    </div>
                </div>  

                {!hasApplications && (
                    <div className="applications-empty">
                        <h2>Henüz başvuru bulunmuyor.</h2>
                        <p>Yeni bir başvuru ekleyebilirsin.</p>

                        <Link to="/applications/add">
                            İlk Başvurunu Ekle
                        </Link>
                    </div>
                )}

                {hasApplications && !hasFilteredApplications && (
                    <div className="applications-empty">
                        <h2>Sonuç Bulunamadı</h2>
                        <p>Arama ve filtre kriterine uygun başvuru bulunmuyor.</p>
                    </div>
                )}

                {hasFilteredApplications && (
                    <div className="applications-table_wrapper table-responsive">
                        <table className="table applications-table">
                            <thead>
                                <tr>
                                    <th>Şirket</th>
                                    <th>Pozisyon</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sortedApplications.map((application) => (
                                    <tr key={application.id}>
                                        <td>
                                            <div className="applications-company">
                                                <span className="applications-company_logo">
                                                    {application.company.charAt(0).toLocaleUpperCase("tr-TR")}
                                                </span>

                                                <strong>{application.company}</strong>
                                            </div>
                                        </td>

                                        <td>{application.position}</td>
                                        <td>{formatApplicationDate(application.applicationDate)}</td>
                                        
                                        <td>
                                            <span
                                                className={`applications-status ${
                                                statusClassNames[application.status] ?? ""
                                                }`}
                                            >
                                                {application.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="applications-actions">
                                                <Link
                                                    to={`/applications/${application.id}`}
                                                    className="applications-actions_button"
                                                >
                                                    Detay
                                                </Link>

                                                <Link
                                                    to={`/applications/${application.id}/edit`}
                                                    className="applications-actions_button"
                                                >
                                                    Düzenle
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="applications-actions_button applications-actions_button--delete"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#applicationsDeleteModal"
                                                    onClick={() => setSelectedApplication(application)}
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                )} 

                <div
                    className="modal fade"
                    id="applicationsDeleteModal"
                    tabIndex="-1"
                    aria-labelledby="applicationsDeleteModalLabel"
                    aria-hidden="true"
                    >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content applications-delete-modal">
                            <div className="modal-header">
                                <h2
                                    className="modal-title fs-5"
                                    id="applicationsDeleteModalLabel"
                                >
                                Başvuruyu Sil
                                </h2>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Kapat"
                                    onClick={() => setSelectedApplication(null)}
                                />
                            </div>

                            <div className="modal-body">
                                {selectedApplication ? (
                                <p>
                                    <strong>{selectedApplication.company}</strong> şirketindeki{" "}
                                    <strong>{selectedApplication.position}</strong> başvurusunu
                                    silmek istediğine emin misin?
                                </p>
                                ) : (
                                <p>Bu başvuruyu silmek istediğine emin misin?</p>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn applications-delete-modal_cancel"
                                    data-bs-dismiss="modal"
                                    onClick={() => setSelectedApplication(null)}
                                >
                                    Vazgeç
                                </button>

                                <button
                                    type="button"
                                    className="btn applications-delete-modal_confirm"
                                    data-bs-dismiss="modal"
                                    onClick={handleDeleteApplication}
                                >
                                    hasFilteredApplications Başvuruyu Sil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>                             
            </div>
        </section>
    );
}