import "./FeatureCard.css";

export default function FeatureCard({ title, description, icon: Icon}){
    return (
        <article className="feature-card">
            <div className="feature-card_icon">
                <Icon size={19} strokeWidth={2}/>
            </div>

            <h3 className="feature-card_title">{title}</h3>

            <p className="feature-card_description">
                {description}
            </p>
        </article>
    );
}