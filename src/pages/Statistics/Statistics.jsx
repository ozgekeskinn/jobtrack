import { useOutletContext } from "react-router";

import applicationStatuses from "../../data/applicationStatuses.js";
import "./Statistics.css";

const statusClassNames = {
  Kaydedildi: "statistics-bar--saved",
  Başvuruldu: "statistics-bar--applied",
  "İK Görüşmesi": "statistics-bar--hr",
  "Teknik Mülakat": "statistics-bar--technical",
  Teklif: "statistics-bar--offer",
  Reddedildi: "statistics-bar--rejected",
};

export default function Statistics() {
  const { applications } = useOutletContext();

  const statisticsData = applicationStatuses.map((status) => {
    const count = applications.filter(
      (application) => application.status === status
    ).length;

    return {
      status,
      count,
    };
  });

  const highestCount = Math.max(
    ...statisticsData.map((item) => item.count),
    1
  );

  return (
    <section className="statistics-page">
      <div className="statistics-page_container">
        <header className="statistics-page_header">
          <h1>İstatistikler</h1>
          <p>Başvuru performansının grafiksel özeti.</p>
        </header>

        <article className="statistics-card">
          <p className="statistics-total">
            Toplam Başvuru:{" "}
            <strong>{applications.length}</strong>
          </p>

          <div className="statistics-list">
            {statisticsData.map(({ status, count }) => {
              const percentage = (count / highestCount) * 100;

              return (
                <div className="statistics-item" key={status}>
                  <span className="statistics-item_label">
                    {status}
                  </span>

                  <div
                    className="statistics-item_track"
                    role="progressbar"
                    aria-label={`${status}: ${count}`}
                    aria-valuemin="0"
                    aria-valuemax={highestCount}
                    aria-valuenow={count}
                  >
                    <div
                      className={`statistics-item_bar ${
                        statusClassNames[status] ?? ""
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <strong className="statistics-item_count">
                    {count}
                  </strong>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}