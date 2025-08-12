import { useEffect, useRef, useMemo } from 'react';
import Two from 'two.js';
import { SeededRandom } from './prng';

// Palettes...
const palettes = [
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

interface MandalaCanvasProps {
    layers: number;
    symmetry: number;
    seed: string;
    layerWidthType: 'dynamic' | 'equal';
    isSeparated: boolean;
    activeLayer: number | null;
    showBoundaries: boolean;
}

export const MandalaCanvas = (props: MandalaCanvasProps) => {
    const { layers, symmetry, seed, layerWidthType, isSeparated, activeLayer, showBoundaries } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const twoInstanceRef = useRef<Two | null>(null);
    const prng = useMemo(() => new SeededRandom(parseInt(seed.substring(0, 8), 16)), [seed]);

    const mandalaStyle = useMemo(() => {
        const selectedPalette = palettes[prng.nextInt(0, palettes.length - 1)];
        const maxLayers = 18;
        const layerStyles = Array.from({ length: maxLayers }, () => ({
            // **FIX**: Now generates a number from 0 to 13 (14 shapes total)
            shapeType: prng.nextInt(0, 13),
            styleChoice: prng.nextFloat(),
        }));
        const weights = Array.from({ length: maxLayers }, () => prng.nextFloat());
        return { selectedPalette, layerStyles, weights };
    }, [seed, prng]);

    useEffect(() => {
        if (containerRef.current && !twoInstanceRef.current) {
            const two = new Two({ width: 500, height: 500, type: Two.Types.svg }).appendTo(containerRef.current);
            twoInstanceRef.current = two;
        }

        const two = twoInstanceRef.current;
        if (!two) return;
        two.clear();

        const { selectedPalette, layerStyles, weights } = mandalaStyle;
        const isDarkMode = document.body.classList.contains('dark-mode');
        const contrastColor = isDarkMode ? '#FFFFFF' : '#000000';
        const center = { x: two.width / 2, y: two.height / 2 };
        const maxRadius = two.width / 2 * 0.9;
        const separationFactor = isSeparated ? 25 : 0;

        let finalNormalizedWeights: number[];
        if (layerWidthType === 'equal') {
            finalNormalizedWeights = Array(layers).fill(1 / layers);
        } else {
            const currentWeights = weights.slice(0, layers);
            const totalWeight = currentWeights.reduce((sum, w) => sum + w, 0);
            finalNormalizedWeights = currentWeights.map(w => w / totalWeight);
        }

        let currentRadius = 0;
        for (let i = 0; i < layers; i++) {
            const layerSeparation = i * separationFactor;
            const layerWidth = finalNormalizedWeights[i] * maxRadius;
            const innerRadius = currentRadius + layerSeparation;
            const layerRadius = currentRadius + layerWidth + layerSeparation;
            const layerCenterRadius = innerRadius + layerWidth / 2;

            currentRadius += layerWidth;

            if (showBoundaries) {
                const boundaryColor = isDarkMode ? '#555' : '#ccc';
                const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
                innerBoundary.noFill();
                innerBoundary.stroke = boundaryColor;
                innerBoundary.linewidth = 0.5;
                innerBoundary.dashes = [4, 4];

                const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
                outerBoundary.noFill();
                outerBoundary.stroke = boundaryColor;
                outerBoundary.linewidth = 0.5;
                outerBoundary.dashes = [4, 4];
            }

            if (isSeparated && activeLayer !== null && activeLayer !== i) {
                continue;
            }

            const { shapeType, styleChoice } = layerStyles[i];
            const layerColor = selectedPalette.colors[i % selectedPalette.colors.length];

            for (let j = 0; j < symmetry; j++) {
                const angle = (j / symmetry) * (Math.PI * 2);

                switch (shapeType) {
                    case 0: // Fine Spikes (Re-added and corrected)
                        const angleStepSpike = (Math.PI * 2) / symmetry;
                        const tip = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
                        const baseLeft = new Two.Vector(center.x + innerRadius * Math.cos(angle - angleStepSpike / 3), center.y + innerRadius * Math.sin(angle - angleStepSpike / 3));
                        const baseRight = new Two.Vector(center.x + innerRadius * Math.cos(angle + angleStepSpike / 3), center.y + innerRadius * Math.sin(angle + angleStepSpike / 3));

                        const spike = new Two.Path([tip, baseLeft, baseRight], true);

                        if (styleChoice < 0.5) {
                            spike.fill = layerColor;
                            spike.noStroke();
                        } else if (styleChoice < 0.85) {
                            spike.noFill();
                            spike.stroke = layerColor;
                            spike.linewidth = 1.5;
                        } else {
                            spike.fill = layerColor;
                            spike.stroke = contrastColor;
                            spike.linewidth = 2;
                        }

                        two.add(spike);
                        break;

                    case 1: // Arched Gates
                        const startAngle = angle - (Math.PI / symmetry) * 0.8;
                        const endAngle = angle + (Math.PI / symmetry) * 0.8;
                        const arch = two.makeArcSegment(center.x, center.y, innerRadius, layerRadius, startAngle, endAngle);
                        if (styleChoice < 0.5) {
                            arch.fill = layerColor;
                            arch.noStroke();
                        } else if (styleChoice < 0.85) {
                            arch.noFill();
                            arch.stroke = layerColor;
                            arch.linewidth = 1.5;
                        } else {
                            arch.fill = layerColor;
                            arch.stroke = contrastColor;
                            arch.linewidth = 2;
                        }
                        two.add(arch);
                        break;

                    case 2: // Woven Ring
                        if (j === 0) {
                            const outerVertices = [], innerVertices = [];
                            const weaveCount = symmetry * 3, weaveAmplitude = layerWidth * 0.25;
                            const baseRingRadius = layerCenterRadius;
                            const weaveFrequency = Math.max(3, Math.floor(symmetry / 2));
                            for (let k = 0; k <= weaveCount; k++) {
                                const weaveAngle = (k / weaveCount) * (Math.PI * 2);
                                const waveFactor = Math.sin(weaveAngle * weaveFrequency);
                                outerVertices.push(new Two.Vector(center.x + (baseRingRadius + weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius + weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
                                innerVertices.push(new Two.Vector(center.x + (baseRingRadius - weaveAmplitude * waveFactor) * Math.cos(weaveAngle), center.y + (baseRingRadius - weaveAmplitude * waveFactor) * Math.sin(weaveAngle)));
                            }
                            const wovenPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);
                            if (styleChoice < 0.5) {
                                wovenPath.fill = layerColor;
                                wovenPath.noStroke();
                            } else if (styleChoice < 0.85) {
                                wovenPath.noFill();
                                wovenPath.stroke = layerColor;
                                wovenPath.linewidth = 1.5;
                            } else {
                                wovenPath.fill = layerColor;
                                wovenPath.stroke = contrastColor;
                                wovenPath.linewidth = 2;
                            }
                            two.add(wovenPath);
                        }
                        break;

                    case 3: // Geometric Lattice
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
                        line1.stroke = layerColor;
                        line1.linewidth = 1;
                        line2.stroke = layerColor;
                        line2.linewidth = 1;
                        break;

                    case 4: // Boundary Ring
                        if (j === 0) {
                            const innerBoundary = two.makeCircle(center.x, center.y, innerRadius);
                            innerBoundary.noFill();
                            innerBoundary.stroke = layerColor;
                            innerBoundary.linewidth = 1.5;
                            const outerBoundary = two.makeCircle(center.x, center.y, layerRadius);
                            outerBoundary.noFill();
                            outerBoundary.stroke = layerColor;
                            outerBoundary.linewidth = 1.5;
                        }
                        break;

                    case 5: // Gradient Ring
                        if (j === 0) {
                            const color1 = selectedPalette.colors[i % selectedPalette.colors.length];
                            const color2 = selectedPalette.colors[(i + 1) % selectedPalette.colors.length];
                            const gradient = two.makeLinearGradient(center.x, center.y - layerCenterRadius, center.x, center.y + layerCenterRadius, new Two.Stop(0, color1), new Two.Stop(1, color2));
                            const ring = two.makeCircle(center.x, center.y, layerCenterRadius);
                            ring.noFill();
                            ring.stroke = gradient;
                            ring.linewidth = layerWidth * 0.95;
                        }

                        break;

                    case 6: // Negative Space
                        break;

                    case 7: // Scalloped Ring (FIXED)
                        if (j === 0) {
                            const outerVertices = [], innerVertices = [];
                            const scallopCount = symmetry * 3, scallopAmplitude = layerWidth * 0.4;
                            for (let k = 0; k <= scallopCount; k++) {
                                const scallopAngle = (k / scallopCount) * (Math.PI * 2);
                                // **FIX**: The base radius is now smaller to prevent crossing the boundary
                                const baseRadius = layerCenterRadius - scallopAmplitude / 2;
                                const r_outer = baseRadius + scallopAmplitude * Math.sin(scallopAngle * symmetry);
                                const r_inner = innerRadius;
                                outerVertices.push(new Two.Vector(center.x + r_outer * Math.cos(scallopAngle), center.y + r_outer * Math.sin(scallopAngle)));
                                innerVertices.push(new Two.Vector(center.x + r_inner * Math.cos(scallopAngle), center.y + r_inner * Math.sin(scallopAngle)));
                            }
                            const scallopPath = new Two.Path(outerVertices.concat(innerVertices.reverse()), true);
                            if (styleChoice < 0.5) {
                                scallopPath.fill = layerColor;
                                scallopPath.noStroke();
                            } else if (styleChoice < 0.85) {
                                scallopPath.noFill();
                                scallopPath.stroke = layerColor;
                                scallopPath.linewidth = 1.5;
                            } else {
                                scallopPath.fill = layerColor;
                                scallopPath.stroke = contrastColor;
                                scallopPath.linewidth = 2;
                            }
                            two.add(scallopPath);
                        }
                        break;

                    case 8: // Dotted Ring (FIXED)
                        // **FIX**: This shape is now correctly centered using layerCenterRadius
                        const dotX_st = center.x + layerCenterRadius * Math.cos(angle);
                        const dotY_st = center.y + layerCenterRadius * Math.sin(angle);
                        const dot_st = two.makeCircle(dotX_st, dotY_st, 3);
                        if (styleChoice < 0.5) {
                            dot_st.fill = layerColor;
                            dot_st.noStroke();
                        } else if (styleChoice < 0.85) {
                            dot_st.noFill();
                            dot_st.stroke = layerColor;
                            dot_st.linewidth = 1.5;
                        } else {
                            dot_st.fill = layerColor;
                            dot_st.stroke = contrastColor;
                            dot_st.linewidth = 2;
                        }
                        break;

                    case 9: // Triangles
                        const angleStepTriangle = (Math.PI * 2) / symmetry;
                        const t1 = new Two.Vector(center.x + layerRadius * Math.cos(angle), center.y + layerRadius * Math.sin(angle));
                        const t2 = new Two.Vector(center.x + innerRadius * Math.cos(angle - angleStepTriangle / 2.5), center.y + innerRadius * Math.sin(angle - angleStepTriangle / 2.5));
                        const t3 = new Two.Vector(center.x + innerRadius * Math.cos(angle + angleStepTriangle / 2.5), center.y + innerRadius * Math.sin(angle + angleStepTriangle / 2.5));
                        const triangle = new Two.Path([t1, t2, t3], true);
                        if (styleChoice < 0.5) {
                            triangle.fill = layerColor;
                            triangle.noStroke();
                        } else if (styleChoice < 0.85) {
                            triangle.noFill();
                            triangle.stroke = layerColor;
                            triangle.linewidth = 1.5;
                        } else {
                            triangle.fill = layerColor;
                            triangle.stroke = contrastColor;
                            triangle.linewidth = 2;
                        }
                        two.add(triangle);
                        break;

                    case 10: // Super-ellipse
                        const shapeSize = Math.min(layerWidth * 0.8, (Math.PI * 2 * layerCenterRadius) / symmetry * 0.8);
                        const corner = shapeSize * 0.5 * prng.nextFloat()
                        const superellipse_st = two.makeRoundedRectangle(0, 0, shapeSize, shapeSize, corner);
                        if (styleChoice < 0.5) {
                            superellipse_st.fill = layerColor;
                            superellipse_st.noStroke();
                        } else if (styleChoice < 0.85) {
                            superellipse_st.noFill();
                            superellipse_st.stroke = layerColor;
                            superellipse_st.linewidth = 1.5;
                        } else {
                            superellipse_st.fill = layerColor;
                            superellipse_st.stroke = contrastColor;
                            superellipse_st.linewidth = 2;
                        }
                        superellipse_st.rotation = angle;
                        superellipse_st.translation.set(center.x + layerCenterRadius * Math.cos(angle), center.y + layerCenterRadius * Math.sin(angle));
                        break;

                    case 11: // Dashed Line Ring
                        if (j === 0) {
                            const ring = two.makeCircle(center.x, center.y, layerCenterRadius);
                            ring.noFill();
                            ring.stroke = layerColor;
                            ring.linewidth = 1.5;
                            const circumference = Math.PI * 2 * layerCenterRadius;
                            const dashLength = circumference / symmetry / 2;
                            (ring as any).dashes = [dashLength, dashLength * (0.5 + prng.nextFloat())];
                        }
                        break;

                    case 12: // Teardrop Petals
                        const teardropLength = layerWidth * 0.9;
                        const teardropWidth = (Math.PI * 2 * innerRadius) / symmetry * 0.4;
                        const teardrop = two.makeEllipse(0, 0, teardropLength / 2, teardropWidth / 2);
                        teardrop.vertices[0].x -= teardropLength * 0.25;
                        if (styleChoice < 0.5) {
                            teardrop.fill = layerColor;
                            teardrop.noStroke();
                        } else if (styleChoice < 0.85) {
                            teardrop.noFill();
                            teardrop.stroke = layerColor;
                            teardrop.linewidth = 1.5;
                        } else {
                            teardrop.fill = layerColor;
                            teardrop.stroke = contrastColor;
                            teardrop.linewidth = 2;
                        }
                        teardrop.rotation = angle;
                        teardrop.translation.set(center.x + (innerRadius + teardropLength / 2) * Math.cos(angle), center.y + (innerRadius + teardropLength / 2) * Math.sin(angle));
                        two.add(teardrop);
                        break;

                    case 13: // Leaf Petals
                        const leafLength_st = layerWidth;
                        const leafWidth_st = (Math.PI * 2 * innerRadius) / symmetry * 0.5;
                        const leaf_st = new Two.Path([new Two.Anchor(0, 0), new Two.Anchor(leafLength_st / 2, -leafWidth_st / 2), new Two.Anchor(leafLength_st, 0), new Two.Anchor(leafLength_st / 2, leafWidth_st / 2)], true, true);
                        if (styleChoice < 0.5) {
                            leaf_st.fill = layerColor;
                            leaf_st.noStroke();
                        } else if (styleChoice < 0.85) {
                            leaf_st.noFill();
                            leaf_st.stroke = layerColor;
                            leaf_st.linewidth = 1.5;
                        } else {
                            leaf_st.fill = layerColor;
                            leaf_st.stroke = contrastColor;
                            leaf_st.linewidth = 2;
                        }
                        leaf_st.rotation = angle;
                        leaf_st.translation.set(center.x + innerRadius * Math.cos(angle), center.y + innerRadius * Math.sin(angle));
                        two.add(leaf_st);
                        break;
                }
            }
        }
        two.update();
    }, [layers, symmetry, seed, layerWidthType, isSeparated, activeLayer, showBoundaries, mandalaStyle]);

    return (
        <div>
            <div ref={containerRef} id="mandala-canvas-react"></div>
        </div>
    );
};
