import "./card.css";

interface CardProps {
  title: string;
  content: string;
}
const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="card">
      <div className="row">
        <img src="" alt="image" />
      </div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;
