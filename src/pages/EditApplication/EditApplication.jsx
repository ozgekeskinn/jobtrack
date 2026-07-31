import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";

import ApplicationForm from "../../components/ApplicationForm/ApplicationForm.jsx";

import "./EditApplication.css";

export default function EditApplication() {
  const { id } = useParams();

  const {
    applications,
    updateApplication,
  } = useOutletContext();

  const navigate = useNavigate();

  const application = applications.find(
    (currentApplication) =>
      String(currentApplication.id) === String(id)
  );

  if (!application) {
    return (
      <section className="edit-application">
        <div className="edit-application_container">
          <div className="edit-application_not-found">
            <h1>Başvuru bulunamadı</h1>

            <p>
              Düzenlemek istediğin başvuru silinmiş veya mevcut olmayabilir.
            </p>

            <Link to="/applications">
              Başvurularıma dön
            </Link>
          </div>
        </div>
      </section>
    );
  }

  function handleUpdateApplication(formData) {
    updateApplication(application.id, formData);

    navigate(`/applications/${application.id}`);
  }

  return (
    <section className="edit-application">
      <div className="edit-application_container">
        <Link
          to="/applications"
          className="edit-application_back-link"
        >
          ← Başvurularıma dön
        </Link>
        
        <header className="edit-application_header">
          <h1>Başvuruyu Düzenle</h1>

          <p>
            {application.company} başvurusunun bilgilerini güncelle.
          </p>
        </header>

        <ApplicationForm
          initialValues={application}
          submitLabel="Değişiklikleri Kaydet"
          onSubmit={handleUpdateApplication}
        />
      </div>
    </section>
  );
}