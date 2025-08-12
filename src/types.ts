// src/types.ts
import { v4 as uuidv4 } from 'uuid';

// Define the parameters for each shape type.
// This allows for type-safe, shape-specific controls.
export interface ShapeParams {
    // Universal params
    symmetry: number;
    style: 'fill' | 'stroke';

    // Shape-specific params
    points?: number;      // For Stars, Polygons
    pointiness?: number;  // For Stars
    width?: number;       // For Petals, Spikes
    sharpness?: number;   // For Lotus
    count?: number;       // For Dots
    frequency?: number;   // For Wave Ring
    amplitude?: number;   // For Wave Ring
    size?: number;        // For Dots
}

// A Layer is defined by its ID, a chosen shape, and its specific parameters.
export interface LayerSettings {
    id: string;
    shape: string;
    params: ShapeParams;
}

// A map defining the default parameters for each shape.
// This makes adding new shapes and controls much easier.
export const shapeDefaults: Record<string, ShapeParams> = {
    'Ring': { symmetry: 30, style: 'stroke' },
    'Dots': { symmetry: 30, style: 'fill', count: 30, size: 0.5 },
    'Spikes': { symmetry: 30, style: 'fill', width: 0.5, pointiness: 0.8 },
    'Petals': { symmetry: 12, style: 'fill', width: 0.8, pointiness: 0.5 },
    'Lotus': { symmetry: 10, style: 'fill', width: 0.9, sharpness: 0.7 },
    'Starburst': { symmetry: 8, style: 'fill', points: 12, pointiness: 0.9 },
    'Wave Ring': { symmetry: 1, style: 'stroke', frequency: 24, amplitude: 0.2 },
    'Geometric Weave': { symmetry: 1, style: 'stroke', frequency: 12, amplitude: 0.5 },
};

// A function to create a new layer with default settings.
export const createDefaultLayer = (): LayerSettings => {
    const defaultShape = 'Ring';
    return {
        id: uuidv4(),
        shape: defaultShape,
        params: shapeDefaults[defaultShape],
    };
};
