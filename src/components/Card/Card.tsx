import "./card.css";

interface CardProps {
  title: string;
  content: string;
  date: string;
}
const Card: React.FC<CardProps> = ({ title, content, date }) => {
  return (
    <div className="card">
      <div className="row">
        <img src="" alt="image" />
      </div>
      <p>{date}</p>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;
