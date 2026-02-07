import { useEffect, useState } from 'react';

export default function LightParticles() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // 20個の光の粒子を生成
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 8,
            duration: Math.random() * 4 + 6,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="light-particles pointer-events-none">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: `${particle.left}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
