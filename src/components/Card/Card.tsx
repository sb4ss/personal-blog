import "./card.css";

interface CardProps {
  title: string;
  content: string;
  date: string;
  img: string;
  url: string;
}
const Card: React.FC<CardProps> = ({ title, content, date, img, url }) => {
  return (
    <a className="card" href={`${url}`}>
      <div className="row">
        <img src={img} alt="image" />
      </div>
      <div className="row2">
        <p>{date}</p>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </a>
  );
};

export default Card;
