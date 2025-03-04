import "./alert.css";
import { LuInfo } from "react-icons/lu";

interface AlertProps {
  data: string;
}
const Alert: React.FC<AlertProps> = ({ data }) => {
  return (
    <div className="alert">
      <LuInfo />
      <h3>{data}</h3>
    </div>
  );
};
export default Alert;
