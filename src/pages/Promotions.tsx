import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

interface Promotion {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'repeat' | 'inactive';
  status: 'draft' | 'scheduled' | 'sent';
  scheduledDate?: Date;
  sentDate?: Date;
  recipients: number;
}

const Promotions: React.FC = () => {
  // Mock data for demonstration
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 'PROMO-001',
      title: 'Weekend Special',
      message: 'Get 20% off on all orders this weekend! Use code WEEKEND20 at checkout.',
      targetAudience: 'all',
      status: 'sent',
      sentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      recipients: 250,
    },
    {
      id: 'PROMO-002',
      title: 'We Miss You!',
      message: 'It\'s been a while! Come back and enjoy 15% off your next order with code COMEBACK15.',
      targetAudience: 'inactive',
      status: 'scheduled',
      scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      recipients: 120,
    },
    {
      id: 'PROMO-003',
      title: 'New Menu Items',
      message: 'Try our new summer menu items! Available now for a limited time.',
      targetAudience: 'all',
      status: 'draft',
      recipients: 0,
    },
  ]);

  const [showNewPromotion, setShowNewPromotion] = useState(false);
  const [newPromotion, setNewPromotion] = useState<Omit<Promotion, 'id' | 'recipients'>>({
    title: '',
    message: '',
    targetAudience: 'all',
    status: 'draft',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPromotion(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PROMO-${String(promotions.length + 1).padStart(3, '0')}`;
    setPromotions(prev => [
      ...prev,
      {
        ...newPromotion,
        id,
        recipients: 0,
      } as Promotion,
    ]);
    setNewPromotion({
      title: '',
      message: '',
      targetAudience: 'all',
      status: 'draft',
    });
    setShowNewPromotion(false);
  };

  const getStatusBadgeColor = (status: Promotion['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'sent':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAudienceLabel = (audience: Promotion['targetAudience']) => {
    switch (audience) {
      case 'all':
        return 'All Customers';
      case 'repeat':
        return 'Repeat Customers';
      case 'inactive':
        return 'Inactive Customers';
      default:
        return audience;
    }
  };

  const formatDate = (date?: Date) => {
    return date ? date.toLocaleDateString() : '-';
  };

  return (
    <DashboardLayout activePage="promotions">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Promotions
        </h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setShowNewPromotion(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Promotion
          </button>
        </div>
      </div>

      {showNewPromotion && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Create New Promotion
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Create a new promotional message to send to your customers via WhatsApp.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Promotion Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={newPromotion.title}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={newPromotion.message}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    This message will be sent to customers via WhatsApp.
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                    Target Audience
                  </label>
                  <div className="mt-1">
                    <select
                      id="targetAudience"
                      name="targetAudience"
                      value={newPromotion.targetAudience}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="all">All Customers</option>
                      <option value="repeat">Repeat Customers</option>
                      <option value="inactive">Inactive Customers</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1">
                    <select
                      id="status"
                      name="status"
                      value={newPromotion.status}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Schedule for Later</option>
                    </select>
                  </div>
                </div>

                {newPromotion.status === 'scheduled' && (
                  <div className="sm:col-span-3">
                    <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">
                      Schedule Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="scheduledDate"
                        id="scheduledDate"
                        required
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewPromotion(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Audience
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipients
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {promotions.map((promotion) => (
                      <tr key={promotion.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {promotion.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {promotion.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getAudienceLabel(promotion.targetAudience)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(promotion.status)}`}>
                            {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {promotion.status === 'sent' 
                            ? `Sent: ${formatDate(promotion.sentDate)}`
                            : promotion.status === 'scheduled'
                              ? `Scheduled: ${formatDate(promotion.scheduledDate)}`
                              : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {promotion.recipients}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {promotion.status === 'draft' && (
                              <>
                                <button className="text-primary-600 hover:text-primary-900">
                                  Edit
                                </button>
                                <button className="text-primary-600 hover:text-primary-900">
                                  Send Now
                                </button>
                                <button className="text-primary-600 hover:text-primary-900">
                                  Schedule
                                </button>
                              </>
                            )}
                            {promotion.status === 'scheduled' && (
                              <>
                                <button className="text-primary-600 hover:text-primary-900">
                                  Edit
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  Cancel
                                </button>
                              </>
                            )}
                            {promotion.status === 'sent' && (
                              <button className="text-primary-600 hover:text-primary-900">
                                Duplicate
                              </button>
                            )}
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

export default Promotions;
