// src/App.tsx
import { useState } from 'react';
import { MandalaCanvas } from './MandalaCanvas';
import { GlobalControls } from './GlobalControls';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  // --- STATE MANAGEMENT ---
  const [layerWidthType, setLayerWidthType] = useState<'dynamic' | 'equal'>('dynamic');
  const [symmetry, setSymmetry] = useState(30);
  const [layers, setLayers] = useState(8);
  const [seed, setSeed] = useState(uuidv4());
  const [isSeparated, setIsSeparated] = useState(false);

  // --- New state for layer editing and boundary visibility ---
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [showBoundaries, setShowBoundaries] = useState(false);
  // --- END STATE MANAGEMENT ---

  // When separating layers, default to showing all layers
  const toggleSeparation = () => {
    const newSeparationState = !isSeparated;
    setIsSeparated(newSeparationState);
    if (!newSeparationState) {
      setActiveLayer(null); // Reset active layer when combining
    }
  };

  return (
    <div className="App">
      <div className="controls-panel">
        <h2>Mantra Designer</h2>
        <p>Use the controls to create your unique mandala.</p>

        <GlobalControls
          symmetry={symmetry}
          setSymmetry={setSymmetry}
          layers={layers}
          setLayers={setLayers}
          layerWidthType={layerWidthType}
          setLayerWidthType={setLayerWidthType}
          isSeparated={isSeparated}
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
        />

        <div className="control-group-buttons">
          <button onClick={toggleSeparation}>
            {isSeparated ? 'Combine Layers' : 'Separate Layers'}
          </button>
          <button onClick={() => setShowBoundaries(!showBoundaries)}>
            {showBoundaries ? 'Hide Boundaries' : 'Show Boundaries'}
          </button>
          <button className="generate-button" onClick={() => setSeed(uuidv4())}>
            Randomize Style
          </button>
        </div>
      </div>
      <div className="canvas-container">
        <MandalaCanvas
          layers={layers}
          symmetry={symmetry}
          seed={seed}
          layerWidthType={layerWidthType}
          isSeparated={isSeparated}
          activeLayer={activeLayer}
          showBoundaries={showBoundaries}
        />
      </div>
    </div>
  );
}

export default App;
