import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

TicketSchema.pre('save', function(next) {
  this.code = `TCKT-${Date.now()}`;
  next();
});

export default mongoose.model('Ticket', TicketSchema);