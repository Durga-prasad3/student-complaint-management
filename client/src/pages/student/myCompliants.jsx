import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiSearch,
    FiEye,
    FiFilter,
    FiX
} from "react-icons/fi";

import StatusBadge from "../../components/statusBadge";
import { DEFAULT_COMPLAINTS, getComplaints } from "../../utils/complaints";

function MyComplaints() {

    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        setComplaints(getComplaints());
    }, []);

    const list = complaints.length ? complaints : DEFAULT_COMPLAINTS;


    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");


    const filteredComplaints = list.filter((complaint) => {

        const matchesSearch =
            complaint.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            complaint.id
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "" ||
            complaint.category === category;

        const matchesPriority =
            priority === "" ||
            complaint.priority === priority;

        const matchesStatus =
            status === "" ||
            complaint.status === status;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPriority &&
            matchesStatus
        );
    });


    const clearFilters = () => {
        setSearch("");
        setCategory("");
        setPriority("");
        setStatus("");
    };


    return (
        <div>

            <div className="page-heading">

                <div>
                    <h2>My Complaints</h2>

                    <p>
                        View and track all your submitted complaints.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/student/submit")
                    }
                >
                    + New Complaint
                </button>

            </div>


            <div className="filter-card">

                <div className="filter-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search by complaint ID or title..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <div className="filter-selects">

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >
                        <option value="">
                            All Categories
                        </option>

                        <option value="Wi-Fi / Internet">
                            Wi-Fi / Internet
                        </option>

                        <option value="Water Supply">
                            Water Supply
                        </option>

                        <option value="Electrical">
                            Electrical
                        </option>

                        <option value="Cleanliness">
                            Cleanliness
                        </option>

                        <option value="Transport">
                            Transport
                        </option>

                    </select>


                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option value="">
                            All Priorities
                        </option>

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Critical">
                            Critical
                        </option>

                    </select>


                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option value="Submitted">
                            Submitted
                        </option>

                        <option value="Under Review">
                            Under Review
                        </option>

                        <option value="Assigned">
                            Assigned
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                        <option value="Closed">
                            Closed
                        </option>

                    </select>


                    {(search || category || priority || status) && (

                        <button
                            className="clear-filter-button"
                            onClick={clearFilters}
                        >
                            <FiX />
                            Clear
                        </button>

                    )}

                </div>

            </div>


            <div className="complaints-list-card">

                <div className="list-header">

                    <div>
                        <h3>
                            Complaints
                        </h3>

                        <p>
                            {filteredComplaints.length} complaints found
                        </p>
                    </div>

                    <div className="filter-label">
                        <FiFilter />
                        Filters
                    </div>

                </div>


                {filteredComplaints.length > 0 ? (

                    <div className="complaints-table-wrapper">

                        <table className="complaints-table">

                            <thead>

                                <tr>
                                    <th>Complaint</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {filteredComplaints.map(
                                    (complaint) => (

                                        <tr key={complaint.id}>

                                            <td>

                                                <div className="complaint-title-cell">

                                                    <strong>
                                                        {complaint.title}
                                                    </strong>

                                                    <span>
                                                        {complaint.id}
                                                    </span>

                                                </div>

                                            </td>


                                            <td>
                                                {complaint.category}
                                            </td>


                                            <td>
                                                {complaint.date}
                                            </td>


                                            <td>

                                                <span
                                                    className={`priority-badge ${complaint.priority.toLowerCase()}`}
                                                >
                                                    {complaint.priority}
                                                </span>

                                            </td>


                                            <td>

                                                <StatusBadge
                                                    status={complaint.status}
                                                />

                                            </td>


                                            <td>

                                                <button
                                                    className="view-button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/student/complaints/${complaint.id}`
                                                        )
                                                    }
                                                >
                                                    <FiEye />
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="empty-complaints">

                        <div className="empty-icon">
                            📂
                        </div>

                        <h3>
                            No complaints found
                        </h3>

                        <p>
                            Try changing your search or filters.
                        </p>

                        <button
                            className="clear-filter-button"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyComplaints;