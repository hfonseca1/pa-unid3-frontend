import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import api from "../api";
import "../styles/Dashboard.css"

function Dashboard() {
    const location = useLocation();
    const [cityData, setCityData] = useState([]);
    const cities = location.state?.cities || [];
    const navigate = useNavigate();
    const fields = [
        { label: "População", key: "population" },
        { label: "Área", key: "area" },
        { label: "Arborização", key: "arborizacao" },
        { label: "Pavimentação", key: "pavimentacao" },
        { label: "Capacidade máx. de carros", key: "cap_max_car" },
        { label: "Capacidade máx. de ônibus", key: "cap_max_cam" },
        { label: "Iluminação pública", key: "iluminacao_pub" },
        { label: "Pontos de ônibus", key: "ponto_onibus" }
    ];

    console.log(cities);

    useEffect(() => {

        const ids = cities.map(city => `ids=${city.id}`).join("&");

        api.get(`/api/cities/compare/?${ids}`)
            .then(res => {
                setCityData(res.data);
            });

    }, []);

    return (
        <div>
            <div className="title">
                <h3>UrbanScore</h3>
            </div>
            <div className="dashboard">
                <button
                    onClick={() => navigate("/search")}
                    className="button-hist"
                >
                    Voltar
                </button>


                {fields.map((field) => (

                    <div key={field.key} style={{ width: "100%", height: 300 }} className="chart-container">

                        <h3>{field.label}</h3>

                        <ResponsiveContainer>

                            <BarChart data={cityData}>

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey={field.key}
                                    fill="#3498db"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default Dashboard