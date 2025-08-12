// src/GlobalControls.tsx

interface GlobalControlsProps {
    symmetry: number;
    setSymmetry: (value: number) => void;
    layers: number;
    setLayers: (value: number) => void;
    layerWidthType: 'dynamic' | 'equal';
    setLayerWidthType: (value: 'dynamic' | 'equal') => void;
    isSeparated: boolean;
    activeLayer: number | null;
    setActiveLayer: (layer: number | null) => void;
}

export const GlobalControls = (props: GlobalControlsProps) => {
    const {
        symmetry, setSymmetry,
        layers, setLayers,
        layerWidthType, setLayerWidthType,
        isSeparated, activeLayer, setActiveLayer
    } = props;

    return (
        <>
            <div className="control-group">
                <h3>Global Settings</h3>
                <div className="slider-control">
                    <label>Symmetry: {symmetry}</label>
                    <input type="range" min="15" max="80" value={symmetry} onChange={(e) => setSymmetry(Number(e.target.value))} />
                </div>
                <div className="slider-control">
                    <label>Layers: {layers}</label>
                    <input type="range" min="4" max="15" value={layers} onChange={(e) => setLayers(Number(e.target.value))} />
                </div>
                <div className="control-group-buttons">
                    <label>Layer Widths</label>
                    <div>
                        <button className={layerWidthType === 'dynamic' ? 'active' : ''} onClick={() => setLayerWidthType('dynamic')}>Dynamic</button>
                        <button className={layerWidthType === 'equal' ? 'active' : ''} onClick={() => setLayerWidthType('equal')}>Equal</button>
                    </div>
                </div>
            </div>

            {/* --- FIX: Added a container with a fixed height to prevent layout shift --- */}
            <div style={{ minHeight: '100px' }}>
                {isSeparated && (
                    <div className="control-group">
                        <h3>Edit Layer</h3>
                        <div className="layer-selection-buttons">
                            <button className={activeLayer === null ? 'active' : ''} onClick={() => setActiveLayer(null)}>All</button>
                            {Array.from({ length: layers }, (_, i) => (
                                <button
                                    key={i}
                                    className={activeLayer === i ? 'active' : ''}
                                    onClick={() => setActiveLayer(i)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
