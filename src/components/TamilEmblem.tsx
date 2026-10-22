import React from "react";

// Official Tamil Nadu Government Emblem SVG vector
export const TamilNaduEmblem: React.FC<{ className?: string; size?: number }> = ({
  className = "w-16 h-16",
  size = 64,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`shrink-0 drop-shadow-sm ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle rings with traditional gold border */}
      <circle cx="100" cy="100" r="95" fill="#FFFDF5" stroke="#991B1B" strokeWidth="4" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="#047857" strokeWidth="2.5" />

      {/* Top Banner Text arc path simulation */}
      <path id="curveTop" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
      <text fill="#991B1B" fontSize="13" fontWeight="bold" letterSpacing="1">
        <textPath href="#curveTop" startOffset="50%" textAnchor="middle">
          தமிழ்நாடு அரசு
        </textPath>
      </text>

      {/* Bottom Motto Text arc */}
      <path id="curveBottom" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
      <text fill="#047857" fontSize="10.5" fontWeight="bold" letterSpacing="0.8">
        <textPath href="#curveBottom" startOffset="50%" textAnchor="middle">
          வாய்மையே வெல்லும்
        </textPath>
      </text>

      {/* Center Traditional Temple Gopuram (Srivilliputhur Gopuram - TN official emblem symbol) */}
      <g transform="translate(100, 102)">
        {/* Gopuram base tiers */}
        <path
          d="M -32 28 L 32 28 L 28 20 L -28 20 Z"
          fill="#B91C1C"
          stroke="#7F1D1D"
          strokeWidth="1.5"
        />
        <path
          d="M -26 20 L 26 20 L 22 10 L -22 10 Z"
          fill="#D97706"
          stroke="#B45309"
          strokeWidth="1.5"
        />
        <path
          d="M -20 10 L 20 10 L 16 0 L -16 0 Z"
          fill="#B91C1C"
          stroke="#7F1D1D"
          strokeWidth="1.5"
        />
        <path
          d="M -15 0 L 15 0 L 12 -12 L -12 -12 Z"
          fill="#D97706"
          stroke="#B45309"
          strokeWidth="1.5"
        />
        <path
          d="M -11 -12 L 11 -12 L 8 -22 L -8 -22 Z"
          fill="#B91C1C"
          stroke="#7F1D1D"
          strokeWidth="1.5"
        />
        <path
          d="M -7 -22 L 7 -22 L 4 -32 L -4 -32 Z"
          fill="#D97706"
          stroke="#B45309"
          strokeWidth="1.5"
        />

        {/* Kalasams at the summit */}
        <line x1="-3" y1="-32" x2="-3" y2="-37" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="-3" cy="-38" r="1.5" fill="#F59E0B" />
        <line x1="0" y1="-32" x2="0" y2="-39" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="0" cy="-40" r="2" fill="#F59E0B" />
        <line x1="3" y1="-32" x2="3" y2="-37" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="3" cy="-38" r="1.5" fill="#F59E0B" />

        {/* Gopuram arched entrance */}
        <path d="M -7 28 A 7 9 0 0 1 7 28 Z" fill="#1E293B" />

        {/* Ashoka Chakra in miniature below gopuram */}
        <circle cx="0" cy="35" r="5" fill="#1E3A8A" stroke="#2563EB" strokeWidth="0.8" />
        <circle cx="0" cy="35" r="1" fill="#FFFFFF" />
      </g>

      {/* Two miniature Indian national tricolour flags flanking the Gopuram */}
      <g transform="translate(48, 86)">
        <path d="M 0 0 L 14 -3 L 14 3 L 0 6 Z" fill="#FF9933" />
        <path d="M 0 6 L 14 3 L 14 9 L 0 12 Z" fill="#FFFFFF" />
        <path d="M 0 12 L 14 9 L 14 15 L 0 18 Z" fill="#138808" />
        <line x1="0" y1="-4" x2="0" y2="28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(152, 86) scale(-1, 1)">
        <path d="M 0 0 L 14 -3 L 14 3 L 0 6 Z" fill="#FF9933" />
        <path d="M 0 6 L 14 3 L 14 9 L 0 12 Z" fill="#FFFFFF" />
        <path d="M 0 12 L 14 9 L 14 15 L 0 18 Z" fill="#138808" />
        <line x1="0" y1="-4" x2="0" y2="28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// Green Tree of Knowledge Illustration (Top-Right)
export const GreenKnowledgeTree: React.FC<{ className?: string; size?: number }> = ({
  className = "w-16 h-16",
  size = 64,
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft background aura */}
      <circle cx="60" cy="55" r="45" fill="#ECFDF5" />

      {/* Tree Canopy layers */}
      <circle cx="60" cy="42" r="28" fill="#10B981" />
      <circle cx="42" cy="52" r="20" fill="#059669" />
      <circle cx="78" cy="52" r="20" fill="#047857" />
      <circle cx="60" cy="30" r="16" fill="#34D399" />
      <circle cx="48" cy="35" r="12" fill="#6EE7B7" />

      {/* Knowledge fruits / learning stars in tree */}
      <circle cx="45" cy="48" r="3" fill="#F59E0B" />
      <circle cx="72" cy="44" r="3" fill="#EF4444" />
      <circle cx="60" cy="24" r="3" fill="#FBBF24" />
      <circle cx="56" cy="40" r="2.5" fill="#38BDF8" />
      <circle cx="78" cy="58" r="2.5" fill="#F59E0B" />

      {/* Tree Trunk */}
      <path
        d="M 54 68 C 54 68 56 82 50 96 L 70 96 C 64 82 66 68 66 68 Z"
        fill="#78350F"
      />
      {/* Roots */}
      <path d="M 50 96 C 45 98 40 100 35 101" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 70 96 C 75 98 80 100 85 101" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />

      {/* Flying knowledge birds */}
      <path d="M 24 25 Q 28 20 32 25 Q 36 20 40 25" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 85 20 Q 88 16 91 20 Q 94 16 97 20" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Ground grass tuft */}
      <path d="M 28 100 Q 60 94 92 100" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// Open Book with Morning Sunrise below the heading
export const OpenBookWithSunrise: React.FC<{ className?: string }> = ({
  className = "w-44 h-12",
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 60" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Morning Sun behind book */}
        <circle cx="100" cy="26" r="16" fill="#FBBF24" />
        {/* Sun rays */}
        <line x1="100" y1="4" x2="100" y2="0" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <line x1="84" y1="12" x2="80" y2="8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <line x1="116" y1="12" x2="120" y2="8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="26" x2="66" y2="26" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <line x1="128" y1="26" x2="134" y2="26" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

        {/* Open Book Pages */}
        {/* Left page */}
        <path
          d="M 100 48 C 80 44 48 44 32 46 C 30 30 30 24 32 20 C 50 18 80 20 100 28 Z"
          fill="#FFFFFF"
          stroke="#1E3A8A"
          strokeWidth="1.8"
        />
        {/* Page lines left */}
        <line x1="42" y1="26" x2="88" y2="26" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="42" y1="32" x2="88" y2="32" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="42" y1="38" x2="80" y2="38" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />

        {/* Right page */}
        <path
          d="M 100 48 C 120 44 152 44 168 46 C 170 30 170 24 168 20 C 150 18 120 20 100 28 Z"
          fill="#FFFFFF"
          stroke="#1E3A8A"
          strokeWidth="1.8"
        />
        {/* Page lines right */}
        <line x1="112" y1="26" x2="158" y2="26" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="112" y1="32" x2="158" y2="32" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="120" y1="38" x2="158" y2="38" stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />

        {/* Center Book Spine */}
        <path d="M 100 27 L 100 52" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 100 52 C 94 54 80 54 70 52 L 72 49 C 82 50 94 50 100 48 Z" fill="#1E3A8A" />
        <path d="M 100 52 C 106 54 120 54 130 52 L 128 49 C 118 50 106 50 100 48 Z" fill="#1E3A8A" />
      </svg>
    </div>
  );
};
