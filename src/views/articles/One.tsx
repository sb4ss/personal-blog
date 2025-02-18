import "../../App.css";
import "../../components/general.css";
import CodeBlock from "../../components/code/CodeBlock";

function One() {
  const exampleCode = `
function sayHello() {
  console.log("Hello, world!");
}
sayHello();
  `;

  return (
    <section className="container">
      <div className="article">
        <h2>Ejemplo de articulo</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          nesciunt vel voluptatem voluptatibus dolore ipsum beatae fugit quos
          saepe dicta cumque quo sed, ea amet aliquid doloremque quis ab. Modi?
        </p>
        <img src="img1.png" alt="" />
        <CodeBlock code={exampleCode} language="javascript" />
      </div>
    </section>
  );
}

export default One;
