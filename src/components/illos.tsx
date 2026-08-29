type Size = { size?: number; className?: string }

export function YouziMascot({ size = 128, className = '' }: Size) {
  return (
    <svg
      className={`illo youzi ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <ellipse className="illo-shadow" cx="60" cy="108" rx="28" ry="6" fill="rgba(26,104,64,0.14)" />
      <g className="illo-bounce">
        <path d="M78 28c6-14 18-16 22-8 3 7-4 14-14 18" fill="#7bc45a" />
        <ellipse cx="84" cy="22" rx="7" ry="11" fill="#8fd46a" transform="rotate(-28 84 22)" />
        <ellipse cx="60" cy="66" rx="38" ry="40" fill="#d8ef6a" />
        <ellipse cx="60" cy="70" rx="32" ry="32" fill="#f6f28a" />
        <ellipse cx="46" cy="62" rx="10" ry="7" fill="#fff7b8" opacity="0.7" />
        <circle className="illo-blink" cx="46" cy="64" r="4.2" fill="#3a3a3a" />
        <circle className="illo-blink" cx="74" cy="64" r="4.2" fill="#3a3a3a" />
        <circle cx="47.5" cy="62.5" r="1.3" fill="#fff" />
        <circle cx="75.5" cy="62.5" r="1.3" fill="#fff" />
        <ellipse cx="40" cy="74" rx="6" ry="3.2" fill="#ffb3b3" opacity="0.85" />
        <ellipse cx="80" cy="74" rx="6" ry="3.2" fill="#ffb3b3" opacity="0.85" />
        <path d="M52 80c4 7 12 7 16 0" fill="none" stroke="#e07a4a" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function SuiyuanScene({ className = '' }: { className?: string }) {
  return (
    <svg className={`illo campus-scene ${className}`} viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" rx="28" fill="#fff4dd" />
      <circle className="illo-float" cx="268" cy="36" r="18" fill="#ffe08a" />
      <path d="M0 148c40-18 80-10 120-18 44-8 70 6 110 0 36-6 58 8 90 2v68H0z" fill="#e8d7a8" />
      <g className="illo-sway" style={{ transformOrigin: '70px 70px' }}>
        <path d="M28 92c18-28 40-28 52 2" fill="none" stroke="#c9a0d8" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="34" cy="78" rx="8" ry="12" fill="#d7b4ea" />
        <ellipse cx="48" cy="70" rx="9" ry="13" fill="#c79de0" />
        <ellipse cx="62" cy="78" rx="8" ry="12" fill="#e2c4f2" />
      </g>
      <g transform="translate(96 46)">
        <path className="illo-sway" d="M8 38 L18 8 H142 L152 38 Z" fill="#3d9a68" />
        <path d="M18 8h124l-8-16H26z" fill="#2f7d54" />
        <rect x="22" y="38" width="116" height="70" rx="6" fill="#f6e2b0" />
        <rect x="32" y="38" width="10" height="70" fill="#d45a48" />
        <rect x="58" y="38" width="10" height="70" fill="#d45a48" />
        <rect x="92" y="38" width="10" height="70" fill="#d45a48" />
        <rect x="118" y="38" width="10" height="70" fill="#d45a48" />
        <rect x="72" y="58" width="18" height="28" rx="4" fill="#fff8e8" />
        <rect x="44" y="62" width="12" height="16" rx="3" fill="#fff1c9" />
        <rect x="104" y="62" width="12" height="16" rx="3" fill="#fff1c9" />
      </g>
      <g className="illo-bounce" transform="translate(248 128)">
        <ellipse cx="18" cy="22" rx="14" ry="10" fill="#f3c27a" />
        <circle cx="12" cy="20" r="1.6" fill="#3a3a3a" />
        <circle cx="20" cy="20" r="1.6" fill="#3a3a3a" />
        <path d="M14 25c2 2 6 2 8 0" stroke="#c07a48" fill="none" strokeWidth="1.4" />
        <path className="illo-wag" d="M30 18c8-2 10 6 4 8" fill="none" stroke="#f3c27a" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g className="illo-petal">
        <ellipse cx="40" cy="40" rx="4" ry="7" fill="#e8b4f0" />
      </g>
      <g className="illo-petal delay-2">
        <ellipse cx="210" cy="24" rx="4" ry="7" fill="#f0c4a0" />
      </g>
      <g className="illo-petal delay-4">
        <ellipse cx="290" cy="70" rx="3.5" ry="6" fill="#d7b4ea" />
      </g>
    </svg>
  )
}

export function XianlinScene({ className = '' }: { className?: string }) {
  return (
    <svg className={`illo campus-scene ${className}`} viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" rx="28" fill="#eaf3fb" />
      <ellipse className="illo-drift" cx="70" cy="40" rx="28" ry="12" fill="#fff" />
      <ellipse className="illo-drift delay-3" cx="250" cy="30" rx="22" ry="10" fill="#fff" />
      <polygon points="248,118 262,38 276,118" fill="#9bb3c9" />
      <polygon className="illo-twinkle" points="262,22 266,36 262,34 258,36" fill="#f0d56a" />
      <ellipse cx="160" cy="168" rx="90" ry="16" fill="#c5e4f4" />
      <circle className="illo-twinkle" cx="132" cy="164" r="3" fill="#fff" />
      <circle className="illo-twinkle delay-2" cx="176" cy="160" r="2.4" fill="#fff" />
      <g transform="translate(78 64)">
        <rect x="8" y="18" width="18" height="88" rx="4" fill="#d7e1ea" />
        <rect x="138" y="18" width="18" height="88" rx="4" fill="#d7e1ea" />
        <rect x="8" y="8" width="148" height="22" rx="8" fill="#c9d6e2" />
        <rect x="28" y="12" width="108" height="14" rx="7" fill="#e8c65a" />
        <text x="82" y="23" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a6840">
          南师
        </text>
        <rect x="54" y="52" width="56" height="54" rx="6" fill="#f7fbfd" />
        <rect x="62" y="62" width="16" height="16" rx="3" fill="#d5eadc" />
        <rect x="86" y="62" width="16" height="16" rx="3" fill="#d5eadc" />
      </g>
      <g className="illo-petal delay-1">
        <ellipse cx="40" cy="90" rx="4" ry="7" fill="#f7b6c8" />
      </g>
      <g className="illo-petal delay-3">
        <ellipse cx="300" cy="86" rx="4" ry="7" fill="#f7b6c8" />
      </g>
    </svg>
  )
}

export function ZijinScene({ className = '' }: { className?: string }) {
  return (
    <svg className={`illo campus-scene ${className}`} viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" rx="28" fill="#e9f6ea" />
      <circle className="illo-float" cx="52" cy="40" r="16" fill="#ffe08a" />
      <path d="M20 150 L90 72 L160 150Z" fill="#8fbf8a" />
      <path d="M120 150 L200 58 L290 150Z" fill="#6fa87a" />
      <path d="M200 150 L262 86 L330 150Z" fill="#4e8f62" />
      <g transform="translate(34 96)">
        <polygon points="28,64 40,8 52,64" fill="#2f6b45" />
        <polygon points="18,64 40,22 62,64" fill="#3d8456" opacity="0.9" />
        <rect x="36" y="58" width="8" height="18" fill="#8a5a32" />
      </g>
      <g transform="translate(118 108)">
        <path d="M12 28 L24 8 H72 L84 28Z" fill="#3d9a68" />
        <rect x="20" y="28" width="56" height="36" rx="4" fill="#fff8e8" />
        <rect x="40" y="38" width="16" height="26" rx="3" fill="#d45a48" />
      </g>
      <g className="illo-drift">
        <ellipse cx="86" cy="48" rx="10" ry="4" fill="#fff" />
        <ellipse cx="96" cy="52" rx="14" ry="5" fill="#fff" />
      </g>
    </svg>
  )
}

export function MiniIllo({ kind }: { kind: 'around' | 'courses' | 'campus' }) {
  const common = {
    className: 'illo mini-illo',
    viewBox: '0 0 64 64',
    width: 48,
    height: 48,
    'aria-hidden': true as const,
  }

  if (kind === 'around') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="30" fill="#ffe9c8" />
        <path d="M18 40c0-12 28-12 28 0" fill="#f3b45a" />
        <rect x="22" y="24" width="20" height="16" rx="4" fill="#fff4dd" />
        <path d="M28 24c0-6 8-6 8 0" fill="none" stroke="#d45a48" strokeWidth="3" />
      </svg>
    )
  }

  if (kind === 'courses') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="30" fill="#e4f4ea" />
        <path d="M16 22h14c6 0 8 3 8 3s2-3 8-3h14v24H46s-6 4-14 4-14-4-14-4H16z" fill="#fff8e8" />
        <path d="M32 25v22" stroke="#1a6840" strokeWidth="2.4" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx="32" cy="32" r="30" fill="#eaf6e8" />
      <path d="M16 30h32l-6-10H22z" fill="#3d9a68" />
      <rect x="20" y="30" width="24" height="16" rx="3" fill="#fff8e8" />
      <rect x="29" y="36" width="6" height="10" rx="1.5" fill="#d45a48" />
    </svg>
  )
}

