import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiUpload,
    FiX,
    FiSend
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { createComplaint } from "../../services/complaints";

function SubmitComplaint() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        priority: "",
        department: ""
    });

    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.title ||
            !form.description ||
            !form.category ||
            !form.location ||
            !form.priority ||
            !form.department
        ) {
            alert("Please fill all required fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            await createComplaint(user, form, image);
            alert("Complaint submitted successfully!");
            navigate("/student/complaints");
        } catch (error) {
            alert(error.message || "Could not submit the complaint.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-page">

            <div className="page-heading">

                <div>
                    <h2>Submit Complaint</h2>

                    <p>
                        Tell us about the issue you are facing.
                    </p>
                </div>

            </div>


            <div className="complaint-form-card">

                <div className="form-header">

                    <h3>Complaint Details</h3>

                    <p>
                        Please provide accurate information so that
                        the issue can be resolved quickly.
                    </p>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Complaint Title *
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Example: Wi-Fi not working in hostel"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description *
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the problem in detail..."
                            rows="5"
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Category *
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select category
                                </option>

                                <option value="Hostel">
                                    Hostel
                                </option>

                                <option value="Academics">
                                    Academics
                                </option>

                                <option value="Transport">
                                    Transport
                                </option>

                                <option value="Infrastructure">
                                    Infrastructure
                                </option>

                                <option value="Electrical">
                                    Electrical
                                </option>

                                <option value="Water Supply">
                                    Water Supply
                                </option>

                                <option value="Wi-Fi / Internet">
                                    Wi-Fi / Internet
                                </option>

                                <option value="Cleanliness">
                                    Cleanliness
                                </option>

                                <option value="Administration">
                                    Administration
                                </option>

                                <option value="Security">
                                    Security
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Location *
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Example: Block A, Room 204"
                            />

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Priority *
                            </label>

                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select priority
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

                        </div>


                        <div className="form-group">

                            <label>
                                Department *
                            </label>

                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select department
                                </option>

                                <option value="IT">
                                    IT Department
                                </option>

                                <option value="Electrical">
                                    Electrical Department
                                </option>

                                <option value="Civil">
                                    Civil / Infrastructure
                                </option>

                                <option value="Hostel">
                                    Hostel Department
                                </option>

                                <option value="Transport">
                                    Transport Department
                                </option>

                                <option value="Administration">
                                    Administration
                                </option>

                                <option value="Security">
                                    Security Department
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Upload Image
                        </label>

                        <label className="upload-box">

                            <FiUpload size={24} />

                            <span>
                                Click to upload an image
                            </span>

                            <small>
                                PNG, JPG or JPEG
                            </small>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={handleImageChange}
                            />

                        </label>


                        {image && (

                            <div className="selected-file">

                                <span>
                                    {image.name}
                                </span>

                                <button
                                    type="button"
                                    onClick={removeImage}
                                >
                                    <FiX />
                                </button>

                            </div>

                        )}

                    </div>


                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                                navigate("/student/dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button submit-button"
                            disabled={isSubmitting}
                        >
                            <FiSend />

                            {isSubmitting ? "Submitting..." : "Submit Complaint"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default SubmitComplaint;