import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import {
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  ClockIcon,
  UserGroupIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [agents, setAgents] = useState([]);
  const [editForm, setEditForm] = useState({
    status: '',
    assignedTo: '',
  });

  useEffect(() => {
    fetchTicket();
    if (user?.role === 'admin') {
      fetchAgents();
    }
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await axios.get(`/tickets/${id}`);
      setTicket(response.data.data);
      setEditForm({
        status: response.data.data.status,
        assignedTo: response.data.data.assignedTo?._id || '',
      });
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast.error('Failed to load ticket');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get('/tickets/agents');
      setAgents(response.data.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const response = await axios.post(`/tickets/${id}/comments`, {
        text: comment,
      });
      setTicket(response.data.data);
      setComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTicket = async () => {
    setSubmitting(true);
    try {
      const response = await axios.put(`/tickets/${id}`, editForm);
      setTicket(response.data.data);
      setEditing(false);
      toast.success('Ticket updated successfully!');
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Failed to update ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAssignToMe = async () => {
    setSubmitting(true);
    try {
      const response = await axios.put(`/tickets/${id}/assign`, {
        agentId: user._id
      });
      setTicket(response.data.data);
      toast.success('Ticket assigned to you!');
    } catch (error) {
      console.error('Error assigning ticket:', error);
      toast.error('Failed to assign ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800',
    };
    return colors[priority];
  };

  const getStatusColor = (status) => {
    const colors = {
      Open: 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-purple-100 text-purple-800',
      Resolved: 'bg-green-100 text-green-800',
      Closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status];
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!ticket) {
    return null;
  }

  const canEdit = user?.role === 'admin' || user?.role === 'agent';
  const canAssign = user?.role === 'agent' && !ticket.assignedTo;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{ticket.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Ticket Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <UserIcon className="h-5 w-5" />
              <span>
                Created by: <strong>{ticket.createdBy?.name}</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <ClockIcon className="h-5 w-5" />
              <span>
                Created: {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
            {ticket.assignedTo && (
              <div className="flex items-center space-x-2 text-gray-600">
                <UserGroupIcon className="h-5 w-5" />
                <span>
                  Assigned to: <strong>{ticket.assignedTo.name}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Assign to me button for agents */}
          {canAssign && ticket.status === 'Open' && (
            <div className="mb-6">
              <button
                onClick={handleAssignToMe}
                disabled={submitting}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Assign to Me
              </button>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* Edit Section for agents/admins */}
          {canEdit && (
            <div className="mb-8">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
                >
                  <PencilIcon className="h-5 w-5" />
                  <span>Edit Ticket</span>
                </button>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Ticket</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="input-field"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    {user?.role === 'admin' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assign To
                        </label>
                        <select
                          value={editForm.assignedTo}
                          onChange={(e) => setEditForm({ ...editForm, assignedTo: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Unassigned</option>
                          {agents.map(agent => (
                            <option key={agent._id} value={agent._id}>
                              {agent.name} ({agent.role})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateTicket}
                      disabled={submitting}
                      className="btn-primary"
                    >
                      {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>Comments ({ticket.comments?.length || 0})</span>
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
                className="input-field mb-2"
              />
              <button
                type="submit"
                disabled={submitting || !comment.trim()}
                className="btn-primary"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {ticket.comments?.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
              ) : (
                ticket.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{comment.userName}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {format(new Date(comment.createdAt), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;