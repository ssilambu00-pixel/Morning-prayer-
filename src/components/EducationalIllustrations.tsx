import React from "react";

// Section 1: Thiruvalluvar Badge / Palm Leaf Feather Icon
export const ThiruvalluvarIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
    {/* Thiruvalluvar Silhouette head and beard */}
    <circle cx="24" cy="16" r="6" fill="#78350F" />
    <path d="M 18 20 C 18 20 18 34 24 36 C 30 34 30 20 30 20 Z" fill="#92400E" />
    <path d="M 21 16 Q 24 19 27 16" stroke="#FEF3C7" strokeWidth="1" />
    {/* Feather quill across */}
    <path d="M 32 34 Q 38 24 42 12 Q 36 18 28 26 Z" fill="#F59E0B" />
    <line x1="26" y1="28" x2="33" y2="35" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Section 2: Vocabulary & Dictionary Icon
export const VocabularyIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="40" height="32" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
    <line x1="24" y1="8" x2="24" y2="40" stroke="#93C5FD" strokeWidth="2" />
    <text x="14" y="24" fill="#1D4ED8" fontSize="12" fontWeight="bold" textAnchor="middle">
      A
    </text>
    <text x="34" y="25" fill="#DC2626" fontSize="11" fontWeight="bold" textAnchor="middle">
      அ
    </text>
    <line x1="8" y1="31" x2="20" y2="31" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="31" x2="40" y2="31" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Section 3: Conceptual Mathematics (Ruler, Compass, Geometry)
export const MathConceptIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
    {/* Geometric Triangle */}
    <polygon points="12,34 36,34 24,14" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" />
    {/* Right angle marker or Pi symbol */}
    <text x="24" y="30" fill="#166534" fontSize="11" fontWeight="bold" textAnchor="middle">
      π
    </text>
    {/* Small compass needle */}
    <line x1="24" y1="8" x2="24" y2="13" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Section 4: Science GK (Microscope, Flask, Atom)
export const ScienceIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
    {/* Laboratory Flask */}
    <path
      d="M 21 14 L 27 14 L 27 20 L 33 32 C 34 34 32 36 29 36 L 19 36 C 16 36 14 34 15 32 L 21 20 Z"
      fill="#EDE9FE"
      stroke="#6D28D9"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Liquid inside */}
    <path d="M 17 31 C 20 30 28 32 31 31 L 29 35 L 19 35 Z" fill="#8B5CF6" />
    {/* Bubbles */}
    <circle cx="23" cy="28" r="1.5" fill="#FFFFFF" />
    <circle cx="26" cy="25" r="1" fill="#FFFFFF" />
    {/* Orbit lines */}
    <ellipse cx="24" cy="24" rx="16" ry="6" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 2" transform="rotate(-30 24 24)" />
  </svg>
);

// Section 5: Social Science (Globe & India Map motif)
export const SocialScienceIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
    {/* Globe circle with parallels */}
    <circle cx="24" cy="24" r="15" fill="#FFEDD5" stroke="#C2410C" strokeWidth="1.8" />
    <ellipse cx="24" cy="24" rx="8" ry="15" stroke="#EA580C" strokeWidth="1.2" fill="none" />
    <line x1="9" y1="24" x2="39" y2="24" stroke="#EA580C" strokeWidth="1.2" />
    <line x1="12" y1="18" x2="36" y2="18" stroke="#FDBA74" strokeWidth="1" />
    <line x1="12" y1="30" x2="36" y2="30" stroke="#FDBA74" strokeWidth="1" />
    {/* Small Ashoka Chakra dot */}
    <circle cx="24" cy="24" r="2" fill="#1E3A8A" />
  </svg>
);

// Section 6: Physical Education / Sports
export const SportsIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#EFF6FF" stroke="#0284C7" strokeWidth="2" />
    {/* Football / Soccer Ball */}
    <circle cx="18" cy="22" r="11" fill="#FFFFFF" stroke="#0369A1" strokeWidth="1.8" />
    <polygon points="18,17 21,19 20,23 16,23 15,19" fill="#0C4A6E" />
    {/* Running athlete or trophy */}
    <path
      d="M 30 14 L 38 14 L 38 22 C 38 26 34 29 34 29 L 34 33 L 38 35 L 30 35 L 34 33 L 34 29 C 34 29 30 26 30 22 Z"
      fill="#F59E0B"
      stroke="#D97706"
      strokeWidth="1.2"
    />
  </svg>
);

// Section 7: General Knowledge (Lightbulb & Spark of Knowledge)
export const GeneralKnowledgeIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#FEFCE8" stroke="#CA8A04" strokeWidth="2" />
    {/* Bulb glass */}
    <path
      d="M 18 20 C 18 14 30 14 30 20 C 30 24 27 26 27 29 L 21 29 C 21 26 18 24 18 20 Z"
      fill="#FEF08A"
      stroke="#A16207"
      strokeWidth="1.8"
    />
    {/* Base screw */}
    <rect x="21" y="29" width="6" height="3" fill="#D4D4D8" stroke="#71717A" strokeWidth="1" />
    <rect x="22" y="32" width="4" height="2" fill="#A1A1AA" />
    {/* Glowing light rays */}
    <line x1="24" y1="8" x2="24" y2="11" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
    <line x1="13" y1="13" x2="15" y2="15" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
    <line x1="35" y1="13" x2="33" y2="15" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Section 8: Abbreviation & Full Form
