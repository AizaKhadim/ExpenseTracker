import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import '../styles/auth.css';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <input type="name" placeholder="Name"
               value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email"
               value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
               value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
