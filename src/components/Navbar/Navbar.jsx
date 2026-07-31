import { NavLink } from "react-router";
import Logo from "../Logo/Logo.jsx";
import "./Navbar.css";

export default function Navbar(){   
    function getNavLinkClass({ isActive }) {
        return isActive 
            ? "navbar__link navbar__link--active"
            : "navbar__link";
    }

    return (
        <header className="navbar">
            <div className="navbar__container">
                <Logo />

                <nav className="navbar__menu" aria-label="Ana menü">
                    <NavLink to="/" end className={getNavLinkClass}>
                        Ana Sayfa
                    </NavLink>

                    <NavLink to="/dashboard" className={getNavLinkClass}>
                        Dashboard
                    </NavLink>

                    <NavLink 
                        to="/applications"
                        end
                        className={getNavLinkClass}
                    >
                        Başvurularım
                    </NavLink>

                    <NavLink
                        to="/applications/add"
                        className={getNavLinkClass}
                    >
                        Başvuru Ekle
                    </NavLink>

                    <NavLink
                        to="/kanban"
                        className={({ isActive }) =>
                            isActive
                            ? "navbar__link navbar__link--active"
                            : "navbar__link"
                        }
                    >
                        Kanban
                    </NavLink>

                    <NavLink to="/statistics" className={getNavLinkClass}>
                        İstatistikler
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}