export const AbbreviationIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2" />
    {/* Letter blocks */}
    <rect x="10" y="16" width="12" height="14" rx="2" fill="#FCE7F3" stroke="#BE185D" strokeWidth="1.5" />
    <text x="16" y="27" fill="#BE185D" fontSize="10" fontWeight="bold" textAnchor="middle">
      A
    </text>
    <rect x="26" y="16" width="12" height="14" rx="2" fill="#DB2777" stroke="#9D174D" strokeWidth="1.5" />
    <text x="32" y="27" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
      B
    </text>
    {/* Arrow indicating expansion */}
    <path d="M 20 34 L 28 34" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
    <polyline points="26,32 29,34 26,36" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Section 9: Proverb (Wisdom Scroll / Tree)
export const ProverbIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#F0FDF4" stroke="#059669" strokeWidth="2" />
    {/* Scroll */}
    <path
      d="M 12 14 C 12 12 14 10 17 10 L 32 10 C 35 10 36 12 36 14 L 36 32 C 36 34 34 36 31 36 L 16 36 C 13 36 12 34 12 32 Z"
      fill="#DCFCE7"
      stroke="#047857"
      strokeWidth="1.8"
    />
    {/* Text lines */}
    <line x1="16" y1="18" x2="31" y2="18" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="23" x2="31" y2="23" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="28" x2="26" y2="28" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
    {/* Wisdom laurel leaf */}
    <circle cx="33" cy="33" r="5" fill="#F59E0B" />
    <text x="33" y="36" fill="#78350F" fontSize="7" fontWeight="bold" textAnchor="middle">
      ★
    </text>
  </svg>
);

// Cheerful Schoolchildren and Floral Garland Footer Elements
export const FooterGarlandBanner: React.FC = () => (
  <div className="flex items-center justify-between w-full px-4 py-1.5 opacity-90">
    {/* Left floral arrangement */}
    <div className="flex items-center gap-1.5 text-emerald-600">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#F59E0B" />
        <circle cx="12" cy="6" r="3" fill="#EF4444" />
        <circle cx="12" cy="18" r="3" fill="#EF4444" />
        <circle cx="6" cy="12" r="3" fill="#EF4444" />
        <circle cx="18" cy="12" r="3" fill="#EF4444" />
      </svg>
      <span className="text-xs font-semibold text-emerald-700">🌱 கல்விச் சோலை</span>
    </div>

    {/* Center Cheerful Tamil Schoolchildren vector silhouette */}
    <div className="flex items-center gap-3">
      {/* Student 1: Schoolgirl with braids and school bag */}
      <svg width="28" height="34" viewBox="0 0 32 40" fill="none">
        <circle cx="16" cy="10" r="6" fill="#78350F" />
        {/* Braids */}
        <path d="M 10 10 Q 7 16 6 20" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        <path d="M 22 10 Q 25 16 26 20" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        {/* Uniform Dress (Tamil Nadu Govt school uniform: navy blue pinafore / blue shirt) */}
        <path d="M 12 17 L 20 17 L 24 32 L 8 32 Z" fill="#1D4ED8" />
        <path d="M 13 17 L 19 17 L 19 23 L 13 23 Z" fill="#FFFFFF" />
        {/* Book in hand */}
        <rect x="4" y="20" width="6" height="8" rx="1" fill="#EA580C" />
      </svg>

      {/* Stack of books */}
      <svg width="24" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="18" width="18" height="4" rx="1" fill="#B91C1C" />
        <rect x="4" y="13" width="16" height="4" rx="1" fill="#2563EB" />
        <rect x="5" y="8" width="14" height="4" rx="1" fill="#059669" />
        <rect x="6" y="3" width="12" height="4" rx="1" fill="#D97706" />
      </svg>

      {/* Student 2: Schoolboy with bag and pencil */}
      <svg width="28" height="34" viewBox="0 0 32 40" fill="none">
        <circle cx="16" cy="10" r="6" fill="#78350F" />
        {/* Hair */}
        <path d="M 11 8 C 11 5 21 5 21 8" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        {/* Uniform Shirt & shorts */}
        <path d="M 10 17 L 22 17 L 20 27 L 12 27 Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
        <path d="M 11 27 L 21 27 L 22 34 L 10 34 Z" fill="#1E3A8A" />
        {/* Pencil in hand */}
        <line x1="24" y1="20" x2="28" y2="12" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="28,12 29,9 31,13" fill="#DC2626" />
      </svg>
    </div>

    {/* Right floral arrangement */}
    <div className="flex items-center gap-1.5 text-emerald-600">
      <span className="text-xs font-semibold text-emerald-700">வெற்றி நிச்சயம் ⭐</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#F59E0B" />
        <circle cx="12" cy="6" r="3" fill="#EF4444" />
        <circle cx="12" cy="18" r="3" fill="#EF4444" />
        <circle cx="6" cy="12" r="3" fill="#EF4444" />
        <circle cx="18" cy="12" r="3" fill="#EF4444" />
      </svg>
    </div>
  </div>
);
