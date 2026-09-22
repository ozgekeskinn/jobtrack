export default function DashboardStatCard({
  label,
  count,
  icon: Icon,
  tone,
}) {
  return (
    <article
      className={`card dashboard-stat-card dashboard-stat-card--${tone}`}
    >
      <div className="card-body">
        <div className="dashboard-stat-card_top">
          <strong>{count}</strong>

          <span className="dashboard-stat-card_icon">
            <Icon size={18} strokeWidth={2.2} />
          </span>
        </div>

        <p>{label}</p>
      </div>
    </article>
  );
}