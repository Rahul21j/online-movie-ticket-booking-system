import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    created: {
        type: String, // const date = new Date(unixTimestamp * 1000); date.toLocaleString()
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    amount_total: {
        type: Number,
        required: true
    },
    customer_details: {
        type: Object,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    expires_at: {
        type: String, // Date
        required: true
    },
    metadata: {
        type: Object,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    payment_intent: {
        type: String,
        required: true
    },
    payment_method_options: {
        type: Object,
        required: true
    },
    payment_method_types: {
        type: [String],
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;