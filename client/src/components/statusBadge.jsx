function StatusBadge({ status }) {

    const statusClass = status
        .toLowerCase()
        .replaceAll(" ", "-");

    return (
        <span className={`status-badge ${statusClass}`}>
            {status}
        </span>
    );
}

export default StatusBadge;