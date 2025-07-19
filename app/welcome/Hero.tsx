import React from "react";
import { motion } from "framer-motion";

// Envelope icon props and component
export type EnvelopeProps = {
    size?: number;
    colorFrom?: string;
    colorTo?: string;
    style?: React.CSSProperties;
    className?: string;
    gradientId: string;
};

export function Envelope({ size = 48, colorFrom = '#2563eb', colorTo = '#9333ea', style, className, gradientId }: EnvelopeProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            className={className}
            style={style}
        >
            {/* Envelope body with soft gradient and shadow, slightly inset to avoid outline overlap */}
            <rect x="6.7" y="13.7" width="34.6" height="20.6" rx="7.3"
                fill={`url(#${gradientId}-body)`}
                filter="url(#shadow)"
            />
            {/* Flap and highlight, clipped to fit inside the outline */}
            <g clipPath={`url(#${gradientId}-clip)`}>
                <path d="M6.7 13.7 L24 26 L41.3 13.7 Q24 6.7 6.7 13.7" fill={`url(#${gradientId}-flap)`} />
                <path d="M10.7 15.2 Q24 10.7 37.3 15.2" fill="none" stroke="#fff" strokeWidth="1.1" opacity="0.5" />
            </g>
            {/* Bottom shadow for 3D effect */}
            <ellipse cx="24" cy="36" rx="13" ry="3.5" fill="#6366f1" opacity="0.08" />
            {/* Outline on top, not overlapped by other elements */}
            <rect x="6" y="13" width="36" height="22" rx="8"
                fill="none"
                stroke={`url(#${gradientId}-outline)`}
                strokeWidth={0.5}
                strokeOpacity={0.5}
            />
            <defs>
                <clipPath id={`${gradientId}-clip`}>
                    <rect x="6.7" y="13.7" width="34.6" height="20.6" rx="7.3" />
                </clipPath>
                <linearGradient id={`${gradientId}-body`} x1="6" y1="13" x2="42" y2="35" gradientUnits="userSpaceOnUse">
                    <stop stopColor={colorFrom} stopOpacity="0.10" />
                    <stop offset="1" stopColor={colorTo} stopOpacity="0.13" />
                </linearGradient>
                <linearGradient id={`${gradientId}-flap`} x1="6" y1="13" x2="42" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor={colorFrom} stopOpacity="0.18" />
                    <stop offset="1" stopColor={colorTo} stopOpacity="0.22" />
                </linearGradient>
                <linearGradient id={`${gradientId}-outline`} x1="6" y1="13" x2="42" y2="35" gradientUnits="userSpaceOnUse">
                    <stop stopColor={colorFrom} />
                    <stop offset="1" stopColor={colorTo} />
                </linearGradient>
                <filter id="shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#6366f1" floodOpacity="0.10" />
                </filter>
            </defs>
        </svg>
    );
}

// Generate a random curve path for the motion trail
function randomCurvePath(width: number, height: number): string {
    // Generate 3-4 random control points for a smooth curve
    const points = [
        { x: 0, y: Math.random() * height },
        { x: width * 0.3, y: Math.random() * height },
        { x: width * 0.6, y: Math.random() * height },
        { x: width, y: Math.random() * height }
    ];
    return `M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`;
}

// Generate random envelope and trail data
function getRandomEnvelopes(count: number) {
    // Each envelope will follow a random smooth path (Bezier-like) using keyframes
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Helper to pick a random edge and a point just outside it
    function randomEdgePoint(size: number) {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) return { x: -size, y: Math.random() * h }; // left
        if (edge === 1) return { x: w + size, y: Math.random() * h }; // right
        if (edge === 2) return { x: Math.random() * w, y: -size }; // top
        return { x: Math.random() * w, y: h + size }; // bottom
    }
    return Array.from({ length: count }).map((_, i) => {
        const size = 48 + Math.random() * 60;
        const rotate = Math.round(Math.random() * 30 - 15);
        const opacity = 0.3 + Math.random() * 0.5;
        const duration = 7 + Math.random() * 5;
        const delay = Math.random() * 7;
        const scale = 0.8 + Math.random() * 1.2;
        // Start and end just outside random edges
        const p0 = randomEdgePoint(size);
        let p3 = randomEdgePoint(size);
        // Ensure start and end are not too close
        let tries = 0;
        while (Math.abs(p0.x - p3.x) < w * 0.3 && Math.abs(p0.y - p3.y) < h * 0.3 && tries < 5) {
            p3 = randomEdgePoint(size);
            tries++;
        }
        // Control points inside viewport for a nice curve
        const p1 = { x: Math.random() * w * 0.8 + w * 0.1, y: Math.random() * h * 0.8 + h * 0.1 };
        const p2 = { x: Math.random() * w * 0.8 + w * 0.1, y: Math.random() * h * 0.8 + h * 0.1 };
        const xKeyframes = [p0.x, p1.x, p2.x, p3.x];
        const yKeyframes = [p0.y, p1.y, p2.y, p3.y];
        return {
            size,
            gradientId: `env${i}`,
            rotate,
            opacity,
            scale,
            duration,
            delay,
            xKeyframes,
            yKeyframes
        };
    });
}

