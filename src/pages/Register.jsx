import Form from "../components/Form"
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"

function Register() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="title">
                <h3>UrbanScore</h3>
            </div>
            <Form route="/api/user/register/" method="register" />
            <div className="login">
                <p>Já possue login?</p>
                <button onClick={() => navigate("/")}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Register