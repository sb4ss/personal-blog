import "./content.css";
import Card from "../Card/Card";

function Content() {
  return (
    <div className="content">
      <Card
        title="Sample Title"
        content="Lorem ipsum dolorrem laboriosam magni"
        img="test.webp"
        date="25 dec 2024"
        url="one"
      />

      <Card
        title="two"
        content="Lorem ipsum dolorrem laboriosam magni"
        img="test.webp"
        date="25 dec 2024"
        url="two"
      />
    </div>
  );
}

export default Content;
