import LocationProvider from "./LocationProvider";
import RoutesWithAnimation from "./RouterWhitAnimation";

function App() {
  return (
    <LocationProvider>
      <RoutesWithAnimation />
    </LocationProvider>
  );
}

export default App;
