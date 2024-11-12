import { Webhook } from 'svix';
// Import models
import db from '../Models/_db.js';
const { User } = db;

/*
Webhook is an event-driven method of communication between applications.
https://clerk.com/docs/integrations/webhooks/overview#payload-structure

Clerk - Payload Structure:
- data: contains the actual payload sent by Clerk. The payload can be different depending on the event type.
- object: always set to event
- type: the type of event that triggered the webhook
*/

const handleWebHook = async (req, res) => {
    // Log the incoming request body for debugging
    console.log("Received request");
    console.log("Headers:", req.headers);
    console.log("Payload:", req.body); // Adjusted to log the actual payload object

    try {
        const payloadString = JSON.stringify(req.body); // Convert body to JSON string
        const svixHeaders = req.headers;

        const wh = new Webhook(process.env.WEBHOOK_SECRET);
        const evt = wh.verify(payloadString, svixHeaders);

        const { id, ...attributes } = evt.data; // Using id from evt.data
        const eventType = evt.type;

        console.log(`Event type received: ${eventType}`);

        switch (eventType) {
            case 'user.created':
                await handleUserCreated(id, attributes);
                break;

            case 'user.updated':
                await handleUserUpdated(id, attributes);
                break;

            case 'user.deleted':
                await handleUserDeleted(id);
                break;

            default:
                console.log(`Unhandled event type: ${eventType}`);
        }

        // Respond with a 200 OK status
        res.status(200).send('Webhook handled');
    } catch (error) {
        console.error('Error handling webhook:', error);
        // Log the error stack for better debugging
        console.error(error.stack);
        // Respond with a 500 Internal Server Error status
        res.status(500).send('Error handling webhook');
    }
};

// Separate function to handle user creation
const handleUserCreated = async (id, attributes) => {
    try {
        console.log(`Creating user with ID: ${id}`);
        await User.create({
            clerkUserId: id, // Use id from verified event data
            username: attributes.username || 'DefaultUsername',
            displayName: `Anonymous`,
            email: attributes.email_addresses[0]?.email_address || 'default@example.com',
            password: attributes.password
        });
        console.log(`User created: ${id}`);
    } catch (error) {
        console.error(`Failed to create user with ID ${id}:`, error);
    }
};

// Separate function to handle user updates
const handleUserUpdated = async (id, attributes) => {
    try {
        console.log(`Updating user with ID: ${id}`);
        const [updatedRows] = await User.update(
            {
                username: attributes.username || null,
                email: attributes.email_addresses[0]?.email_address || null,
                password: attributes.password
            },
            { where: { clerkUserId: id } }
        );
        if (updatedRows === 0) {
            console.log(`No user found to update for ID: ${id}`);
        } else {
            console.log(`User updated: ${id}`);
        }
    } catch (error) {
        console.error(`Failed to update user with ID ${id}:`, error);
    }
};

// Separate function to handle user deletion
const handleUserDeleted = async (id) => {
    try {
        console.log(`Deleting user with ID: ${id}`);
        const deletedRows = await User.destroy({ where: { clerkUserId: id } });
        if (deletedRows === 0) {
            console.log(`No user found to delete for ID: ${id}`);
        } else {
            console.log(`User deleted: ${id}`);
        }
    } catch (error) {
        console.error(`Failed to delete user with ID ${id}:`, error);
    }
};

export { handleWebHook };
