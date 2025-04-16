import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

interface Order {
  id: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'new' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  type: 'delivery' | 'pickup';
  address?: string;
  phone: string;
  createdAt: Date;
}

const OrderView: React.FC = () => {
  // Mock data for demonstration
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { name: 'Garlic Bread', quantity: 1, price: 4.99 },
      ],
      total: 17.98,
      status: 'new',
      type: 'delivery',
      address: '123 Main St, Toronto, ON',
      phone: '+1 (416) 555-1234',
      createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      items: [
        { name: 'Chicken Burger', quantity: 2, price: 10.99 },
        { name: 'French Fries', quantity: 1, price: 3.99 },
        { name: 'Coke', quantity: 2, price: 1.99 },
      ],
      total: 29.95,
      status: 'preparing',
      type: 'pickup',
      phone: '+1 (416) 555-5678',
      createdAt: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout activePage="orders">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Orders
        </h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{order.customerName}</div>
                          <div className="text-xs">{order.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <ul className="list-disc list-inside">
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.quantity} x {item.name}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.type === 'delivery' ? (
                            <div>
                              <div className="font-medium">Delivery</div>
                              <div className="text-xs">{order.address}</div>
                            </div>
                          ) : (
                            <div>Pickup</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTime(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {order.status === 'new' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Accept
                              </button>
                            )}
                            {order.status === 'preparing' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Ready
                              </button>
                            )}
                            {order.status === 'ready' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Complete
                              </button>
                            )}
                            {(order.status === 'new' || order.status === 'preparing') && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Cancel
                              </button>
                            )}
                            <button className="text-gray-600 hover:text-gray-900">
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderView;
