const express = require('express');
const router = express.Router();
const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  addComment,
  getAgents,
  assignTicket,
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');

// All ticket routes require authentication
router.use(protect);

// Ticket routes
router.route('/')
  .get(getTickets)
  .post(createTicket);

// Agent routes (admin only)
router.get('/agents', authorize('admin'), getAgents);

// Individual ticket routes
router.route('/:id')
  .get(getTicketById)
  .put(updateTicket)
  .delete(authorize('admin'), deleteTicket);

// Comment route
router.post('/:id/comments', addComment);

// Assign ticket route
router.put('/:id/assign', authorize('agent', 'admin'), assignTicket);

module.exports = router;