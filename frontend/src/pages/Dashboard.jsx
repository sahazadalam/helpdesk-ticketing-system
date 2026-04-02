import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';
import TicketCard from '../components/TicketCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { MagnifyingGlassIcon, FunnelIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { user } = useAuth();

  const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [searchTerm, statusFilter, tickets]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/tickets');
      setTickets(response.data.data);
      setFilteredTickets(response.data.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    let filtered = [...tickets];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  };

  const getStats = () => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'Open').length;
    const inProgress = tickets.filter(t => t.status === 'In Progress').length;
    const resolved = tickets.filter(t => t.status === 'Resolved').length;
    return { total, open, inProgress, resolved };
  };

  const stats = getStats();

  const getRoleInfo = () => {
    switch(user?.role) {
      case 'admin':
        return {
          icon: <ShieldCheckIcon className="h-6 w-6 text-purple-600" />,
          title: 'Admin Dashboard',
          description: 'You have full access to all tickets and users'
        };
      case 'agent':
        return {
          icon: <UserGroupIcon className="h-6 w-6 text-blue-600" />,
          title: 'Agent Dashboard',
          description: 'You can view open tickets and tickets assigned to you'
        };
      default:
        return {
          icon: <UserGroupIcon className="h-6 w-6 text-green-600" />,
          title: 'User Dashboard',
          description: 'View and manage your tickets'
        };
    }
  };

  const roleInfo = getRoleInfo();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section with Role Info */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          {roleInfo.icon}
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
        </div>
        <p className="text-gray-600">{roleInfo.description}</p>
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {user?.role === 'admin' ? '👑 Administrator' : user?.role === 'agent' ? '🛠️ Support Agent' : '👤 Regular User'}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600">Total Tickets</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600">Open</p>
          <p className="text-3xl font-bold text-blue-600">{stats.open}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-3xl font-bold text-purple-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-600">Resolved</p>
          <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-auto"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-lg">No tickets found</p>
          <p className="text-gray-400 text-sm mt-2">
            {searchTerm || statusFilter !== 'All' 
              ? 'Try adjusting your filters' 
              : 'Create your first ticket to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;