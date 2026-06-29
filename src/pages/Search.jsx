import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Search.css"

function Search() {
    const [cities, setCities] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCities, setSelectedCities] = useState([]);
    const navigate = useNavigate();

    async function handleCompare() {

        try {

            await Promise.all(
                selectedCities.map((city) => {

                    console.log("cidade enviada:", city);

                    return api.post("api/history/create/", {
                        city: city.id,
                    });

                })
            );

            navigate("/search/dashboard", {
                state: {
                    cities: selectedCities
                }
            });

        } catch (error) {
            alert(error);
        }
    }

    const getCities = () => {
        api.get("api/cities/")
            .then((res) => {
                console.log(res.data)
                setCities(res.data);
            })
            .catch((err) => alert(err));

    };

    useEffect(() => {
        getCities();
    }, []);


    const filteredCities = search
        ? cities.filter((city) =>
            city.name.toLowerCase().includes(search.toLowerCase())
        )
        : [];


    function addCity(city) {
        if (!selectedCities.includes(city)) {
            setSelectedCities([
                ...selectedCities,
                city
            ]);
        }
    }

    function removeCity(city) {
        setSelectedCities(
            selectedCities.filter(
                item => item !== city
            )
        );
    }


    return (
        <div>
            <div className="title">
                <h3>UrbanScore</h3>
            </div>

            <input
                placeholder="Pesquise uma cidade"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />


            <div>
                {filteredCities.map((city) => (
                    <button
                        key={city.name}
                        onClick={() => addCity(city)}
                    >
                        {city.name}
                    </button>
                ))}
            </div>


            <h3>Cidades escolhidas:</h3>
            <div className="selected-city">
                {
                    selectedCities.map(city => (
                        <div key={city.id}>
                            {city.name}
                            <button onClick={() => removeCity(city)}>
                                X
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className="main-actions">
                <button onClick={handleCompare}>
                    Comparar
                </button>
                <button onClick={() => navigate("/history")}>
                    Ver histórico
                </button>
            </div>
        </div>
    );
}

export default Search;