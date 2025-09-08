import { useLocation, useNavigate } from "react-router-dom";
import "../styles/verifypage-style.scss";
import logo from "../assets/logo-withoutletter.png";

export const VerifyEmailPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const status = query.get("status");
  const navigate = useNavigate();

  return (
    <div className="verify-page">
      <div className={`card ${status !== "success" ? "error" : ""}`}>
        <img src={logo} alt="HeloFy Logo" className="logo" />

        {status === "success" ? (
          <>
            <h1>✅ Email confirmado</h1>
            <p>¡Gracias por verificar tu correo en HeloFy!</p>
            <p>Ya puedes iniciar sesión y disfrutar de toda tu música.</p>
            <button className="btn" onClick={() => navigate("/")}>
              Iniciar sesión
            </button>
          </>
        ) : (
          <>
            <h1>❌ Enlace inválido</h1>
            <p>El enlace de verificación no es válido o ya expiró.</p>
            <p>Solicita un nuevo correo de confirmación si lo necesitas.</p>
            <button className="btn" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </>
        )}

        <div className="contact">
          <p>
            ¿Tienes problemas? Escríbenos en{" "}
            <a href="mailto:admin@helofy.es">admin@helofy.es</a>
          </p>
        </div>
      </div>
    </div>
  );
};
