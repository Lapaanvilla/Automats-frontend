import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

interface Feedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface Complaint {
  id: string;
  customerName: string;
  issue: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: Date;
}

const FeedbackAndComplaints: React.FC = () => {
  // Mock data for demonstration
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 'FDB-001',
      customerName: 'John Doe',
      rating: 4,
      comment: 'Food was delicious and delivery was on time. Will order again!',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: 'FDB-002',
      customerName: 'Jane Smith',
      rating: 5,
      comment: 'Excellent service and amazing food quality. The packaging was also eco-friendly.',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: 'FDB-003',
      customerName: 'Mike Johnson',
      rating: 3,
      comment: 'Food was good but delivery took longer than expected.',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  ]);

  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'CMP-001',
      customerName: 'Robert Brown',
      issue: 'Order was missing one item (Garlic Bread)',
      status: 'new',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    },
    {
      id: 'CMP-002',
      customerName: 'Sarah Wilson',
      issue: 'Food was cold when delivered',
      status: 'in-progress',
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    },
  ]);

  const [activeTab, setActiveTab] = useState<'feedback' | 'complaints'>('feedback');
  
  const updateComplaintStatus = (complaintId: string, newStatus: Complaint['status']) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      )
    );
  };

  const getStatusBadgeColor = (status: Complaint['status']) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout activePage="feedback">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Feedback & Complaints
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage customer feedback and resolve complaints.
        </p>
      </div>

      <div className="mt-4">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as 'feedback' | 'complaints')}
          >
            <option value="feedback">Feedback</option>
            <option value="complaints">Complaints</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('feedback')}
                className={`${
                  activeTab === 'feedback'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Feedback
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`${
                  activeTab === 'complaints'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Complaints
              </button>
            </nav>
          </div>
        </div>
      </div>

      {activeTab === 'feedback' ? (
        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feedback.customerName}</h3>
                  <span className="text-sm text-gray-500">{formatDate(feedback.createdAt)}</span>
                </div>
                <div className="mt-2">
                  {renderStars(feedback.rating)}
                </div>
                <p className="mt-3 text-sm text-gray-600">{feedback.comment}</p>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button className="font-medium text-primary-600 hover:text-primary-500">
                    Send Thank You Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {complaints.map((complaint) => (
                        <tr key={complaint.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {complaint.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {complaint.customerName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {complaint.issue}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(complaint.status)}`}>
                              {complaint.status === 'in-progress' ? 'In Progress' : complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(complaint.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              {complaint.status === 'new' && (
                                <button
                                  onClick={() => updateComplaintStatus(complaint.id, 'in-progress')}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  Process
                                </button>
                              )}
                              {complaint.status === 'in-progress' && (
                                <button
                                  onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  Resolve
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-900">
                                Contact
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
      )}
    </DashboardLayout>
  );
};

export default FeedbackAndComplaints;
