import { useEffect, useRef, useMemo } from 'react';
import Two from 'two.js';
import { SeededRandom } from './prng';


// --- All of our palettes and shape logic now live inside this component ---
const palettes = [
    // Curated from your list
    { name: 'Desert Sunset', colors: ['#E27D60', '#85CDCA', '#E8A87C', '#C38D9E', '#41B3A3'] },
    { name: 'Arctic Dawn', colors: ['#8ECAE6', '#219EBC', '#023047', '#FFB703', '#FB8500'] },
    { name: 'Jewel Tones', colors: ['#6A0DAD', '#FF0038', '#00818F', '#FFC600', '#FF6B6B'] },
    { name: 'Psychedelic', colors: ['#540D6E', '#EE4266', '#FFD23F', '#3BCEAC', '#0EAD69'] },
    { name: 'Festival', colors: ['#FF6F61', '#6B5B95', '#88B04B', '#EFC050', '#955251'] },
    { name: 'Deep Ocean', colors: ['#03045E', '#023E8A', '#0077B6', '#00B4D8', '#90E0EF'] },
    { name: 'Golden Hour', colors: ['#F7B267', '#F79D65', '#F4845F', '#F27059', '#F25C54'] },
    { name: 'Autumn Leaves', colors: ['#8C2308', '#A64600', '#BF6F00', '#D99700', '#F2C100'] },
    { name: 'Royal Purples', colors: ['#3D348B', '#7678ED', '#9B5DE5', '#F15BB5', '#FEE440'] },
    { name: 'Teal & Coral', colors: ['#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#264653'] },
    { name: 'Amber & Indigo', colors: ['#FF9E00', '#FFD166', '#118AB2', '#073B4C', '#EF476F'] },
    { name: 'Crimson & Gold', colors: ['#9D0208', '#D00000', '#DC2F02', '#E85D04', '#FFAA00'] },
    { name: 'Cyber Neon', colors: ['#FF10F0', '#00F0FF', '#00FFA3', '#FF00FF', '#7200FF'] },
    { name: 'Van Gogh Stars', colors: ['#3944BC', '#4A5FDB', '#5B79F8', '#6D93FF', '#7EADFF'] },
    { name: 'Monet Water', colors: ['#8ECAE6', '#219EBC', '#126782', '#073B4C', '#023047'] },
    { name: 'Rainbow Spectrum', colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'] },
    { name: 'Forest Canopy', colors: ['#1A3C2F', '#2D6A4F', '#4CAF50', '#81C784', '#C8E6C9'] },
    { name: 'Desert Mirage', colors: ['#FF9A76', '#FF6B6B', '#FFD166', '#6D6875', '#B5838D'] },
    { name: 'Mountain Sunset', colors: ['#5E548E', '#9F86C0', '#E0B1CB', '#F9C74F', '#F9844A'] },
    { name: 'Serenity', colors: ['#8ECAE6', '#219EBC', '#023047', '#FFB703', '#FB8500'] },
    { name: 'Passion Flame', colors: ['#FF0000', '#FF5400', '#FFBD00', '#FF0054', '#9E0059'] },
    { name: 'Joyful Harmony', colors: ['#FF6D00', '#FF7900', '#FF8500', '#FF9100', '#FF9E00'] },
    { name: 'Mystic Journey', colors: ['#5A189A', '#7B2CBF', '#9D4EDD', '#C77DFF', '#E0AAFF'] },
    { name: 'Celtic Knot', colors: ['#0B132B', '#1C2541', '#3A506B', '#5BC0BE', '#6FFFE9'] },
    { name: 'Quantum Field', colors: ['#000000', '#14213D', '#FCA311', '#E5E5E5', '#FFFFFF'] },
    { name: 'Galaxy Core', colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429'] },
    { name: 'Neural Network', colors: ['#03071E', '#370617', '#6A040F', '#9D0208', '#FFBA08'] },
    { name: 'Time Portal', colors: ['#000814', '#001D3D', '#003566', '#FFC300', '#FFD60A'] },

    // --- 10 NEW PALETTES ADDED ---
    { name: 'Synthwave Sunset', colors: ['#FF3E9D', '#FFB43E', '#2DDEED', '#725BFF', '#231942'] },
    { name: 'Coral Reef', colors: ['#FF6F61', '#4FBDBA', '#F9C74F', '#F8AFA6', '#0077B6'] },
    { name: 'Stained Glass', colors: ['#9D0208', '#0072B2', '#009E73', '#F0E442', '#CC79A7'] },
    { name: 'Himalayan Salt', colors: ['#FFC0CB', '#FFA07A', '#FF7F50', '#FF6347', '#2A363B'] },
    { name: 'Iridescent Beetle', colors: ['#5A189A', '#1A936F', '#2D6A4F', '#FFBA08', '#1F7A8C'] },
    { name: 'Retro Diner', colors: ['#D90429', '#00A896', '#F0EFEB', '#FFD166', '#0466C8'] },
    { name: 'Sakura Season', colors: ['#FFB7C5', '#FF7B9C', '#88B04B', '#556B2F', '#F8F4E3'] },
    { name: 'Spiced Wine', colors: ['#800F2F', '#A4133C', '#C9184A', '#FF4D6D', '#FFB3C1'] },
    { name: 'Oasis Sunrise', colors: ['#F25C54', '#F4845F', '#F7B267', '#84A59D', '#52796F'] },
    { name: 'Paper & Ink', colors: ['#FAF9F6', '#2A2A2A', '#D4A373', '#E63946', '#457B9D'] },

    // --- 10 NEW PALETTES TO ADD ---
    { name: 'Ancient Scroll', colors: ['#F2E8CF', '#4A4A4A', '#B85C38', '#D4AF37', '#5E454B'] },
    { name: 'Bioluminescent Algae', colors: ['#00F5D4', '#00C49A', '#2D7272', '#003D5B', '#9B5DE5'] },
    { name: 'Mid-Century Modern', colors: ['#D95F26', '#849E6A', '#4A5D6A', '#E6C86E', '#A1663F'] },
    { name: 'Galaxy Nebula', colors: ['#5A189A', '#9D4EDD', '#FF006E', '#00F5D4', '#FB5607'] },
    { name: 'Geode Crystal', colors: ['#7B2CBF', '#C77DFF', '#E0AAFF', '#80FFDB', '#48BFE3'] },
    { name: 'Tropical Hibiscus', colors: ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#43AA8B'] },
    { name: 'Alchemy & Gold', colors: ['#231F20', '#5A189A', '#9D0208', '#FCA311', '#E0E0E0'] },
    { name: 'Ice & Fire', colors: ['#5E60CE', '#7400B8', '#F9844A', '#F94144', '#F8F9FA'] },
    { name: 'Steampunk Gears', colors: ['#B87333', '#8B4513', '#CD7F32', '#6A7B8D', '#3A506B'] },
    { name: 'Solarpunk', colors: ['#43AA8B', '#90BE6D', '#F9C74F', '#F9844A', '#577590'] },
];

// --- Define the props the component will accept ---
interface MandalaCanvasProps {
    layers: number;
    symmetry: number;
    seed: string;
    layerWidthType: 'dynamic' | 'equal';
}


export const MandalaCanvas = ({ layers, symmetry, seed, layerWidthType }: MandalaCanvasProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const twoInstanceRef = useRef<Two | null>(null);
    const prng = useMemo(() => new SeededRandom(parseInt(seed.substring(0, 8), 16)), [seed]);


    // This useMemo hook is the single source of truth for all random style decisions.
    const mandalaStyle = useMemo(() => {
        console.log("Generating new style from seed...");

        const selectedPalette = palettes[prng.nextInt(0, palettes.length - 1)];

        const maxLayers = 18;
        const layerStyles = Array.from({ length: maxLayers }, () => ({
            shapeType: prng.nextInt(0, 13),
            styleChoice: prng.nextFloat(),
        }));

        const weights = Array.from({ length: maxLayers }, () => prng.nextFloat());

        return { selectedPalette, layerStyles, weights };
    }, [seed, prng]);

    // This useEffect hook handles all the drawing.
    useEffect(() => {
        if (containerRef.current && !twoInstanceRef.current) {
            const two = new Two({
                width: 500, height: 500,
                type: Two.Types.svg,
            }).appendTo(containerRef.current);
            twoInstanceRef.current = two;
        }

        const two = twoInstanceRef.current;
        if (!two) return;
        two.clear();

        const { selectedPalette, layerStyles, weights } = mandalaStyle;

        const isDarkMode = document.body.classList.contains('dark-mode');
        const contrastColor = isDarkMode ? '#FFFFFF' : '#000000';
        const strokeColor = isDarkMode ? '#ffffff' : '#000000'; // Needed for Blueprint logic

        const center = { x: two.width / 2, y: two.height / 2 };
        const maxRadius = two.width / 2 * 0.9;

        // --- CORRECTED LAYER WIDTH LOGIC ---
        let finalNormalizedWeights: number[];
        if (layerWidthType === 'equal') {
            // If 'equal', create an array of equal values for the current number of layers.
            finalNormalizedWeights = Array(layers).fill(1 / layers);
        } else {
            // Otherwise, use the random weights from our style object.
            const currentWeights = weights.slice(0, layers);
            const totalWeight = currentWeights.reduce((sum, w) => sum + w, 0);
            finalNormalizedWeights = currentWeights.map(w => w / totalWeight);
        }

        let currentRadius = 0;
        for (let i = 0; i < layers; i++) {
            const layerWidth = finalNormalizedWeights[i] * maxRadius;
            const innerRadius = currentRadius;
            const layerRadius = currentRadius + layerWidth;
            currentRadius = layerRadius;

            const { shapeType, styleChoice } = layerStyles[i];
            const layerColor = selectedPalette.colors[i % selectedPalette.colors.length];

            for (let j = 0; j < symmetry; j++) {
                const angle = (j / symmetry) * (Math.PI * 2);
                let shape: Two.Object | Two.Group | null = null;

                switch (shapeType) {
                    case 0: // Fine Spikes (Stylized Version)
                        const angleStepSpike = (Math.PI * 2) / symmetry;
                        // THE FIX: The inner radius is now calculated relative to its own layer.
                        const spikeInnerR = innerRadius + layerWidth * 0.15;

                        // Calculate the final absolute coordinates for the 3 points of the triangle
                        const tip = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
                        const baseLeft = new Two.Vector(center.x + spikeInnerR * Math.cos(angle - angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle - angleStepSpike / 2));
                        const baseRight = new Two.Vector(center.x + spikeInnerR * Math.cos(angle + angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle + angleStepSpike / 2));

                        // Create the shape from the points
                        const spike = new Two.Path([tip, baseLeft, baseRight], true);

                        // Apply Hybrid Render styling
                        if (styleChoice < 0.5) { // Fill Only
                            spike.fill = layerColor;
                            spike.noStroke();
                        } else if (styleChoice < 0.85) { // Stroke Only
                            spike.noFill();
                            spike.stroke = layerColor;
                            spike.linewidth = 1.5;
                        } else { // Fill + Contrast Stroke
                            spike.fill = layerColor;
                            spike.stroke = contrastColor;
                            spike.linewidth = 2;
                        }

                        two.add(spike);
                        break;

                    /*case 0: // Fine Spikes (Blueprint Version)
                    const angleStepSpike = (Math.PI * 2) / symmetry;
                    const spikeInnerR = layerRadius * 0.85;
          
                    // Calculate the final absolute coordinates for the 3 points of the triangle
                    const tip = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
                    const baseLeft = new Two.Vector(center.x + spikeInnerR * Math.cos(angle - angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle - angleStepSpike / 2));
                    const baseRight = new Two.Vector(center.x + spikeInnerR * Math.cos(angle + angleStepSpike / 2), center.y + spikeInnerR * Math.sin(angle + angleStepSpike / 2));
          
                    // Create the shape from the points
                    const spike = new Two.Path([tip, baseLeft, baseRight], true);
          
                    // Apply Blueprint styling
                    spike.noFill();
                    spike.stroke = strokeColor; // Uses the monochrome theme color
                    spike.linewidth = 1.5;
                    
                    two.add(spike);
                    break;*/

                    case 1: // Arched Gates (Stylized Version)
                        // This corrected logic ensures the shape is always contained in its layer.
                        const archInnerR = innerRadius + layerWidth * 0.3;
                        const startAngle = angle - (Math.PI / symmetry) * 0.8;
                        const endAngle = angle + (Math.PI / symmetry) * 0.8;

                        const arch = two.makeArcSegment(center.x, center.y, archInnerR, layerRadius, startAngle, endAngle);

                        // Apply Hybrid Render styling
                        if (styleChoice < 0.5) { // Fill Only
                            arch.fill = layerColor;
                            arch.noStroke();
                        } else if (styleChoice < 0.85) { // Stroke Only
                            arch.noFill();
                            arch.stroke = layerColor;
                            arch.linewidth = 1.5;
                        } else { // Fill + Contrast Stroke
                            arch.fill = layerColor;
                            arch.stroke = contrastColor;
                            arch.linewidth = 2;
                        }
                        break;
                    /*
                    case 1: // Arched Gates (Blueprint Version)
                    const archInnerR = layerRadius * 0.7;
                    const startAngle = angle - (Math.PI / symmetry) * 0.8;
                    const endAngle = angle + (Math.PI / symmetry) * 0.8;
          
                    // Create the shape
                    const arch = two.makeArcSegment(center.x, center.y, archInnerR, layerRadius, startAngle, endAngle);
          
                    // Apply Blueprint styling
                    arch.noFill();
                    arch.stroke = strokeColor; // Monochrome theme color
                    arch.linewidth = 1.5;
                    break;*/

                    case 2: // Woven Ring (Stylized Version)
                        if (j === 0) { // This is a full-ring shape, so we only draw it once.
                            const outerVertices = [], innerVertices = [];
                            const weaveCount = symmetry * 3, weaveAmplitude = layerWidth * 0.25;
                            const baseRingRadius = innerRadius + (layerWidth / 2);
                            const weaveFrequency = Math.max(3, Math.floor(symmetry / 2));

                            for (let k = 0; k <= weaveCount; k++) {
                                const weaveAngle = (k / weaveCount) * (Math.PI * 2);
                                const waveFactor = Math.sin(weaveAngle * weaveFrequency);
                                outerVertices.push(new Two.Vector(center.x + (baseRingRadius + weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius + weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
                                innerVertices.push(new Two.Vector(center.x + (baseRingRadius - weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius - weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
                            }
                            const wovenPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);

                            // Apply Hybrid Render styling
                            if (styleChoice < 0.5) { // Fill Only
                                wovenPath.fill = layerColor;
                                wovenPath.noStroke();
                            } else if (styleChoice < 0.85) { // Stroke Only
                                wovenPath.noFill();
                                wovenPath.stroke = layerColor;
                                wovenPath.linewidth = 1.5;
                            } else { // Fill + Contrast Stroke
                                wovenPath.fill = layerColor;
                                wovenPath.stroke = contrastColor;
                                wovenPath.linewidth = 2;
                            }

                            two.add(wovenPath);
                        }
                        break;

                    /*case 2: // Woven Ring (Blueprint Version)
                    if (j === 0) { // This is a full-ring shape, so we only draw it once.
                      const outerVertices = [], innerVertices = [];
                      const weaveCount = symmetry * 3, weaveAmplitude = layerWidth * 0.25;
                      const baseRingRadius = innerRadius + (layerWidth / 2);
                      const weaveFrequency = Math.max(3, Math.floor(symmetry / 2));
          
                      for (let k = 0; k <= weaveCount; k++) {
                        const weaveAngle = (k / weaveCount) * (Math.PI * 2);
                        const waveFactor = Math.sin(weaveAngle * weaveFrequency);
                        outerVertices.push(new Two.Vector(center.x + (baseRingRadius + weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius + weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
                        innerVertices.push(new Two.Vector(center.x + (baseRingRadius - weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius - weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
                      }
                      const wovenPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);
                      
                      // Apply Blueprint styling
                      wovenPath.noFill();
                      wovenPath.stroke = strokeColor; // Monochrome theme color
                      wovenPath.linewidth = 1.5;
          
                      two.add(wovenPath);
                    }
                    break;*/

                    case 3: // Geometric Lattice (Stylized Version)
                        const angleStepLattice = (Math.PI * 2) / symmetry;

                        const x1 = center.x + Math.cos(angle) * innerRadius;
                        const y1 = center.y + Math.sin(angle) * innerRadius;
                        const x2 = center.x + Math.cos(angle + angleStepLattice) * layerRadius;
                        const y2 = center.y + Math.sin(angle + angleStepLattice) * layerRadius;
                        const line1 = two.makeLine(x1, y1, x2, y2);

                        const x3 = center.x + Math.cos(angle) * layerRadius;
                        const y3 = center.y + Math.sin(angle) * layerRadius;
                        const x4 = center.x + Math.cos(angle + angleStepLattice) * innerRadius;
                        const y4 = center.y + Math.sin(angle + angleStepLattice) * innerRadius;
                        const line2 = two.makeLine(x3, y3, x4, y4);

                        // Apply Stylized styling (still a stroke, but with palette color)
                        line1.stroke = layerColor;
                        line1.linewidth = 1;
                        line2.stroke = layerColor;
                        line2.linewidth = 1;
                        break;
                    /* case 3: // Geometric Lattice (Blueprint Version)
                    const angleStepLattice = (Math.PI * 2) / symmetry;
          
                    // Calculate coordinates for the first line
                    const x1 = center.x + Math.cos(angle) * innerRadius;
                    const y1 = center.y + Math.sin(angle) * innerRadius;
                    const x2 = center.x + Math.cos(angle + angleStepLattice) * layerRadius;
                    const y2 = center.y + Math.sin(angle + angleStepLattice) * layerRadius;
                    const line1 = two.makeLine(x1, y1, x2, y2);
          
                    // Calculate coordinates for the second line
                    const x3 = center.x + Math.cos(angle) * layerRadius;
                    const y3 = center.y + Math.sin(angle) * layerRadius;
                    const x4 = center.x + Math.cos(angle + angleStepLattice) * innerRadius;
                    const y4 = center.y + Math.sin(angle + angleStepLattice) * innerRadius;
                    const line2 = two.makeLine(x3, y3, x4, y4);
          
                    // Apply Blueprint styling to both lines
                    line1.stroke = strokeColor;
                    line1.linewidth = 1;
                    line2.stroke = strokeColor;
                    line2.linewidth = 1;
                    break;8*/

                    case 4: // Boundary Ring (Stylized Version)
                        if (j === 0) { // Only draw once per layer
                            // Draw the inner circle of the ring
                            const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
                            innerBoundary.noFill();
                            innerBoundary.stroke = layerColor; // Colorful palette color
                            innerBoundary.linewidth = 1.5;

                            // Draw the outer circle of the ring
                            const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
                            outerBoundary.noFill();
                            outerBoundary.stroke = layerColor; // Colorful palette color
                            outerBoundary.linewidth = 1.5;
                        }
                        break;

                    /*case 4: // Boundary Ring (Blueprint Version)
                    if (j === 0) { // Only draw once per layer
                      // Draw the inner circle of the ring
                      const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
                      innerBoundary.noFill();
                      innerBoundary.stroke = strokeColor; // Monochrome theme color
                      innerBoundary.linewidth = 1.5;
          
                      // Draw the outer circle of the ring
                      const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
                      outerBoundary.noFill();
                      outerBoundary.stroke = strokeColor; // Monochrome theme color
                      outerBoundary.linewidth = 1.5;
                    }
                    break;*/

                    // REPLACED WITH GRADIENT RING
                    case 5: // Gradient Ring (Stylized Version)
                        if (j === 0) { // Only draw once per layer
                            // Pick two adjacent colors from the palette for the gradient
                            const color1 = selectedPalette.colors[i % selectedPalette.colors.length];
                            const color2 = selectedPalette.colors[(i + 1) % selectedPalette.colors.length];

                            // Create a linear gradient that goes across the layer
                            const gradient = two.makeLinearGradient(
                                center.x, center.y - (innerRadius + layerWidth / 2),
                                center.x, center.y + (innerRadius + layerWidth / 2),
                                new Two.Stop(0, color1),
                                new Two.Stop(1, color2)
                            );

                            const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);

                            // This logic is correct: a thick stroke with no fill creates the ring effect.
                            ring.noFill();
                            ring.stroke = gradient;
                            ring.linewidth = layerWidth * 0.95;
                        }
                        break;

                    /*case 5: // Gradient Ring (Blueprint Version)
                    if (j === 0) { // Only draw once per layer
                      // In Blueprint mode, a Gradient Ring becomes a Boundary Ring.
                      const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
                      innerBoundary.noFill();
                      innerBoundary.stroke = strokeColor;
                      innerBoundary.linewidth = 1.5;
          
                      const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
                      outerBoundary.noFill();
                      outerBoundary.stroke = strokeColor;
                      outerBoundary.linewidth = 1.5;
                    }
                    break;*/

                    case 6: // Negative Space
                        break;

                    case 7: // Scalloped Ring (Stylized Version)
                        if (j === 0) { // This is a full-ring shape, so we only draw it once.
                            const outerVertices = [], innerVertices = [];
                            const scallopCount = symmetry * 3, scallopAmplitude = layerWidth * 0.4;

                            for (let k = 0; k <= scallopCount; k++) {
                                const scallopAngle = (k / scallopCount) * (Math.PI * 2);
                                const r_outer = layerRadius - (scallopAmplitude / 2) + scallopAmplitude * Math.sin(scallopAngle * symmetry);
                                const r_inner = innerRadius;
                                outerVertices.push(new Two.Vector(center.x + r_outer * Math.cos(scallopAngle), center.y + r_outer * Math.sin(scallopAngle)));
                                innerVertices.push(new Two.Vector(center.x + r_inner * Math.cos(scallopAngle), center.y + r_inner * Math.sin(scallopAngle)));
                            }
                            const scallopPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);

                            // Apply Hybrid Render styling
                            if (styleChoice < 0.5) { // Fill Only
                                scallopPath.fill = layerColor;
                                scallopPath.noStroke();
                            } else if (styleChoice < 0.85) { // Stroke Only
                                scallopPath.noFill();
                                scallopPath.stroke = layerColor;
                                scallopPath.linewidth = 1.5;
                            } else { // Fill + Contrast Stroke
                                scallopPath.fill = layerColor;
                                scallopPath.stroke = contrastColor;
                                scallopPath.linewidth = 2;
                            }

                            two.add(scallopPath);
                        }
                        break;

                    /*case 7: // Scalloped Ring (Blueprint Version)
                    if (j === 0) { // This is a full-ring shape, so we only draw it once.
                      const outerVertices = [], innerVertices = [];
                      const scallopCount = symmetry * 3, scallopAmplitude = layerWidth * 0.4;
          
                      for (let k = 0; k <= scallopCount; k++) {
                        const scallopAngle = (k / scallopCount) * (Math.PI * 2);
                        const r_outer = layerRadius - (scallopAmplitude / 2) + scallopAmplitude * Math.sin(scallopAngle * symmetry);
                        const r_inner = innerRadius;
                        outerVertices.push(new Two.Vector(center.x + r_outer * Math.cos(scallopAngle), center.y + r_outer * Math.sin(scallopAngle)));
                        innerVertices.push(new Two.Vector(center.x + r_inner * Math.cos(scallopAngle), center.y + r_inner * Math.sin(scallopAngle)));
                      }
                      const scallopPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);
                      
                      // Apply Blueprint styling
                      scallopPath.noFill();
                      scallopPath.stroke = strokeColor; // Monochrome theme color
                      scallopPath.linewidth = 1.5;
          
                      two.add(scallopPath);
                    }
                    break;*/

                    case 8: // Dotted Ring (Stylized Version)
                        // THE FIX: Position the dots in the middle of their layer, not on the outer edge.
                        const dotX_st = center.x + (innerRadius + layerWidth / 2) * Math.cos(angle);
                        const dotY_st = center.y + (innerRadius + layerWidth / 2) * Math.sin(angle);

                        const dot_st = two.makeCircle(dotX_st, dotY_st, 3);

                        // Apply Hybrid Render styling
                        if (styleChoice < 0.5) { // Fill Only
                            dot_st.fill = layerColor;
                            dot_st.noStroke();
                        } else if (styleChoice < 0.85) { // Stroke Only
                            dot_st.noFill();
                            dot_st.stroke = layerColor;
                            dot_st.linewidth = 1.5;
                        } else { // Fill + Contrast Stroke
                            dot_st.fill = layerColor;
                            dot_st.stroke = contrastColor;
                            dot_st.linewidth = 2;
                        }
                        break;

                    /*case 8: // Dotted Ring (Blueprint Version)
                    // Create the circle for the dot
                    const dot = two.makeCircle(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle), 3);
          
                    // Apply Blueprint styling (an outline of a circle)
                    dot.noFill();
                    dot.stroke = strokeColor; // Monochrome theme color
                    dot.linewidth = 1.5;
                    break;*/

                    case 9: // Triangles (Stylized Version)
                        const triangleInnerR = innerRadius + layerWidth * 0.1;
                        const angleStepTriangle = (Math.PI * 2) / symmetry;

                        const t1 = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
                        const t2 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle - angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle - angleStepTriangle / 2));
                        const t3 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle + angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle + angleStepTriangle / 2));

                        const triangle = new Two.Path([t1, t2, t3], true);

                        // Apply Hybrid Render styling
                        if (styleChoice < 0.5) { // Fill Only
                            triangle.fill = layerColor;
                            triangle.noStroke();
                        } else if (styleChoice < 0.85) { // Stroke Only
                            triangle.noFill();
                            triangle.stroke = layerColor;
                            triangle.linewidth = 1.5;
                        } else { // Fill + Contrast Stroke
                            triangle.fill = layerColor;
                            triangle.stroke = contrastColor;
                            triangle.linewidth = 2;
                        }

                        two.add(triangle);
                        break;

                    /*case 9: // Triangles (Blueprint Version)
                    const triangleInnerR = innerRadius + layerWidth * 0.1;
                    const angleStepTriangle = (Math.PI * 2) / symmetry;
          
                    // Calculate the 3 points of the triangle
                    const t1 = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
                    const t2 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle - angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle - angleStepTriangle / 2));
                    const t3 = new Two.Vector(center.x + triangleInnerR * Math.cos(angle + angleStepTriangle / 2), center.y + triangleInnerR * Math.sin(angle + angleStepTriangle / 2));
                    
                    const triangle = new Two.Path([t1, t2, t3], true);
          
                    // Apply Blueprint styling
                    triangle.noFill();
                    triangle.stroke = strokeColor; // Monochrome theme color
                    triangle.linewidth = 1.5;
          
                    two.add(triangle);
                    break;*/

                    // Use the pre-calculated parameters for this layer
                    case 10: // Super-ellipse (Corrected)
                        const shapeSize = Math.min(layerWidth * 0.8, (Math.PI * 2 * (innerRadius + layerWidth / 2)) / symmetry * 0.8);
                        const corner = shapeSize * 0.5 * prng.nextFloat() // Use pre-calculated random value
                        const superellipse_st = two.makeRoundedRectangle(0, 0, shapeSize, shapeSize, corner);

                        // Apply Hybrid Render styling
                        if (styleChoice < 0.5) { // Fill Only
                            superellipse_st.fill = layerColor;
                            superellipse_st.noStroke();
                        } else if (styleChoice < 0.85) { // Stroke Only
                            superellipse_st.noFill();
                            superellipse_st.stroke = layerColor;
                            superellipse_st.linewidth = 1.5;
                        } else { // Fill + Contrast Stroke
                            superellipse_st.fill = layerColor;
                            superellipse_st.stroke = contrastColor;
                            superellipse_st.linewidth = 2;
                        }

                        // Position the shape in the layer
                        superellipse_st.rotation = angle;
                        superellipse_st.translation.set(
                            center.x + (innerRadius + layerWidth / 2) * Math.cos(angle),
                            center.y + (innerRadius + layerWidth / 2) * Math.sin(angle)
                        );
                        break;
                    /*case 10: // Super-ellipse (Blueprint Version)
                    // Calculate a safe size for the shape to fit in its segment
                    const shapeSize = Math.min(layerWidth * 0.8, (Math.PI * 2 * (innerRadius + layerWidth / 2)) / symmetry * 0.8);
                    // The corner roundness is still random for variety
                    const corner = shapeSize * 0.5 * prng.nextFloat(); 
                    
                    const superellipse = two.makeRoundedRectangle(0, 0, shapeSize, shapeSize, corner);
          
                    // Apply Blueprint styling
                    superellipse.noFill();
                    superellipse.stroke = strokeColor; // Monochrome theme color
                    superellipse.linewidth = 1.5;
          
                    // Position the shape in the layer
                    superellipse.rotation = angle;
                    superellipse.translation.set(
                      center.x + (innerRadius + layerWidth / 2) * Math.cos(angle),
                      center.y + (innerRadius + layerWidth / 2) * Math.sin(angle)
                    );
                    break;*/

                    case 11: // Dashed Line Ring (Corrected)
                        if (j === 0) {
                            const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);
                            ring.noFill();
                            ring.stroke = layerColor;
                            ring.linewidth = 1.5;
                            const circumference = Math.PI * 2 * (innerRadius + layerWidth / 2);
                            const dashLength = circumference / symmetry / 2;
                            // THE FIX: Use the main prng instance, which is now in scope.
                            (ring as any).dashes = [dashLength, dashLength * (0.5 + prng.nextFloat())];
                        }
                        break;

                    /*case 11: // Dashed Line Ring (Blueprint Version)
                    if (j === 0) { // Only draw once per layer
                      const ring = two.makeCircle(center.x, center.y, innerRadius + layerWidth / 2);
                      
                      // Apply Blueprint styling
                      ring.noFill();
                      ring.stroke = strokeColor; // Monochrome theme color
                      ring.linewidth = 1.5;
          
                      // Calculate and apply the dash properties
                      const circumference = Math.PI * 2 * (innerRadius + layerWidth / 2);
                      const dashLength = circumference / symmetry / 2;
                      ring.dashes = [dashLength, dashLength * (0.5 + prng.nextFloat())];
                    }
                    break;*/

                    case 12: // Teardrop Petals (Stylized Version)
                        const teardropLength = layerWidth * 0.9;
                        const teardropWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.4;

                        const teardrop = two.makeEllipse(0, 0, teardropLength / 2, teardropWidth / 2);
                        teardrop.vertices[0].x -= teardropLength * 0.25; // Make one end pointy

                        // Apply Hybrid Render styling
                        if (styleChoice < 0.5) { // Fill Only
                            teardrop.fill = layerColor;
                            teardrop.noStroke();
                        } else if (styleChoice < 0.85) { // Stroke Only
                            teardrop.noFill();
                            teardrop.stroke = layerColor;
                            teardrop.linewidth = 1.5;
                        } else { // Fill + Contrast Stroke
                            teardrop.fill = layerColor;
                            teardrop.stroke = contrastColor;
                            teardrop.linewidth = 2;
                        }

                        // Position the shape in the layer
                        teardrop.rotation = angle;
                        teardrop.translation.set(
                            center.x + (innerRadius + teardropLength / 2) * Math.cos(angle),
                            center.y + (innerRadius + teardropLength / 2) * Math.sin(angle)
                        );
                        break;
                    /*case 12: // Teardrop Petals (Blueprint Version)
                    const teardropLength = layerWidth * 0.9;
                    const teardropWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.4;
                    
                    // Create the shape by modifying an ellipse
                    const teardrop = two.makeEllipse(0, 0, teardropLength / 2, teardropWidth / 2);
                    teardrop.vertices[0].x -= teardropLength * 0.25; // Make one end pointy
          
                    // Apply Blueprint styling
                    teardrop.noFill();
                    teardrop.stroke = strokeColor; // Monochrome theme color
                    teardrop.linewidth = 1.5;
          
                    // Position the shape in the layer
                    teardrop.rotation = angle;
                    teardrop.translation.set(
                      center.x + (innerRadius + teardropLength / 2) * Math.cos(angle),
                      center.y + (innerRadius + teardropLength / 2) * Math.sin(angle)
                    );
                    break;*/

                    case 13: // Leaf Petals (Stylized Version)
                        const leafLength_st = layerWidth;
                        const leafWidth_st = (Math.PI * 2 * innerRadius) / symmetry * 0.5;

                        const leaf_st = new Two.Path([
                            new Two.Anchor(0, 0),
                            new Two.Anchor(leafLength_st / 2, -leafWidth_st / 2),
                            new Two.Anchor(leafLength_st, 0),
                            new Two.Anchor(leafLength_st / 2, leafWidth_st / 2)
                        ], true, true);

                        // Apply Hybrid Render styling
                        if (styleChoice < 0.5) { // Fill Only
                            leaf_st.fill = layerColor;
                            leaf_st.noStroke();
                        } else if (styleChoice < 0.85) { // Stroke Only
                            leaf_st.noFill();
                            leaf_st.stroke = layerColor;
                            leaf_st.linewidth = 1.5;
                        } else { // Fill + Contrast Stroke
                            leaf_st.fill = layerColor;
                            leaf_st.stroke = contrastColor;
                            leaf_st.linewidth = 2;
                        }

                        // Position the shape in the layer
                        leaf_st.rotation = angle;
                        leaf_st.translation.set(
                            center.x + innerRadius * Math.cos(angle),
                            center.y + innerRadius * Math.sin(angle)
                        );
                        two.add(leaf_st);
                        break;
                    /*case 13: // Leaf Petals (Blueprint Version)
                    const leafLength = layerWidth;
                    const leafWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.5;
                    
                    // Create the curved path for the leaf
                    const leaf = new Two.Path([
                      new Two.Anchor(0, 0),
                      new Two.Anchor(leafLength / 2, -leafWidth / 2),
                      new Two.Anchor(leafLength, 0),
                      new Two.Anchor(leafLength / 2, leafWidth / 2)
                    ], true, true); // Closed and curved
          
                    // Apply Blueprint styling
                    leaf.noFill();
                    leaf.stroke = strokeColor; // Monochrome theme color
                    leaf.linewidth = 1.5;
          
                    // Position the shape in the layer
                    leaf.rotation = angle;
                    leaf.translation.set(
                      center.x + innerRadius * Math.cos(angle),
                      center.y + innerRadius * Math.sin(angle)
                    );
                    two.add(leaf);
                    break;*/

                    // --- NEW PARAMETRIC SHAPES ---
                    /*case 15: // Parametric Petal (Blueprint Version)
                    const p_points = [];
                    const p_steps = 100;
                    // The petal's length and width are still random for variety
                    const p_length = layerWidth * (0.8 + prng.nextFloat() * 0.4);
                    const p_width = (Math.PI * 2 * innerRadius) / symmetry * (0.4 + prng.nextFloat() * 0.4);
          
                    for (let k = 0; k <= p_steps; k++) {
                      const t = (Math.PI / p_steps) * k;
                      const x = p_length * Math.sin(t);
                      const y = p_width * Math.sin(t) * Math.cos(t);
                      p_points.push(new Two.Anchor(x, y));
                    }
                    const shape = new Two.Path(p_points, false, false);
          
                    // Apply Blueprint styling
                    shape.noFill();
                    shape.stroke = strokeColor; // Monochrome theme color
                    shape.linewidth = 1.5;
                    
                    // Position the shape in the layer
                    shape.rotation = angle;
                    shape.translation.set(
                      center.x + innerRadius * Math.cos(angle),
                      center.y + innerRadius * Math.sin(angle)
                    );
                    two.add(shape);
                    break;*/


                    /*case 16: // Parametric Leaf (Blueprint Version)
                    const l_steps_bp = 100;
                    const l_length_bp = layerWidth * (0.9 + prng.nextFloat() * 0.2);
                    const l_width_bp = (Math.PI * 2 * innerRadius) / symmetry * (0.2 + prng.nextFloat() * 0.3);
                    const serration_bp = prng.nextFloat() * 0.15;
                    const serration_freq_bp = prng.nextInt(20, 60);
          
                    const l_points_bp = [];
                    for (let k = 0; k <= l_steps_bp; k++) {
                      const t = (Math.PI / l_steps_bp) * k;
                      const baseWidth = l_width_bp * Math.sin(t) * Math.cos(t);
                      const jaggedEdge = 1 + serration_bp * Math.cos(t * serration_freq_bp);
                      const x = l_length_bp * Math.sin(t);
                      const y = baseWidth * jaggedEdge;
                      l_points_bp.push(new Two.Anchor(x, y));
                    }
                    const leafPath_bp = new Two.Path(l_points_bp, false, false);
                    const vein_bp = new Two.Line(0, 0, l_length_bp, 0);
                    const shape_bp = two.makeGroup(leafPath_bp, vein_bp);
          
                    // Apply Blueprint styling to the group
                    shape_bp.noFill();
                    shape_bp.stroke = strokeColor; // Monochrome theme color
                    shape_bp.linewidth = 1.5;
                    vein_bp.linewidth = 1; // Make the vein slightly thinner
          
                    // Position the shape in the layer
                    shape_bp.rotation = angle;
                    shape_bp.translation.set(
                      center.x + innerRadius * Math.cos(angle),
                      center.y + innerRadius * Math.sin(angle)
                    );
                    break; */

                }

                // --- Paste your final, stable `switch (shapeType)` block here ---
                // It should start with `case 0: // Fine Spikes` and end with `case 13: // Leaf Petals`
            }
        }
        two.update();
    }, [layers, symmetry, seed, layerWidthType, mandalaStyle]);

    return (
        <div>
            <div ref={containerRef} id="mandala-canvas-react"></div>
        </div>
    );
};