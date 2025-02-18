import "./error.css";
import { LuInfo } from "react-icons/lu";

interface ErrorProps {
  data: string;
}
const Error: React.FC<ErrorProps> = ({ data }) => {
  return (
    <div className="error">
      <LuInfo />
      <h3>{data}</h3>
    </div>
  );
};
export default Error;
