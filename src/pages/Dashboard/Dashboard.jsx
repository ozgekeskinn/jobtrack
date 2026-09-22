import {
  BadgeCheck,
  Bookmark,
  BriefcaseBusiness,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

import {
  Link,
  useOutletContext,
} from "react-router";

import DashboardStatCard from "./DashboardStatCard.jsx";
import "./Dashboard.css";

const statusClassNames = {
  Kaydedildi: "dashboard-status--saved",
  Başvuruldu: "dashboard-status--applied",
  "İK Görüşmesi": "dashboard-status--interview",
  "Teknik Mülakat": "dashboard-status--technical",
  Teklif: "dashboard-status--offer",
  Reddedildi: "dashboard-status--rejected",
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

export default function Dashboard() {
  const { applications } = useOutletContext();
  const totalApplications = applications.length;

  const savedCount = applications.filter(
    (application) => application.status === "Kaydedildi"
  ).length;

  const appliedCount = applications.filter(
    (application) => application.status === "Başvuruldu"
  ).length;

  const interviewCount = applications.filter(
    (application) =>
      application.status === "İK Görüşmesi" ||
      application.status === "Teknik Mülakat"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Teklif"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Reddedildi"
  ).length;

  const recentApplications = [...applications]
    .sort((firstApplication, secondApplication) =>
      secondApplication.applicationDate.localeCompare(
        firstApplication.applicationDate
      )
    )
    .slice(0, 5);

  const dashboardStats = [
    {
      label: "Toplam Başvuru",
      count: totalApplications,
      icon: BriefcaseBusiness,
      tone: "total",
    },
    {
      label: "Kaydedildi",
      count: savedCount,
      icon: Bookmark,
      tone: "saved",
    },
    {
      label: "Başvuruldu",
      count: appliedCount,
      icon: Send,
      tone: "applied",
    },
    {
      label: "Mülakat",
      count: interviewCount,
      icon: MessageSquare,
      tone: "interview",
    },
    {
      label: "Teklif",
      count: offerCount,
      icon: BadgeCheck,
      tone: "offer",
    },
    {
      label: "Reddedildi",
      count: rejectedCount,
      icon: X,
      tone: "rejected",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-page_container">
        <header className="dashboard-page_header">
          <div>
            <h1>Dashboard</h1>
            <p>Başvuru sürecinin genel özeti.</p>
          </div>

          <Link
            to="/applications/add"
            className="btn dashboard-page_add-button"
          >
            + Yeni Başvuru
          </Link>
        </header>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-6 g-3 dashboard-stats">
          {dashboardStats.map((stat) => (
            <div className="col" key={stat.label}>
              <DashboardStatCard
                label={stat.label}
                count={stat.count}
                icon={stat.icon}
                tone={stat.tone}
              />
            </div>
          ))}
        </div>

        <section className="dashboard-recent">
          <h2>Son Başvurular</h2>

          {recentApplications.length > 0 ? (
            <div className="dashboard-recent_list">
              {recentApplications.map((application, index) => (
                <Link
                  key={application.id}
                  to={`/applications/${application.id}`}
                  className="dashboard-recent_item"
                >
                  <div className="dashboard-recent_identity">
                    <span
                      className={`dashboard-recent_logo dashboard-recent_logo--${
                        index % 5
                      }`}
                    >
                      {application.company
                        .charAt(0)
                        .toLocaleUpperCase("tr-TR")}
                    </span>

                    <div>
                      <h3>{application.company}</h3>

                      <p>
                        {application.position}
                        <span aria-hidden="true"> · </span>
                        {formatApplicationDate(
                          application.applicationDate
                        )}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`dashboard-status ${
                      statusClassNames[application.status] ?? ""
                    }`}
                  >
                    {application.status}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <h3>Henüz başvuru bulunmuyor</h3>
              <p>Yeni bir başvuru ekleyerek takip etmeye başlayabilirsin.</p>

              <Link
                to="/applications/add"
                className="btn dashboard-page_add-button"
              >
                İlk Başvurunu Ekle
              </Link>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}