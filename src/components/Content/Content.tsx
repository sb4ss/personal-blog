import "./content.css";
import Card from "../Card/Card";

function Content() {
  return (
    <div className="content">
      <Card
        title="React Router con animaciones"
        content="La forma más facil de añadir transisiones a tu aplicación React"
        img="test.webp"
        date="23 feb 2025"
        url="article-react-router-animaciones"
      />
    </div>
  );
}

export default Content;
