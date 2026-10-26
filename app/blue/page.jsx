
"use client";

export default function Home() {
    const seed = 8;
    const animate = false;

    return (
        <main
            style={{
                position: "relative",
                minHeight: "100vh",
                width: "100%",
                overflow: "hidden",
                background: "#0a86bf",
            }}
        >
            {/* Ocean wave background */}
            <svg
                viewBox="0 0 1600 660"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            >
                <defs>
                    {/* Blue and turquoise flowing water */}
                    <filter
                        id="wave-water"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.0022 0.013"
                            numOctaves="4"
                            seed={seed}
                            result="noise"
                        >
                            {animate && (
                                <animate
                                    attributeName="baseFrequency"
                                    dur="40s"
                                    repeatCount="indefinite"
                                    values="0.0022 0.013; 0.0030 0.015; 0.0022 0.013"
                                />
                            )}
                        </feTurbulence>

                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.0015 0.004"
                            numOctaves="2"
                            seed={seed + 3}
                            result="warp"
                        />

                        <feDisplacementMap
                            in="noise"
                            in2="warp"
                            scale="260"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="bent"
                        />

                        <feColorMatrix
                            in="bent"
                            type="matrix"
                            values="1 0 0 0 0
                      1 0 0 0 0
                      1 0 0 0 0
                      0 0 0 0 1"
                            result="grey"
                        />

                        <feComponentTransfer in="grey" result="contrast">
                            <feFuncR
                                type="linear"
                                slope="2.6"
                                intercept="-0.78"
                            />
                            <feFuncG
                                type="linear"
                                slope="2.6"
                                intercept="-0.78"
                            />
                            <feFuncB
                                type="linear"
                                slope="2.6"
                                intercept="-0.78"
                            />
                        </feComponentTransfer>

                        <feComponentTransfer in="contrast" result="coloured">
                            <feFuncR
                                type="table"
                                tableValues="0.03 0.04 0.04 0.16 0.49 0.81 0.96"
                            />
                            <feFuncG
                                type="table"
                                tableValues="0.23 0.37 0.53 0.68 0.81 0.92 0.98"
                            />
                            <feFuncB
                                type="table"
                                tableValues="0.43 0.61 0.75 0.84 0.89 0.95 0.98"
                            />
                        </feComponentTransfer>

                        <feGaussianBlur
                            in="coloured"
                            stdDeviation="22 2.5"
                        />
                    </filter>

                    {/* Soft white ocean foam */}
                    <filter
                        id="wave-foam"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.0028 0.022"
                            numOctaves="4"
                            seed={seed + 11}
                            result="n"
                        />

                        <feColorMatrix
                            in="n"
                            type="matrix"
                            values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      4.2 0 0 0 -1.75"
                        />

                        <feGaussianBlur stdDeviation="26 3" />
                    </filter>

                    {/* Foam positioning gradients */}
                    <radialGradient
                        id="foam-bottom"
                        cx="0.8"
                        cy="1.05"
                        r="0.62"
                        gradientTransform="translate(0.8 1.05) scale(1.25 0.8) translate(-0.8 -1.05)"
                    >
                        <stop offset="0" stopColor="#fff" />
                        <stop
                            offset="0.55"
                            stopColor="#fff"
                            stopOpacity="0.75"
                        />
                        <stop
                            offset="1"
                            stopColor="#fff"
                            stopOpacity="0"
                        />
                    </radialGradient>

                    <radialGradient
                        id="foam-right"
                        cx="1"
                        cy="0.2"
                        r="0.4"
                    >
                        <stop offset="0" stopColor="#fff" />
                        <stop
                            offset="1"
                            stopColor="#fff"
                            stopOpacity="0"
                        />
                    </radialGradient>

                    <radialGradient
                        id="foam-left"
                        cx="0.05"
                        cy="0.82"
                        r="0.3"
                    >
                        <stop
                            offset="0"
                            stopColor="#fff"
                            stopOpacity="0.85"
                        />
                        <stop
                            offset="1"
                            stopColor="#fff"
                            stopOpacity="0"
                        />
                    </radialGradient>

                    <mask id="foam-mask">
                        <rect
                            width="1600"
                            height="660"
                            fill="url(#foam-bottom)"
                        />
                        <rect
                            width="1600"
                            height="660"
                            fill="url(#foam-right)"
                        />
                        <rect
                            width="1600"
                            height="660"
                            fill="url(#foam-left)"
                        />
                    </mask>

                    {/* Deep blue shading */}
                    <linearGradient
                        id="wave-shade"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0"
                            stopColor="#06335f"
                            stopOpacity="0.55"
                        />
                        <stop
                            offset="0.45"
                            stopColor="#06335f"
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                {/* Background base */}
                <rect
                    width="1600"
                    height="660"
                    fill="#0a86bf"
                />

                {/* Flowing water streaks */}
                <g transform="rotate(-9 800 330)">
                    <rect
                        x="-400"
                        y="-400"
                        width="2400"
                        height="1460"
                        filter="url(#wave-water)"
                    />
                </g>

                {/* Dark upper-water shading */}
                <rect
                    width="1600"
                    height="660"
                    fill="url(#wave-shade)"
                />

                {/* Diagonal white foam */}
                <g mask="url(#foam-mask)">
                    <g transform="rotate(-14 800 330)">
                        <rect
                            x="-400"
                            y="-400"
                            width="2400"
                            height="1460"
                            filter="url(#wave-foam)"
                        />
                    </g>
                </g>
            </svg>

            {/* Add your own content here if needed */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100vh",
                    pointerEvents: "none",
                }}
            />
        </main>
    );
}
