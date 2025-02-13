import "./card.css";
function renderCard(title: string, content: string) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default renderCard;
