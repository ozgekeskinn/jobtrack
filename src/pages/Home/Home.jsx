import { Link } from "react-router";
import "./Home.css";

import homeFeatures from "../../data/homeFeatures";
import FeatureCard from "../../components/FeatureCard/FeatureCard";

export default function Home() {
  const data = [
    {
      id: 1,
      label: "Toplam Başvuru",
      value: 6,
    },
    {
      id: 2,
      label: "Şirket",
      value: 6,
    },
    {
      id: 3,
      label: "Aktif Süreç",
      value: 5,
    },
  ]
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot"></span>
            İŞ & STAJ BAŞVURU TAKİBİ
          </p>

          <h1 className="hero__title">
            İş arama sürecini
            <span>kontrol altına al.</span>
          </h1>

          <p className="hero__description">
            Başvurularını tek yerden takip et, mülakatlarını planla,
            kariyer sürecini yönet.
          </p>

          <div className="hero__actions">
            <Link
              to="/applications/add"
              className="hero__button hero__button--primary"
            >
              Başlamaya Başla →
            </Link>

            <Link
              to="/applications"
              className="hero__button hero__button--secondary"
            >
              Başvurularımı Gör
            </Link>
          </div>

          <div className="terminal-card">
            <div className="terminal-card__header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="terminal-card__content">
              <p>$ jobtrack --özet</p>
              <p>
                Toplam Başvuru <strong>6</strong>
              </p>
              <p>
                Mülakat <strong>3</strong>
              </p>
              <p>
                Teklif <strong>0</strong>
              </p>
              <p>
                Reddedildi <strong>1</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats_container">
          {
            data.map((item) => (
              <div className="stats_item" key={item.id}>
                <span className="stats_value">{item.value}</span>
                <span className="stats_label">{item.label}</span>
              </div>
            ))
          }
        </div>
      </section>

      <section className="features">
        <div className="features_container">
          <div className="features_grid">
            {homeFeatures.map((item) => (
                <FeatureCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}