import "./alert.css";
interface AlertProps {
  data: string;
}
const Alert: React.FC<AlertProps> = ({ data }) => {
  return (
    <div className="alert">
      <h3>{data}</h3>
    </div>
  );
};
export default Alert;
