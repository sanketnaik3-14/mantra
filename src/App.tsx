// src/App.tsx
import { useState } from 'react';
import { MandalaCanvas } from './MandalaCanvas';
import { GlobalControls } from './GlobalControls';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  // --- STATE MANAGEMENT ---
  // We now manage the state for our controls here in the main App
  const [layerWidthType, setLayerWidthType] = useState<'dynamic' | 'equal'>('dynamic');
  const [symmetry, setSymmetry] = useState(30);
  const [layers, setLayers] = useState(8);
  // This 'seed' is a random string. When we change it, it will trigger
  // the canvas to regenerate with a new random style.
  const [seed, setSeed] = useState(uuidv4());
  // --- END STATE MANAGEMENT ---

  return (
    <div className="App">
      <div className="controls-panel">
        <h2>Mantra Designer</h2>
        <p>Use the controls to create your unique mandala.</p>

        {/* We pass the state values and setters to our controls */}
        <GlobalControls
          symmetry={symmetry}
          setSymmetry={setSymmetry}
          layers={layers}
          setLayers={setLayers}
          layerWidthType={layerWidthType}
          setLayerWidthType={setLayerWidthType}
        />

        <button className="generate-button" onClick={() => setSeed(uuidv4())}>
          Randomize Style
        </button>
      </div>
      <div className="canvas-container">
        {/* We pass the state values down to the canvas as props */}
        <MandalaCanvas layers={layers} symmetry={symmetry} seed={seed} layerWidthType={layerWidthType} />
      </div>
    </div>
  );
}

export default App;