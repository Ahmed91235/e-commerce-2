'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Download, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'
import type { Order } from '@/types/dashboard'

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'delivered',
    totalAmount: 1299.99,
    currency: 'USD',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card ****4242',
    shippingMethod: 'Standard Shipping',
    trackingNumber: '1Z999AA1234567890',
    estimatedDelivery: '2024-01-15',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-15T14:30:00Z',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        productImage: '/images/iphone-15-pro-max.jpg',
        productSlug: 'iphone-15-pro-max',
        variant: { color: 'Natural Titanium' },
        quantity: 1,
        price: 1299.99,
        total: 1299.99,
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'US',
      type: 'shipping'
    },
    statusHistory: [
      { status: 'pending', timestamp: '2024-01-10T10:00:00Z', description: 'Order placed' },
      { status: 'confirmed', timestamp: '2024-01-10T11:00:00Z', description: 'Order confirmed' },
      { status: 'processing', timestamp: '2024-01-11T09:00:00Z', description: 'Preparing for shipment' },
      { status: 'shipped', timestamp: '2024-01-12T15:00:00Z', description: 'Order shipped' },
      { status: 'delivered', timestamp: '2024-01-15T14:30:00Z', description: 'Delivered successfully' },
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    status: 'shipped',
    totalAmount: 179.98,
    currency: 'USD',
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    shippingMethod: 'Express Shipping',
    trackingNumber: '1Z999BB9876543210',
    estimatedDelivery: '2024-01-20',
    created_at: '2024-01-18T14:30:00Z',
    updated_at: '2024-01-19T09:15:00Z',
    items: [
      {
        id: '2',
        productId: '4',
        productName: 'Nike Air Max 270',
        productImage: '/images/nike-air-max-270.jpg',
        productSlug: 'nike-air-max-270',
        variant: { color: 'White/Black', size: '10' },
        quantity: 1,
        price: 149.99,
        total: 149.99,
      },
      {
        id: '3',
        productId: '5',
        productName: 'Wireless Earbuds Pro',
        productImage: '/images/wireless-earbuds.jpg',
        productSlug: 'wireless-earbuds-pro',
        variant: { color: 'Black' },
        quantity: 1,
        price: 29.99,
        total: 29.99,
      }
    ],
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US',
      type: 'shipping'
    },
    statusHistory: [
      { status: 'pending', timestamp: '2024-01-18T14:30:00Z', description: 'Order placed' },
      { status: 'confirmed', timestamp: '2024-01-18T15:00:00Z', description: 'Payment confirmed' },
      { status: 'processing', timestamp: '2024-01-19T08:00:00Z', description: 'Processing order' },
      { status: 'shipped', timestamp: '2024-01-19T09:15:00Z', description: 'Order shipped via Express' },
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    status: 'processing',
    totalAmount: 89.97,
    currency: 'USD',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card ****1234',
    shippingMethod: 'Standard Shipping',
    created_at: '2024-01-19T16:45:00Z',
    updated_at: '2024-01-20T10:00:00Z',
    items: [
      {
        id: '4',
        productId: '6',
        productName: 'Bluetooth Speaker',
        productImage: '/images/bluetooth-speaker.jpg',
        productSlug: 'bluetooth-speaker-pro',
        variant: { color: 'Blue' },
        quantity: 3,
        price: 29.99,
        total: 89.97,
      }
    ],
    shippingAddress: {
      firstName: 'Mike',
      lastName: 'Johnson',
      address: '789 Pine St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'US',
      type: 'shipping'
    },
    statusHistory: [
      { status: 'pending', timestamp: '2024-01-19T16:45:00Z', description: 'Order received' },
      { status: 'confirmed', timestamp: '2024-01-19T17:00:00Z', description: 'Payment processed' },
      { status: 'processing', timestamp: '2024-01-20T10:00:00Z', description: 'Preparing items for shipment' },
    ]
  }
]

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />
    case 'confirmed':
      return <CheckCircle className="h-5 w-5 text-blue-500" />
    case 'processing':
      return <Package className="h-5 w-5 text-orange-500" />
    case 'shipped':
      return <Truck className="h-5 w-5 text-purple-500" />
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <Clock className="h-5 w-5 text-gray-500" />
  }
}

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'confirmed':
      return 'bg-blue-100 text-blue-800'
    case 'processing':
      return 'bg-orange-100 text-orange-800'
    case 'shipped':
      return 'bg-purple-100 text-purple-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const OrderHistory: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = selectedStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedStatus)

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
            Order History
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your orders
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { key: 'all', label: 'All Orders', count: mockOrders.length },
            { key: 'processing', label: 'Processing', count: mockOrders.filter(o => o.status === 'processing').length },
            { key: 'shipped', label: 'Shipped', count: mockOrders.filter(o => o.status === 'shipped').length },
            { key: 'delivered', label: 'Delivered', count: mockOrders.filter(o => o.status === 'delivered').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                selectedStatus === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Order Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {order.trackingNumber && (
                      <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                        Track
                      </button>
                    )}
                    <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{order.items.length - 3} more items
                  </div>
                )}
              </div>
            </div>

            {/* Expanded Order Details */}
            {expandedOrder === order.id && (
              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="space-y-4">
                  {/* All Items */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                              {item.variant && (
                                <p className="text-xs text-gray-500">
                                  {Object.entries(item.variant).map(([key, value]) => 
                                    `${key}: ${value}`
                                  ).join(', ')}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              ${item.total.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping & Billing Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Order Details</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Payment: {order.paymentMethod}</p>
                        <p>Shipping: {order.shippingMethod}</p>
                        {order.trackingNumber && (
                          <p>Tracking: {order.trackingNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Status Timeline */}
                  {order.statusHistory && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Order Timeline</h4>
                      <div className="flow-root">
                        <ul className="-mb-8">
                          {order.statusHistory.map((status, statusIdx) => (
                            <li key={statusIdx}>
                              <div className="relative pb-8">
                                {statusIdx !== order.statusHistory.length - 1 ? (
                                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                                ) : null}
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                      {getStatusIcon(status.status)}
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {status.description}
                                      </p>
                                      <p className="text-sm text-gray-500 capitalize">
                                        {status.status}
                                      </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                      <time dateTime={status.timestamp}>
                                        {new Date(status.timestamp).toLocaleDateString()} at{' '}
                                        {new Date(status.timestamp).toLocaleTimeString()}
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedStatus === 'all' 
              ? "You haven't placed any orders yet." 
              : `No orders with ${selectedStatus} status.`}
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}