import { Link } from "react-router";
import { ExternalLink } from "lucide-react";

import Logo from "../Logo/Logo.jsx";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_content">
          <div className="footer_brand">
            <Logo />

            <p className="footer_description">
              İş ve staj başvurularını tek bir yerde kaydet, takip et ve
              kariyer sürecini daha düzenli yönet.
            </p>
          </div>

          <div className="footer_column">
            <h2 className="footer_title">Hızlı Bağlantılar</h2>

            <nav className="footer_links" aria-label="Footer menüsü">
              <Link to="/" className="footer_link">
                Ana Sayfa
              </Link>

              <Link to="/dashboard" className="footer_link">
                Dashboard
              </Link>

              <Link to="/applications" className="footer_link">
                Başvurularım
              </Link>

              <Link to="/applications/add" className="footer_link">
                Başvuru Ekle
              </Link>

              <Link to="/statistics" className="footer_link">
                İstatistikler
              </Link>
            </nav>
          </div>

          <div className="footer_column">
            <h2 className="footer_title">İş Fırsatları</h2>

            <div className="footer_links">
              <a
                href="https://tr.linkedin.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="footer_link footer_external-link"
              >
                LinkedIn Jobs
                <ExternalLink size={15} aria-hidden="true" />
              </a>

              <a
                href="https://www.kariyer.net/is-ilanlari/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer_link footer_external-link"
              >
                Kariyer.net
                <ExternalLink size={15} aria-hidden="true" />
              </a>

              <a
                href="https://tr.indeed.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer_link footer_external-link"
              >
                Indeed
                <ExternalLink size={15} aria-hidden="true" />
              </a>

              <a
                href="https://acikisharita.iskur.gov.tr/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer_link footer_external-link"
              >
                İŞKUR
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <p>© {currentYear} JobTrack. Tüm hakları saklıdır.</p>

          <p>
            İş arama sürecini düzenli yönetmek amacıyla geliştirilen bağımsız
            bir portfolyo projesidir.
          </p>
        </div>
      </div>
    </footer>
  );
}