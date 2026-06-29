import Form from "../components/Form"
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="title">
                <h3>UrbanScore</h3>
            </div>
            <Form route={"/api/token/"} method={"login"} />
            <div className="register">
                <p>Ainda não se registrou?</p>
                <button onClick={() => navigate("/register")}>
                    Registrar
                </button>
            </div>
        </div >)
}

export default Login