export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 魔法の杖 */}
            <g transform="rotate(-45 50 50)">
                <rect x="48" y="10" width="4" height="70" fill="currentColor" opacity="0.8"/>
                <circle cx="50" cy="8" r="6" fill="currentColor"/>
                <path d="M 50 8 L 45 2 M 50 8 L 55 2 M 50 8 L 48 0 M 50 8 L 52 0" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <circle cx="50" cy="8" r="3" fill="currentColor" opacity="0.4"/>
            </g>
            {/* キラキラエフェクト */}
            <g opacity="0.7">
                <path d="M 25 25 L 27 27 L 25 29 L 23 27 Z" fill="currentColor"/>
                <path d="M 75 20 L 77 22 L 75 24 L 73 22 Z" fill="currentColor"/>
                <path d="M 80 70 L 82 72 L 80 74 L 78 72 Z" fill="currentColor"/>
                <path d="M 20 75 L 22 77 L 20 79 L 18 77 Z" fill="currentColor"/>
            </g>
        </svg>
    );
}
