import { RequireAuth } from '@/components/auth/RequireAuth'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { WishlistView } from '@/components/dashboard/WishlistView'

export default function WishlistPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <WishlistView />
      </DashboardLayout>
    </RequireAuth>
  )
}

export const metadata = {
  title: 'Wishlist - ECommerce',
  description: 'Your saved items and favorites.',
}