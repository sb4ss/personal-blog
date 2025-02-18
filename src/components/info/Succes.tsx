import "./succes.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

interface AlertProps {
  data: string;
}
const Succes: React.FC<AlertProps> = ({ data }) => {
  return (
    <div className="succes">
      <MdOutlineTipsAndUpdates />
      <h3>{data}</h3>
    </div>
  );
};
export default Succes;
