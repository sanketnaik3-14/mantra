// src/GlobalControls.tsx

// Define the props the component will accept
interface GlobalControlsProps {
    symmetry: number;
    setSymmetry: (value: number) => void;
    layers: number;
    setLayers: (value: number) => void;
    layerWidthType: 'dynamic' | 'equal';
    setLayerWidthType: (value: 'dynamic' | 'equal') => void;
}

export const GlobalControls = ({ symmetry, setSymmetry, layers, setLayers, layerWidthType, setLayerWidthType }: GlobalControlsProps) => {
    return (
        <div className="control-group">
            <h3>Global Settings</h3>
            <div className="slider-control">
                <label>Symmetry: {symmetry}</label>
                <input
                    type="range"
                    min="15"
                    max="80"
                    value={symmetry}
                    onChange={(e) => setSymmetry(Number(e.target.value))}
                />
            </div>
            <div className="slider-control">
                <label>Layers: {layers}</label>
                <input
                    type="range"
                    min="4"
                    max="15"
                    value={layers}
                    onChange={(e) => setLayers(Number(e.target.value))}
                />
            </div>
            <div className="control-group-buttons">
                <label>Layer Widths</label>
                <div>
                    <button
                        className={layerWidthType === 'dynamic' ? 'active' : ''}
                        onClick={() => setLayerWidthType('dynamic')}
                    >
                        Dynamic
                    </button>
                    <button
                        className={layerWidthType === 'equal' ? 'active' : ''}
                        onClick={() => setLayerWidthType('equal')}
                    >
                        Equal
                    </button>
                </div>
            </div>
        </div>
    );
};