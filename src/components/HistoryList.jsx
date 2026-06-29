import "../styles/HistoryList.css"

function HistoryList({ hist, onDelete }) {
    return (
        <div className="hist-container">
            <p className="note-title">{hist.city_name}</p>

            <button
                className="delete-button"
                onClick={() => onDelete(hist.id)}
            >
                Deletar
            </button>
        </div>
    );
}

export default HistoryList;