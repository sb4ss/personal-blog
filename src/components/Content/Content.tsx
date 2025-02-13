import "./content.css";
import Card from "../Card/Card";

function Content() {
  return (
    <div className="content">
      <Card
        title="Sample Title"
        content="Lorem ipsum dolorrem laboriosam magni.
"
        date="25 dec 2024"
      />
    </div>
  );
}

export default Content;
