import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ScanLine, Users, FileText, Settings } from 'lucide-react'

const ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/predict', label: 'New Scan', icon: ScanLine },
  { to: '/dashboard', label: 'Patients', icon: Users },
  { to: '/about', label: 'Documentation', icon: FileText },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-ink-100 bg-white lg:block">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col p-4">
        <p className="px-2 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
          Clinical Console
        </p>
        <nav className="flex flex-col gap-1">
          {ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-teal-50 text-teal-700' : 'text-ink-600 hover:bg-ink-50'
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-xl2 bg-ink-50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-ink-700">
            <Settings size={14} /> Model version
          </div>
          <p className="mt-1 text-xs text-ink-500">Multi-modal CKD Net v2.3 · Grad-CAM enabled</p>
        </div>
      </div>
    </aside>
  )
}
