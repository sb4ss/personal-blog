import "./succes.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

interface SuccesProps {
  data: string;
}
const Succes: React.FC<SuccesProps> = ({ data }) => {
  return (
    <div className="succes">
      <MdOutlineTipsAndUpdates />
      <h3>{data}</h3>
    </div>
  );
};
export default Succes;
