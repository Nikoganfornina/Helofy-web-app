import { useLocation, useNavigate } from "react-router-dom";
import "../styles/adminpage-style.scss";
import logo from "../assets/logo-withoutletter.png";

export const AdminResultPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const status = query.get("status");
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <div className="card">
        <img src={logo} alt="HeloFy Logo" className="logo" />

        {status === "approved" ? (
          <>
            <h1>🎉 Usuario aprobado</h1>
            <p>El registro se completó con éxito.</p>
            <p>El usuario ya puede iniciar sesión en HeloFy.</p>
            <button className="btn" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </>
        ) : (
          <>
            <h1>🚫 Usuario rechazado</h1>
            <p>El registro fue cancelado por un administrador.</p>
            <button className="btn" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </>
        )}

        <div className="footer-note">
          <p>¿Eres administrador y no deberías estar viendo esto?</p>
          <p>
            Escríbenos a <a href="mailto:admin@helofy.es">admin@helofy.es</a>
          </p>
        </div>
      </div>
    </div>
  );
};
