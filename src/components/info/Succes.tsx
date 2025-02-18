import "./succes.css";
import { LuInfo } from "react-icons/lu";

interface AlertProps {
  data: string;
}
const Succes: React.FC<AlertProps> = ({ data }) => {
  return (
    <div className="alert">
      <LuInfo />
      <h3>{data}</h3>
    </div>
  );
};
export default Succes;
