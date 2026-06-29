import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import HistoryList from "../components/HistoryList";
import "../styles/History.css"

function History() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    const getNotes = () => {
        api.get("/api/history/")
            .then((res) => setHistory(res.data))
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getNotes();
    }, []);

    const deleteHist = (id) => {
        api.delete(`/api/history/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Deleted!");
                } else {
                    alert("Failed");
                }
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div className="title">
                <h3>UrbanScore</h3>
            </div>
            {history.map((hist) => (
                <HistoryList
                    key={hist.id}
                    hist={hist}
                    onDelete={deleteHist}
                />
            ))}
            <div className="button-hist-container">
                <button onClick={() => navigate("/search")} className="button-hist">
                    Voltar
                </button>
            </div>
        </div>
    );
}

export default History;