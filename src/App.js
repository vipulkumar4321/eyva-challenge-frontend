import "./App.css";
import { dummyData } from "./constants";
import TeamSettings from "./views/TeamSettings";

function App() {
  return (
    <div>
      <TeamSettings data={dummyData} />
    </div>
  );
}

export default App;
