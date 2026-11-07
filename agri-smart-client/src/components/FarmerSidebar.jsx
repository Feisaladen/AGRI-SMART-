import { useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Chevron, Home, LogOut, Plus, Sparkles, Store, Wallet } from './Icons'

const navLinks = [
  { label: 'Dashboard', path: '/farmer/dashboard', icon: Home },
  { label: 'Products', path: '/farmer/products', icon: Store },
  { label: 'Add', path: '/farmer/add-product', icon: Plus },
  { label: 'Orders', path: '/farmer/orders', icon: Box },
  { label: 'Payments', path: '/farmer/payments', icon: Wallet },
  { label: 'AI', path: '/farmer/ai-advisor', icon: Sparkles },
]

const FarmerSidebar = ({ dashboard }) => {
  const { signOut } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <aside className={`hidden lg:flex lg:flex-col lg:justify-between bg-linear-to-b from-leaf-900 to-leaf-950 px-3 py-8 text-white transition-all duration-300 ${collapsed ? 'lg:w-16' : 'lg:w-64'}`}>
        <div>
          <div className={`mb-8 ${collapsed ? 'items-center' : ''}`}>
            {!collapsed && (
              <>
                <p className="px-2 text-xs font-medium uppercase tracking-[0.22em] text-leaf-300">Agri-Smart</p>
                <h2 className="mt-1 px-2 text-lg font-semibold leading-tight tracking-tight text-gold-300">Kilimo chako, soko lako</h2>
                <div className="mt-3 h-px bg-white/10" />
                <div className="mt-4 flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-leaf-950">
                    {user?.firstName?.[0]?.toUpperCase() || 'F'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Welcome back, {user?.firstName || 'Farmer'}</p>
                    <p className="truncate text-xs text-leaf-300">{dashboard?.county || ''}</p>
                  </div>
                </div>
              </>
            )}
            {collapsed && (
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-leaf-950">
                  {user?.firstName?.[0]?.toUpperCase() || 'F'}
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
            onClick={() => signOut({ redirectUrl: '/' })}
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
                className={`flex min-w-0 flex-1 flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
                  isActive ? 'bg-leaf-50 text-leaf-700' : 'text-stone-500'
                }`}
              >
                <link.icon className="mb-0.5 h-5 w-5" />
                <span className="truncate">{link.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default FarmerSidebar
