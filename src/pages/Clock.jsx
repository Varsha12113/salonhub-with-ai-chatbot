import { useEffect, useState } from 'react';
 
export function Clock() {
  const [time, setTime] = useState(new Date());
 
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
 
    return () => clearInterval(timer);
  }, []);
 
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
 
  // Calculate rotation angles
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;
 
  return (
    <div className="relative flex items-center justify-center">
      {/* Clock container with shadow */}
      <div className="relative w-80 h-80 rounded-full shadow-2xl">
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          className="w-full h-full"
        >
          {/* Definitions for gradients and effects */}
          <defs>
            {/* Main background gradient */}
            <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C689FA" />
              <stop offset="70%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#7E22CE" />
            </radialGradient>
 
            {/* Glass reflection gradient */}
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
 
            {/* Inner shadow */}
            <filter id="innerShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
 
            {/* Center dot shadow */}
            <filter id="dropShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="1" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
 
          {/* Clock face background */}
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="url(#clockGradient)"
            filter="url(#innerShadow)"
          />
 
          {/* Glass reflection overlay */}
          <ellipse
            cx="160"
            cy="120"
            rx="120"
            ry="90"
            fill="url(#glassGradient)"
            opacity="0.6"
          />
 
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const isQuarter = i % 3 === 0;
            const innerRadius = isQuarter ? 118 : 128;
            const outerRadius = 140;
            const x1 = 160 + Math.sin(angle) * innerRadius;
            const y1 = 160 - Math.cos(angle) * innerRadius;
            const x2 = 160 + Math.sin(angle) * outerRadius;
            const y2 = 160 - Math.cos(angle) * outerRadius;
 
            return (
              <line
                key={`hour-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isQuarter ? '#8B5FBF' : '#9E7FA8'}
                strokeWidth={isQuarter ? 3 : 2}
                strokeLinecap="round"
                opacity="0.8"
              />
            );
          })}
 
          {/* Minute markers */}
          {[...Array(60)].map((_, i) => {
            if (i % 5 === 0) return null; // Skip hour positions
            const angle = (i * 6 * Math.PI) / 180;
            const innerRadius = 135;
            const outerRadius = 140;
            const x1 = 160 + Math.sin(angle) * innerRadius;
            const y1 = 160 - Math.cos(angle) * innerRadius;
            const x2 = 160 + Math.sin(angle) * outerRadius;
            const y2 = 160 - Math.cos(angle) * outerRadius;
 
            return (
              <line
                key={`minute-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#B8A0C0"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.4"
              />
            );
          })}
 
          {/* Clock numbers */}
          {[12, 3, 6, 9].map((num) => {
            const angle = ((num - 3) * 30 * Math.PI) / 180;
            const radius = 100;
            const x = 160 + Math.cos(angle) * radius;
            const y = 160 + Math.sin(angle) * radius;
 
            return (
              <text
                key={`num-${num}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255, 255, 255, 0.9)"
                fontSize="24"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="300"
              >
                {num}
              </text>
            );
          })}
 
          {/* Hour hand */}
          <g transform={`rotate(${hourAngle}, 160, 160)`}>
            <line
              x1="160"
              y1="160"
              x2="160"
              y2="95"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#dropShadow)"
            />
            <line
              x1="160"
              y1="160"
              x2="160"
              y2="95"
              stroke="#9E7FA8"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
 
          {/* Minute hand */}
          <g transform={`rotate(${minuteAngle}, 160, 160)`}>
            <line
              x1="160"
              y1="160"
              x2="160"
              y2="70"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#dropShadow)"
            />
            <line
              x1="160"
              y1="160"
              x2="160"
              y2="70"
              stroke="#B8A0C0"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
 
          {/* Second hand */}
          <g transform={`rotate(${secondAngle}, 160, 160)`}>
            <line
              x1="160"
              y1="175"
              x2="160"
              y2="60"
              stroke="#8B5FBF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="160" cy="60" r="3" fill="#8B5FBF" />
          </g>
 
          {/* Center dot */}
          <circle
            cx="160"
            cy="160"
            r="10"
            fill="rgba(255, 255, 255, 0.9)"
            filter="url(#dropShadow)"
          />
          <circle cx="160" cy="160" r="7" fill="#8B5FBF" />
        </svg>
      </div>
 
      {/* Digital time display */}
      <div className="absolute -bottom-12 text-center">
        <div className="text-[#9E7FA8] tracking-wider" style={{ fontFamily: 'Orbitron', fontWeight: '500', fontSize: '16px' }}>
          {time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
 
 