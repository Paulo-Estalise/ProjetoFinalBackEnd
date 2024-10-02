const Ticket = require('../models/Ticket');

class TicketService {
    async createTicket(purchaser, amount) {
        const code = `TICKET-${Date.now()}`; // Gera um código único
        const ticket = new Ticket({ code, amount, purchaser });
        await ticket.save();
        return ticket;
    }
}

module.exports = TicketService;
