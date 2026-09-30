function FeatureCard({ icon, title, description }) {
    return (
        <div className="col-md-6 col-lg-3">

            <div className="feature-card h-100">

                <div className="feature-icon">
                    {icon}
                </div>

                <h5>{title}</h5>

                <p>
                    {description}
                </p>

            </div>

        </div>
    );
}

export default FeatureCard;