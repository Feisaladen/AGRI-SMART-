/* eslint-disable react-refresh/only-export-components -- icon-only module built from a small factory */
const Icon = ({ children, className = 'h-5 w-5', filled = false }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? 'none' : 'currentColor'}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const make = (paths, filled) => {
  const Component = ({ className }) => <Icon className={className} filled={filled}>{paths}</Icon>
  return Component
}

export const Home = make(<><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>)
export const Store = make(<><path d="M4 9l1.5-5h13L20 9" /><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" /><path d="M5 12v8h14v-8" /></>)
export const Cart = make(<><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 12.5h11L21 7H6" /></>)
export const Box = make(<><path d="M12 2.5l8.5 4.7v9.6L12 21.5l-8.5-4.7V7.2z" /><path d="M3.5 7.2L12 12l8.5-4.8" /><path d="M12 12v9.5" /></>)
export const Plus = make(<path d="M12 5v14M5 12h14" />)
export const Minus = make(<path d="M5 12h14" />)
export const Check = make(<path d="M5 12.5l4.5 4.5L19 7.5" />)
export const Wallet = make(<><path d="M3 7a2 2 0 0 1 2-2h13v4" /><path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z" /><circle cx="16" cy="14.5" r="1" /></>)
export const Sparkles = make(<><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" /></>)
export const LogOut = make(<><path d="M9 4H5v16h4" /><path d="M15 16l4-4-4-4" /><path d="M19 12H9" /></>)
export const Chevron = make(<path d="M15 5l-7 7 7 7" />)
export const Bell = make(<><path d="M6 10a6 6 0 1 1 12 0c0 6 2.5 7 2.5 7h-17S6 16 6 10z" /><path d="M10 20.5a2.2 2.2 0 0 0 4 0" /></>)
export const Leaf = make(<path d="M20.5 3.5C11 3.5 4 8 4 15c0 1.7.6 3.4 1.6 4.8C6.5 13.8 10 10.5 15 9c-4 2.5-7 6-8 11.5 8.5 1.5 14.5-5 13.500-17z" />, true)
