import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import BuyerSidebar from '../../components/BuyerSidebar'
import { Cart as CartIcon, Leaf, Minus, Plus } from '../../components/Icons'

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, total } = useCart()

  return (
    <div className="flex min-h-screen bg-cream">
      <BuyerSidebar />
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-4xl animate-rise space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">My Cart</h1>
            <p className="mt-1 text-sm text-stone-500">Review your selected items before checkout.</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-10 text-center">
              <CartIcon className="mx-auto mb-4 h-12 w-12 animate-sway text-leaf-500" />
              <p className="text-lg font-medium text-stone-700">Your cart is empty.</p>
              <p className="mt-2 text-sm text-stone-400">Add products from the marketplace.</p>
              <button
                type="button"
                onClick={() => navigate('/buyer/marketplace')}
                className="mt-6 rounded-full bg-leaf-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-leaf-800"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
                    className="card-lift animate-rise rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-xl bg-stone-100">
                          {item.photo
                            ? <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
                            : <div className="flex h-full items-center justify-center text-leaf-500"><Leaf className="h-7 w-7" /></div>
                          }
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900">{item.name}</p>
                          <p className="mt-1 text-sm text-stone-400">KSh {Number(item.price).toLocaleString()} / {item.unit}</p>
                          <p key={item.quantity} className="mt-1 animate-pop text-sm font-medium text-stone-700">KSh {Number(item.price * item.quantity).toLocaleString()}</p>
                          <div className="mt-3 inline-flex items-center rounded-full border border-stone-200 bg-stone-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item._id, -1)}
                              disabled={item.quantity <= 1}
                              aria-label={`Reduce ${item.name} quantity`}
                              className="rounded-full p-2 text-stone-600 hover:bg-stone-200 disabled:opacity-30"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-8 text-center text-sm font-semibold text-stone-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item._id, 1)}
                              aria-label={`Increase ${item.name} quantity`}
                              className="rounded-full p-2 text-stone-600 hover:bg-stone-200"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="sm:self-start">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id)}
                          className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
                <p className="text-sm font-medium text-stone-500">Order Summary</p>
                <p key={total} className="mt-3 animate-pop text-3xl font-semibold text-stone-900">KSh {Number(total).toLocaleString()}</p>
                <div className="mt-5 space-y-2 rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span className="font-medium text-stone-900">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span className="font-medium text-stone-900">M-Pesa</span>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/buyer/checkout')}
                    className="rounded-xl bg-leaf-700 py-3 text-sm font-medium text-white transition hover:bg-leaf-800"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/buyer/marketplace')}
                    className="rounded-xl border border-stone-200 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
                  >
                    Continue Shopping
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Cart
