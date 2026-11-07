import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import toast from 'react-hot-toast'
import { useCart } from '../../../context/CartContext'
import BuyerSidebar from '../../components/BuyerSidebar'
import Topbar from '../../components/Topbar'
import CountUp from '../../components/CountUp'
import { Box, Cart, Leaf, Wallet } from '../../components/Icons'
import { DashboardSkeleton } from '../../components/Skeleton'

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800 ring-amber-200',
  confirmed: 'bg-sky-100 text-sky-800 ring-sky-200',
  delivered: 'bg-leaf-100 text-leaf-800 ring-leaf-200',
  cancelled: 'bg-rose-100 text-rose-800 ring-rose-200'
}

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { cartItems, total } = useCart()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) { setLoading(false); return }
    axios.get(`/api/orders/buyer/${user.id}`)
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false))
  }, [user?.id])

  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="flex min-h-screen bg-cream">
      <BuyerSidebar />

      <div className="flex flex-1 flex-col">
        <Topbar
          title="Dashboard"
          notificationCount={pendingOrders}
          notificationPath="/buyer/orders"
        />

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-5xl animate-rise space-y-6">

            {loading ? <DashboardSkeleton /> : (
              <>
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-leaf-700 to-leaf-900 px-6 py-5 text-white">
                  <Leaf className="absolute -right-3 -top-4 h-32 w-32 animate-sway text-white/10" />
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-leaf-200">Buyer Dashboard</p>
                  <h1 className="mt-1 text-2xl font-semibold">Welcome back, {user?.firstName || 'there'}</h1>
                  <p className="mt-1 text-sm text-leaf-200">Here is your shopping activity at a glance.</p>
                </div>

                {/* Stats */}
                <section className="grid gap-4 sm:grid-cols-3">
                  <div className="card-lift rounded-2xl border-l-4 border-leaf-500 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Cart Items</p>
                      <span className="rounded-lg bg-leaf-50 p-1.5 text-leaf-700"><Cart className="h-4 w-4" /></span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900"><CountUp value={cartItems.length} /></p>
                    <p className="mt-1 text-xs text-stone-400">Ready for checkout</p>
                  </div>
                  <div className="card-lift rounded-2xl border-l-4 border-gold-500 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Pending Orders</p>
                      <span className="rounded-lg bg-leaf-50 p-1.5 text-leaf-700"><Box className="h-4 w-4" /></span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900"><CountUp value={pendingOrders} /></p>
                    <p className="mt-1 text-xs text-stone-400">Awaiting delivery</p>
                  </div>
                  <div className="card-lift rounded-2xl border-l-4 border-leaf-800 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-stone-500">Cart Total</p>
                      <span className="rounded-lg bg-leaf-50 p-1.5 text-leaf-700"><Wallet className="h-4 w-4" /></span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-stone-900">KSh <CountUp value={total} /></p>
                    <p className="mt-1 text-xs text-stone-400">Current cart value</p>
                  </div>
                </section>

                {/* Recent Orders */}
                <section className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-stone-900">Recent Orders</h2>
                      <p className="mt-1 text-sm text-stone-500">Your latest purchase activity.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/buyer/orders')}
                      className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                    >
                      View All
                    </button>
                  </div>

                  {recentOrders.length === 0 ? (
                    <div className="mt-5 rounded-xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center text-sm text-stone-400">
                      No orders yet. Start shopping from the marketplace!
                    </div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      {recentOrders.map((order) => (
                        <div key={order._id} className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 px-5 py-4">
                          <div>
                            <p className="font-medium text-stone-900">{order.product?.name || 'Product'}</p>
                            <p className="mt-1 text-sm text-stone-500">KSh {Number(order.totalprice || 0).toLocaleString()}</p>
                          </div>
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ring-1 ${STATUS_STYLES[order.status] || 'bg-stone-100 text-stone-700 ring-stone-200'}`}>
                            {order.status || 'pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
