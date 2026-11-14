const paths = {
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowUpRight: 'M7 17 17 7M8 7h9v9',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  pin: 'M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z M12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  code: 'M9 18l-6-6 6-6M15 6l6 6-6 6',
  trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3',
  sparkles: 'M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3ZM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z',
  users: 'M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 20v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM16 8l-2.3 5.7L8 16l2.3-5.7L16 8Z',
  shield: 'M12 22s8-3.4 8-9.5V6l-8-3-8 3v6.5C4 18.6 12 22 12 22Z',
  check: 'M4 12.5 9 17.5 20 6.5',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  chevronDown: 'M6 9l6 6 6-6',
  instagram:
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM17.5 6.5h.01',
  linkedin:
    'M4 9v11M4 4.5v.01M10 20V9M10 13.5a4 4 0 0 1 8 0V20',
  github:
    'M9 19c-4 1.4-4-2.2-6-2.7m12 5.2v-3.6a3.1 3.1 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.3-3.9 1.4a13.3 13.3 0 0 0-7 0C4.6 1.4 3.4 1.7 3.4 1.7a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 1.9 9c0 5 3 6.3 6 6.6a3.1 3.1 0 0 0-.9 2.4v3.6',
  plus: 'M12 5v14M5 12h14',
  star: 'M12 3l2.9 6.2 6.6.9-4.9 4.6 1.2 6.6L12 18.2 5.2 21.3l1.2-6.6L1.5 10.1l6.6-.9L12 3Z',
}

export default function Icon({ name, size = 18, className = '', strokeWidth = 1.6 }) {
  const d = paths[name]
  if (!d) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {d.split(' M').map((segment, i) => (
        <path key={i} d={i === 0 ? segment : `M${segment}`} />
      ))}
    </svg>
  )
}
