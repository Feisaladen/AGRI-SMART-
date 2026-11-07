import { useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { Box, Cart, Chevron, Home, LogOut, Store } from './Icons'

const navLinks = [
  { label: 'Dashboard', path: '/buyer/home', icon: Home },
  { label: 'Market', path: '/buyer/marketplace', icon: Store },
  { label: 'Cart', path: '/buyer/cart', icon: Cart },
  { label: 'Orders', path: '/buyer/orders', icon: Box },
]

const BuyerSidebar = () => {
  const { signOut } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const { cartItems } = useCart()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <aside className={`hidden lg:flex lg:flex-col lg:justify-between bg-linear-to-b from-leaf-900 to-leaf-950 px-3 py-8 text-white transition-all duration-300 ${collapsed ? 'lg:w-16' : 'lg:w-64'}`}>
        <div>
          <div className="mb-8">
            {!collapsed && (
              <>
                <p className="px-2 text-xs font-medium uppercase tracking-[0.22em] text-leaf-300">Agri-Smart</p>
                <h2 className="mt-1 px-2 text-lg font-semibold leading-tight tracking-tight text-gold-300">Kilimo chako, soko lako</h2>
                <div className="mt-3 h-px bg-white/10" />
                <div className="mt-4 flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-leaf-950">
                    {user?.firstName?.[0]?.toUpperCase() || 'B'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Welcome back, {user?.firstName || 'there'}</p>
                    <p className="truncate text-xs text-leaf-300">{user?.emailAddresses?.[0]?.emailAddress || ''}</p>
                  </div>
                </div>
              </>
            )}
            {collapsed && (
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-leaf-950">
                  {user?.firstName?.[0]?.toUpperCase() || 'B'}
                </div>
              </div>
            )}
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.path} className="group relative">
                <button
                  type="button"
                  onClick={() => navigate(link.path)}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                    ${location.pathname === link.path
                      ? collapsed ? 'text-white' : 'bg-white/20 text-white'
                      : 'text-leaf-100 hover:bg-white/10 hover:text-white'
                    } ${collapsed ? 'justify-center' : ''}`}
                >
                  {collapsed && location.pathname === link.path && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-leaf-300" />
                  )}
                  <link.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && link.label}
                  {!collapsed && link.path === '/buyer/cart' && cartItems.length > 0 && (
                    <span key={cartItems.length} className="ml-auto animate-pop rounded-full bg-gold-500 px-2 py-0.5 text-xs font-semibold text-leaf-950">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {collapsed && (
                  <div className="pointer-events-none absolute left-14 top-1/2 z-50 -translate-y-1/2 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {link.label}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-leaf-300 transition hover:bg-white/10 ${collapsed ? 'justify-center' : ''}`}
          >
            <Chevron className={`h-5 w-5 shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && 'Collapse'}
          </button>
          <button
            type="button"
            onClick={() => signOut(() => navigate('/'))}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-rose-300 transition hover:bg-white/10 hover:text-rose-200 ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && 'Log Out'}
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-2 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => navigate(link.path)}
                className={`relative flex min-w-0 flex-1 flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                  isActive ? 'bg-leaf-50 text-leaf-700' : 'text-stone-500'
                }`}
              >
                <link.icon className="mb-0.5 h-5 w-5" />
                <span className="truncate">{link.label}</span>
                {link.path === '/buyer/cart' && cartItems.length > 0 && (
                  <span key={cartItems.length} className="absolute right-3 top-1 flex h-4 min-w-4 animate-pop items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {cartItems.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default BuyerSidebar