function getRandomTrails(count: number) {
    // Directions: 0=left->right, 1=right->left, 2=top->bottom, 3=bottom->top, 4=diagonal
    return Array.from({ length: count }).map((_, i) => {
        const width = 300 + Math.random() * 400;
        const height = 40 + Math.random() * 60;
        const direction = Math.floor(Math.random() * 5);
        const opacity = 0.06 + Math.random() * 0.12;
        const duration = 7 + Math.random() * 5;
        const delay = Math.random() * 7;
        let start = {}, end = {};
        if (direction === 0) { // left to right
            const top = Math.random() * 80;
            start = { x: -width * 0.7, y: `${top}%` };
            end = { x: '100vw', y: `${top}%` };
        } else if (direction === 1) { // right to left
            const top = Math.random() * 80;
            start = { x: '100vw', y: `${top}%` };
            end = { x: -width * 0.7, y: `${top}%` };
        } else if (direction === 2) { // top to bottom
            const left = Math.random() * 80;
            start = { x: `${left}%`, y: -height };
            end = { x: `${left}%`, y: '100vh' };
        } else if (direction === 3) { // bottom to top
            const left = Math.random() * 80;
            start = { x: `${left}%`, y: '100vh' };
            end = { x: `${left}%`, y: -height };
        } else { // diagonal
            if (Math.random() > 0.5) {
                start = { x: -width * 0.7, y: -height };
                end = { x: '100vw', y: '100vh' };
            } else {
                start = { x: '100vw', y: '100vh' };
                end = { x: -width * 0.7, y: -height };
            }
        }
        return {
            width,
            height,
            path: randomCurvePath(width, height),
            opacity,
            duration,
            delay,
            start,
            end
        };
    });
}

export function Hero({ children }: { children?: React.ReactNode }) {
    // SSR-safe: initialize as empty, fill on client
    const [envelopes, setEnvelopes] = React.useState<any[]>([]);
    const [trails, setTrails] = React.useState<any[]>([]);
    const [fading, setFading] = React.useState(false);

    // On mount, generate initial envelopes/trails
    React.useEffect(() => {
        setEnvelopes(getRandomEnvelopes(6 + Math.floor(Math.random() * 5)));
        setTrails(getRandomTrails(2 + Math.floor(Math.random() * 4)));
    }, []);

    // Fade out, then randomize, then fade in
    React.useEffect(() => {
        if (envelopes.length === 0 && trails.length === 0) return;
        const fadeDuration = 1200; // ms, must match fade-out CSS
        const animDuration = 13000; // ms, matches max animation duration
        const timer = setTimeout(() => {
            setFading(true);
            setTimeout(() => {
                setEnvelopes(getRandomEnvelopes(6 + Math.floor(Math.random() * 5)));
                setTrails(getRandomTrails(2 + Math.floor(Math.random() * 4)));
                setFading(false);
            }, fadeDuration);
        }, animDuration - fadeDuration);
        return () => clearTimeout(timer);
    }, [envelopes, trails]);

    return (
        <section className="relative bg-gradient-to-br from-white via-slate-50 to-slate-200 py-20 px-6 overflow-hidden">
            {/* Animated email transfer background */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'}`}
                style={{ background: 'none' }}
            >
                {/* Randomized envelope icons with Framer Motion */}
                {envelopes.map((env, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            opacity: env.opacity,
                            filter: 'drop-shadow(0 4px 16px rgba(99,102,241,0.13))',
                        }}
                        initial={{ x: env.xKeyframes[0], y: env.yKeyframes[0], scale: env.scale, rotate: env.rotate }}
                        animate={{ x: env.xKeyframes, y: env.yKeyframes, scale: env.scale, rotate: env.rotate }}
                        transition={{
                            duration: env.duration,
                            delay: env.delay,
                            ease: 'easeInOut',
                        }}
                    >
                        <Envelope size={env.size} gradientId={env.gradientId} />
                    </motion.div>
                ))}
                {/* Randomized motion trails with Framer Motion */}
                {trails.map((trail, i) => (
                    <motion.svg
                        key={i}
                        width={trail.width}
                        height={trail.height}
                        viewBox={`0 0 ${trail.width} ${trail.height}`}
                        fill="none"
                        style={{
                            position: 'absolute',
                            opacity: trail.opacity,
                        }}
                        initial={trail.start}
                        animate={trail.end}
                        transition={{
                            duration: trail.duration,
                            delay: trail.delay,
                            ease: 'linear',
                        }}
                    >
                        <path d={trail.path} stroke="#6366f1" strokeWidth={6 + Math.random() * 10} fill="none" />
                    </motion.svg>
                ))}
            </div>
            <div className="max-w-6xl mx-auto text-center relative z-10">
                {children}
            </div>
        </section>
    );
}
