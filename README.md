# Study Together

A full-stack web app developed for the **CUNY Tech Prep Fall 2024** semester by **Allen Liu** & **Shuyi Zhou**.

The purpose of this app is to provide a platform for students to reach out to each other and create study sessions together.  
This app supports account creation through **Clerk** and the ability to create events and group chats. There are also social media-like features such as friend adding and messaging.

## How to Use

> **Requires PostgreSQL, Clerk API keys**

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/study-together.git
    ```

2. Install dependencies:
    ```bash
    cd study-together
    npm install
    ```

3. Set up your **PostgreSQL** and **Clerk API key** as environment variables.

4. Start the **Frontend** development server:
    ```bash
    npm run dev
    ```
    
5. Start the **Backend** development server:
    ```bash
    npm run dev
    npm run gate
    ```

## Tech Stack

- **Frontend**:
    - **React.js**: A JavaScript library for building user interfaces. It’s used to create dynamic and responsive components for the app.
    - **React Router**: A library for handling navigation within the app, allowing users to seamlessly switch between pages without reloading the entire page.
    - **WebSocket**: For real-time communication (chat messages, live notifications) between users in study sessions or group chats.
    - **Tailwind CSS**: A utility-first CSS framework used to design responsive, customizable, and clean interfaces.
    - **Clerk**: Used for authentication and account management, providing easy sign-up, sign-in, and session handling.

- **Backend**:
    - **Node.js**: A JavaScript runtime for building scalable server-side applications.
    - **Express.js**: A web framework for Node.js used to handle HTTP requests and build APIs.
    - **PostgreSQL**: A powerful, open-source relational database used to store app data such as users, events, and messages.

## Example API Routes

### POST: Create Event (Example Route controller in backend/controllers/eventController.js)

```javascript
router.post('/', createEvent);

const createEvent = async (req, res) => {
    try {
        const { organizerId, title, date, description, attributeIds } = req.body;

        console.log("Received: ", req.body);

        // Search if organizer exists in userId
        const organizer = await User.findByPk(organizerId);

        if (!organizer) {
            return res.status(404).json({ error: "Organizer was not found." });
        }

        // Create a new ChatRoom
        const newChatRoom = await ChatRoom.create();
        const roomId = newChatRoom.roomId;

        // Create the event object
        const newEvent = await Event.create({
            organizerId,
            title,
            scheduledDate: date,
            chatRoomId: roomId,
            description,
        });

        console.log(newEvent);

        // Associate the organizer with the event (attendees)
        await newEvent.setAttendees(organizer);

        // If attributeIds are provided, associate the tags (attributes) with the event
        if (attributeIds && attributeIds.length > 0) {
            console.log(attributeIds);

            // Fetch the attribute instances using the array of IDs
            const tagInstances = await Attribute.findAll({
                where: {
                    attributeId: attributeIds,
                },
            });

            // Associate tags (attributes) with the event 
            await newEvent.setTags(tagInstances);
        }

        return res.status(201).json({
            message: "Event created successfully.",
            event: newEvent,
        });

    } catch (error) {
        console.error("Error creating event:", error);

        return res.status(400).json({
            error: "Error creating event.",
            details: error.message,
        });
    }
};
