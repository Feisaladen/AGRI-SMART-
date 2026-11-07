import { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios'
import { useCart } from '../../../context/CartContext'
import BuyerSidebar from '../../components/BuyerSidebar'
import { Check, Leaf, Plus } from '../../components/Icons'
import { CardGridSkeleton } from '../../components/Skeleton'

const Marketplace = () => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [justAdded, setJustAdded] = useState(null)
  const addedTimer = useRef(null)

  useEffect(() => {
    axios.get('/api/marketplace')
      .then(res => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => () => clearTimeout(addedTimer.current), [])

  const handleAdd = (product) => {
    addToCart(product)
    setJustAdded(product._id)
    clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setJustAdded(null), 1200)
  }

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-cream">
      <BuyerSidebar />
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-5xl animate-rise space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">Marketplace</h1>
            <p className="mt-1 text-sm text-stone-500">Discover products sourced directly from farms.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-leaf-500"
            />
            <div className="shrink-0 rounded-xl bg-leaf-700 px-5 py-3 text-center text-sm font-medium text-white">
              {filteredProducts.length} items
            </div>
          </div>

          {loading ? (
            <CardGridSkeleton />
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-10 text-center text-sm text-stone-400">
              No products found.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <article
                  key={product._id}
                  style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
                  className="card-lift group animate-rise overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
                >
                  <div className="h-40 overflow-hidden bg-linear-to-br from-leaf-100 to-gold-100">
                    {product.photo
                      ? <img src={product.photo} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      : <div className="flex h-full items-center justify-center text-leaf-500"><Leaf className="h-12 w-12 animate-sway" /></div>
                    }
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-semibold text-stone-900">{product.name}</h2>
                      <span className="rounded-full bg-leaf-50 px-2 py-1 text-xs font-medium text-leaf-700">In Stock</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400">{product.farm?.name} · {product.farm?.county}</p>
                    <p className="mt-3 text-xl font-semibold text-stone-900">KSh {Number(product.price).toLocaleString()}<span className="text-sm font-normal text-stone-400"> / {product.unit}</span></p>
                    <p className="text-xs text-stone-400">{product.quantity} {product.unit} available</p>
                    <p className="mt-3 text-sm text-stone-500 line-clamp-2">{product.description || 'Fresh from the farm.'}</p>
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition ${
                        justAdded === product._id ? 'bg-gold-500 text-leaf-950' : 'bg-leaf-700 text-white hover:bg-leaf-800'
                      }`}
                    >
                      {justAdded === product._id
                        ? <><Check className="h-4 w-4 animate-pop" /> Added</>
                        : <><Plus className="h-4 w-4" /> Add to Cart</>}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Marketplace
