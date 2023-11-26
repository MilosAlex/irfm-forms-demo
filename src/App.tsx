import "./App.css";
import OriginalForm from "./forms/OriginalForm";
import RhfForm from "./forms/RhfForm";
import StateMachineForm from "./forms/StateMachineForm";

function App() {
  return (
    <div className="app">
      <OriginalForm />
      <StateMachineForm />
      <RhfForm />
    </div>
  );
}

export default App;
