import "./card.css";
import { Link } from "react-router-dom";
interface CardProps {
  title: string;
  content: string;
  date: string;
  img: string;
  url: string;
}
const Card: React.FC<CardProps> = ({ title, content, date, img, url }) => {
  return (
    <Link className="card" to={`/${url}`}>
      <div className="row">
        <img src={img} alt="image" />
      </div>
      <div className="row2">
        <p>{date}</p>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </Link>
  );
};

export default Card;
