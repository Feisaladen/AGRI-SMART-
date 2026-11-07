import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from '../../api/axios'
import logo from '../../../buyer/logo.jpeg'
import { Cart, Leaf } from '../../components/Icons'

const ROLES = [
    {
        role: 'farmer',
        title: 'I am a farmer',
        subtitle: 'Mimi ni mkulima',
        text: 'List your produce, receive orders, and track your earnings.',
        icon: Leaf,
    },
    {
        role: 'buyer',
        title: 'I am a buyer',
        subtitle: 'Mimi ni mnunuzi',
        text: 'Find fresh produce and buy directly from Kenyan farms.',
        icon: Cart,
    },
]

const RoleCard = ({ title, subtitle, text, icon, delay, disabled, onSelect }) => {
    const Icon = icon

    return (
        <button
            type="button"
            onClick={onSelect}
            disabled={disabled}
            style={{ animationDelay: `${delay}ms` }}
            className="card-lift group animate-rise rounded-2xl border border-stone-200 bg-white p-7 text-left shadow-sm hover:border-leaf-500 disabled:opacity-60"
        >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-700 transition-colors group-hover:bg-leaf-700 group-hover:text-white">
                <Icon className="h-7 w-7" />
            </span>
            <span className="mt-5 block text-xl font-semibold text-stone-900">{title}</span>
            <span className="mt-1 block text-sm font-medium text-gold-700">{subtitle}</span>
            <span className="mt-3 block text-sm leading-6 text-stone-500">{text}</span>
        </button>
    )
}

const RoleSelection = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const [selecting, setSelecting] = useState(null)

    const selectRole = async (role) => {
        try {
            setSelecting(role)
            await axios.post('/api/users/create', {
                clerkId: user.id,
                role
            })
            if (role === 'farmer') {
                navigate('/farm-profile')
            } else {
                navigate('/buyer/home')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong. Please try again.')
            setSelecting(null)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 py-10">
            <div className="w-full max-w-3xl animate-rise text-center">
                <img src={logo} alt="Agri-Smart" className="mx-auto h-28 rounded-2xl sm:h-36" />
                <h1 className="mt-8 text-3xl font-semibold text-stone-900">How will you use Agri-Smart?</h1>
                <p className="mt-2 text-sm text-stone-500">Choose your path to get started.</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {ROLES.map(({ role, title, subtitle, text, icon }, index) => (
                        <RoleCard
                            key={role}
                            title={title}
                            subtitle={subtitle}
                            text={selecting === role ? 'Setting up your account...' : text}
                            icon={icon}
                            delay={(index + 1) * 90}
                            disabled={selecting !== null}
                            onSelect={() => selectRole(role)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RoleSelection
