import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  ChatBubbleLeftIcon, 
  UserIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const TicketCard = ({ ticket }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      Open: 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-purple-100 text-purple-800',
      Resolved: 'bg-green-100 text-green-800',
      Closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Link to={`/ticket/${ticket._id}`} className="block group">
      <div className="card p-6 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
            {ticket.title}
          </h3>
          <div className="flex space-x-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {ticket.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <UserIcon className="h-3 w-3" />
              <span>{ticket.createdBy?.name || 'Unknown'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {ticket.assignedTo && (
              <div className="flex items-center space-x-1">
                <UserGroupIcon className="h-3 w-3" />
                <span>{ticket.assignedTo.name}</span>
              </div>
            )}
            {ticket.comments?.length > 0 && (
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="h-3 w-3" />
                <span>{ticket.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;