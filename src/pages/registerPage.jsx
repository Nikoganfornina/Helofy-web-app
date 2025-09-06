import { useNavigate } from "react-router-dom";
import "../styles/register-style.scss";
import "../styles/alert-style.scss";
import React, { useState, useEffect, useRef } from "react";
import LoadingOverlay from "../utils/loadingOverlay";
import Alert from "../utils/alert";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);   // <-- sin tipos
  const [loading, setLoading] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const emailRef = useRef(null);  // <-- sin <HTMLInputElement>

  useEffect(() => {
    if (alert) {
      const t = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(t);
    }
  }, [alert]);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    // Validaciones
    if (!email || !password || (!isLogin && (!username || !confirmPassword))) {
      setAlert({ message: "Todos los campos son obligatorios", type: "error" });
      setLoading(false);
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setAlert({ message: "Las contraseñas no coinciden", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const body = isLogin ? { email, password } : { username, email, password };

      const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({ message: data.message || "Credenciales inválidas", type: "error" });
      } else {
        setAlert({
          message: data.message || (isLogin ? "Sesión iniciada" : "Usuario creado"),
          type: "success",
        });
        if (!isLogin) {
          setIsLogin(true);
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      console.error(err);
      setAlert({ message: "Error conectando con el servidor", type: "error" });
    } finally {
      setLoading(false);
    }
  };

 return (
   <div className="safe-screen">
     <div className="register-page">
       <LoadingOverlay
         visible={loading}
         message={isLogin ? "Iniciando sesión..." : "Registrando usuario..."}
       />

       <h1>{isLogin ? "Login en HeloFy" : "Registro en HeloFy"}</h1>

       <form className="form stack-12" onSubmit={handleSubmit} noValidate>
         {!isLogin && (
           <label className="input-group">
             <span>Usuario</span>
             <input
               type="text"
               placeholder="Tu usuario"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               onKeyDown={handleKeyDown}
               autoCapitalize="none"
               autoCorrect="off"
               autoComplete="username"
               enterKeyHint="next"
               required
             />
           </label>
         )}

         <label className="input-group">
           <span>Correo electrónico</span>
           <input
             ref={emailRef}
             type="email"
             placeholder="tucorreo@email.com"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             onKeyDown={handleKeyDown}
             autoCapitalize="none"
             autoCorrect="off"
             autoComplete="email"
             inputMode="email"
             enterKeyHint="next"
             required
           />
         </label>

         <label className="input-group">
           <span>Contraseña</span>
           <input
             type="password"
             placeholder="••••••••"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             onKeyDown={handleKeyDown}
             autoCapitalize="none"
             autoCorrect="off"
             autoComplete={isLogin ? "current-password" : "new-password"}
             enterKeyHint={isLogin ? "go" : "next"}
             required
           />
         </label>

         {!isLogin && (
           <label className="input-group">
             <span>Confirmar contraseña</span>
             <input
               type="password"
               placeholder="••••••••"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               onKeyDown={handleKeyDown}
               autoCapitalize="none"
               autoCorrect="off"
               autoComplete="new-password"
               enterKeyHint="go"
               required
             />
           </label>
         )}

         {capsLockOn && (
           <div className="caps-lock-warning" role="status" aria-live="polite">
             ⚠️ Mayúsculas activadas
           </div>
         )}

         <button className="primary" type="submit" disabled={loading}>
           {isLogin ? "Iniciar sesión" : "Registrarse"}
         </button>
       </form>

       <div className="switch-login">
         {isLogin ? (
           <span>
             ¿No tienes cuenta?{" "}
             <button type="button" onClick={() => setIsLogin(false)} disabled={loading}>
               Créala
             </button>
           </span>
         ) : (
           <span>
             ¿Ya tienes cuenta?{" "}
             <button type="button" onClick={() => setIsLogin(true)} disabled={loading}>
               Inicia sesión
             </button>
           </span>
         )}
       </div>
     </div>

     {alert && (
       <div className={`alert-wrapper ${alert.type}`}>
         <Alert message={alert.message} />
       </div>
     )}

    <div className="footer">
      <p>© 2025 HeloFy. Ser libre es sonar distinto.</p>
    </div>
   </div>
 );



};
