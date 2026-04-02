const Ticket = require('../models/Ticket');
const User = require('../models/User');

// @desc    Get all tickets based on role
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
  try {
    let query;
    
    console.log('User role:', req.user.role);
    console.log('User ID:', req.user.id);

    if (req.user.role === 'admin') {
      // Admin sees all tickets
      query = Ticket.find();
      console.log('Admin: Fetching all tickets');
    } else if (req.user.role === 'agent') {
      // Agents see tickets assigned to them OR all open tickets
      query = Ticket.find({
        $or: [
          { assignedTo: req.user.id },
          { status: 'Open' }
        ]
      });
      console.log('Agent: Fetching assigned and open tickets');
    } else {
      // Regular users see only their own tickets
      query = Ticket.find({ createdBy: req.user.id });
      console.log('User: Fetching own tickets');
    }

    const tickets = await query
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name email')
      .sort('-createdAt');

    console.log(`Found ${tickets.length} tickets`);
    res.json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (error) {
    console.error('Error in getTickets:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name email');

    if (!ticket) {
      return res.status(404).json({ 
        success: false,
        message: 'Ticket not found' 
      });
    }

    // Check authorization
    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'agent' &&
      ticket.createdBy._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to view this ticket' 
      });
    }

    res.json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Error in getTicketById:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Validate required fields
    if (!title || !description || !priority) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields: title, description, priority' 
      });
    }

    const ticket = await Ticket.create({
      title: title.trim(),
      description: description.trim(),
      priority,
      createdBy: req.user.id,
      status: 'Open',
      comments: []
    });

    const populatedTicket = await Ticket.findById(ticket.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    res.status(201).json({
      success: true,
      data: populatedTicket
    });
  } catch (error) {
    console.error('Error in createTicket:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to create ticket'
    });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ 
        success: false,
        message: 'Ticket not found' 
      });
    }

    // Check authorization
    if (req.user.role !== 'admin' && req.user.role !== 'agent') {
      return res.status(403).json({ 
        success: false,
        message: 'Only agents and admins can update tickets' 
      });
    }

    // Agents can only update status and assign to themselves
    if (req.user.role === 'agent') {
      const updateData = {};
      if (req.body.status) updateData.status = req.body.status;
      if (req.body.assignedTo === req.user.id) updateData.assignedTo = req.user.id;
      ticket = await Ticket.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });
    } else {
      // Admin can update everything
      ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    const updatedTicket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name email');

    res.json({
      success: true,
      data: updatedTicket
    });
  } catch (error) {
    console.error('Error in updateTicket:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private/Admin
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ 
        success: false,
        message: 'Ticket not found' 
      });
    }

    // Only admin can delete tickets
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Only admins can delete tickets' 
      });
    }

    await ticket.deleteOne();
    res.json({ 
      success: true,
      message: 'Ticket removed successfully' 
    });
  } catch (error) {
    console.error('Error in deleteTicket:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Add comment to ticket
// @route   POST /api/tickets/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ 
        success: false,
        message: 'Ticket not found' 
      });
    }

    // Check authorization
    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'agent' &&
      ticket.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to comment on this ticket' 
      });
    }

    const comment = {
      user: req.user.id,
      userName: req.user.name,
      text: req.body.text,
    };

    ticket.comments.push(comment);
    await ticket.save();

    const updatedTicket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name email');

    res.json({
      success: true,
      data: updatedTicket
    });
  } catch (error) {
    console.error('Error in addComment:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get all agents
// @route   GET /api/tickets/agents
// @access  Private/Admin
const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ 
      role: { $in: ['agent', 'admin'] } 
    }).select('name email role');
    
    res.json({
      success: true,
      data: agents
    });
  } catch (error) {
    console.error('Error in getAgents:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Assign ticket to agent
// @route   PUT /api/tickets/:id/assign
// @access  Private/Agent/Admin
const assignTicket = async (req, res) => {
  try {
    const { agentId } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ 
        success: false,
        message: 'Ticket not found' 
      });
    }

    // Check if agent exists
    const agent = await User.findById(agentId);
    if (!agent || (agent.role !== 'agent' && agent.role !== 'admin')) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid agent' 
      });
    }

    ticket.assignedTo = agentId;
    await ticket.save();

    const updatedTicket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name email');

    res.json({
      success: true,
      data: updatedTicket
    });
  } catch (error) {
    console.error('Error in assignTicket:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  addComment,
  getAgents,
  assignTicket,
};