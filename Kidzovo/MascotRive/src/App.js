import "./styles.css";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { useState } from 'react';

const states = [
  { value: '0', label: 'Standby' },
  { value: '1', label: 'Searching' },
  { value: '2', label: 'Suggestions' },
  { value: '3', label: 'Painting' },
  { value: '4', label: 'Listening' },
  { value: '5', label: 'Talking' },
  { value: '101', label: 'Bored' },
  { value: '102', label: 'Success' },
  { value: '103', label: 'Retry' },
  { value: '104', label: 'Failure' },
  { value: '105', label: 'Dance Step 1' },
  { value: '106', label: 'Dance Step 2' },
  { value: '107', label: 'Dance Step 3' },
  { value: '108', label: 'Dance Step 4' },
];

const themeInputs = [
  { name: 'Skin', maxValue: 2 },
  { name: 'Headgear', maxValue: 15 },
  { name: 'Specs', maxValue: 5 },
  { name: 'Muffler', maxValue: 5 },
  { name: 'BG', maxValue: 5 },
];

export const RiveDemo = () => {
  const [activeState, setActiveState] = useState('0'); // Default to Standby state

  const { RiveComponent, rive } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: "owl.riv",
    // Be sure to specify the correct state machine (or animation) name
    stateMachines: "State Machine Main",
    // This is optional.Provides additional layout control.
    layout: new Layout({
      fit: Fit.Cover, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  const triggerState = (stateName) => {
    if (rive && rive.stateMachineInputs) {
      const inputs = rive.stateMachineInputs('State Machine Main');
      const input = inputs.find(i => i.name === 'State');
      if (input) {
        input.value = parseInt(stateName);
        setActiveState(stateName);
      }
    }
  };

  const randomizeTheme = () => {
    if (rive && rive.stateMachineInputs) {
      const inputs = rive.stateMachineInputs('State Machine Main');
      themeInputs.forEach(themeInput => {
        const input = inputs.find(i => i.name === themeInput.name);
        if (input) {
          input.value = Math.floor(Math.random() * (themeInput.maxValue + 1));
        }
      });
    }
  };

  return (
    <>
      <div className="rive-wrapper">
        <RiveComponent />
      </div>
      <div className="controls">
        <button 
          className="theme-button"
          onClick={randomizeTheme}
        >
          Random Theme
        </button>
        {states.map(state => (
          <button 
            key={state.value} 
            onClick={() => triggerState(state.value)}
            className={activeState === state.value ? 'active' : ''}
          >
            {state.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default function App() {
  return (
    <div className="app-container">
      <div className="rive-container">
        <RiveDemo />
      </div>
    </div>
  );
}
