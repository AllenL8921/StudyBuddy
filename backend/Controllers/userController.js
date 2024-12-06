//userController.js
// getExistingUsers
// addFriend
// getFriends

//Import Models
import db from '../Models/_db.js';
import { Sequelize } from 'sequelize';
const { User, StudySession, Event } = db;

const getExistingUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        return res.status(400).json("Error fetching all users.", { error: error.message });
    }
};

const getUserInfoById = async (req, res) => {
    try {
        // Access user id from the URL parameters (e.g. /users/:userId)
        const { userId } = req.params;

        console.log(userId);

        // Fetch the user from the database
        const user = await User.findByPk(userId);

        // If the user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract only relevant data to send back (e.g., displayName, username)
        const userData = {
            id: user.id,
            username: user.username,
            displayName: user.displayName || user.username || 'Guest',
        };

        // Return the user info with a 200 status code
        return res.status(200).json({ user: userData });

    } catch (error) {
        console.error("Error getting user info:", error);

        // Send a 500 error response with a generic message
        return res.status(500).json({ error: "Error getting user info" });
    }
};


const getUserFriend = async (req, res) => {

    try {

        const { userId } = req.params;

        const user = User.findByPk(userId);

        if (user) {
            console.log("Found user.");
            return res.status(200).json({ message: "User was found.", user });
        }

    } catch (error) {
        console.log("Error finding user: ", error);
        return res.status(400).json("Error finding user.", { error: error.message });

    }
};

const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        console.log(`Request to add friend: ${userId} -> ${friendId}`);

        if (userId === friendId) {
            return res.status(422).json({ message: "You can't friend yourself." });
        }

        const user = await User.findByPk(userId); // This should work if User is defined correctly
        const friend = await User.findByPk(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User or friend not found." });
        }

        const existingFriendship = await user.getFriends({ where: { clerkUserId: friendId } });

        if (existingFriendship.length > 0) {
            return res.status(422).json({ message: "Friendship already exists." });
        }

        await user.addFriend(friendId);
        await friend.addFriend(userId);

        return res.status(200).json({ message: "Friend added successfully.", friendId });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const getFriends = async (req, res) => {

    try {
        const { userId } = req.params;

        console.log(`Trying to fetch friends of ${userId}`);

        const userWithFriends = await User.findOne({
            where: { clerkUserId: userId },
            include: [{ model: User, as: 'Friends' }]
        });

        // Check if the user was found
        if (!userWithFriends) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(userWithFriends.Friends);

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const joinEvent = async (req, res) => {

    try {

        const { userId, eventId } = req.body;

        // Find the event from eventId
        const event = await Event.findByPk(eventId);
        const user = await User.findByPk(userId);

        if (!user || !event) {
            return res.status(404).json({ message: "User or event not found." });
        }

        // Validation checks
        // 1. User can not join an event that they are currently in
        const isUserAlreadyInEvent = await user.getEvents({ where: { eventId: eventId } });

        if (isUserAlreadyInEvent.length > 0) {
            return res.status(422).json({ message: "User is already a participant in this event." });
        }

        await event.addAttendees(userId);
        return res.status(200).json({ message: "Attendee added successfully.", userId });

    } catch (error) {
        console.error("Error joining event:", error);

        return res.status(400).json("Error joining event.", error.message);
    }
};

const joinRoom = async (req, res) => {

    try {

        const { userId, eventId } = req.body;

        // Find the event from eventId
        const event = await StudySession.findByPk(eventId);
        const user = await User.findByPk(userId);

        if (!user || !event) {
            return res.status(404).json({ message: "User or event not found." });
        }

        // Validation checks
        // 1. User can not join an event that they are currently in
        const isUserAlreadyInEvent = await user.getStudySessions({ where: { studySessionId: eventId } });

        if (isUserAlreadyInEvent.length > 0) {
            return res.status(422).json({ message: "User is already a participant in this room." });
        }

        await event.addParticipants(userId);
        return res.status(200).json({ message: "Participant added successfully.", userId });

    } catch (error) {
        console.error("Error joining room:", error);

        return res.status(400).json("Error joining room.", error.message);
    }
};

const setDisplayName = async (req, res) => {

    try {

        const { id } = req.params;
        const { displayName } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        //Update user's displayname in DB
        user.displayName = displayName;

        await user.save();

        return res.status(200).json({ message: 'Display name updated successfully', user });


    } catch (error) {
        console.error("Error joining event:", error);

        return res.status(400).json("Error joining event.", error.message);

    }
};

const getChatRoomByUserId = async (req, res) => {

    const { userId } = req.params;
    console.log(userId)

    try {
        //Look for all chatrooms that the user is in

        const studySessions = await User.findOne({
            where: { clerkUserId: userId },
            include: {
                model: StudySession,
                as: 'StudySessions',
            }
        });
        const studyChatRooms = studySessions.StudySessions

        const events = await User.findOne({
            where: { clerkUserId: userId },
            include: {
                model: Event,
                as: 'Events',
            }
        });
        const eventChatRooms = events.Events

        const allChatRooms = [
            studyChatRooms.map(session => ({
                chatRoomId: session.chatRoomId,
                title: session.title,
                description: session.description,
            })),
            eventChatRooms.map(event => ({
                chatRoomId: event.chatRoomId,
                title: event.title,
                description: event.description,
            })),
        ];

        console.log("getChatRoomByUserId: ", allChatRooms)
        if (allChatRooms.length === 0) {
            return res.status(404).json({ error: "Chat Room Not Found" })
        }

        return res.status(200).json(allChatRooms);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
};

const getUserInfoByName = async (req, res) => {
    try {

        const { name } = req.query;

        // Fetch the user from the database
        const users = await User.findAll({ where: { username: { [Sequelize.Op.iLike]: `%${name}%` } } });

        // If the user is not found, return a 404 error
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // Return the user info with a 200 status code
        return res.status(200).json({ users });

    } catch (error) {
        console.error("Error getting users:", error);

        // Send a 500 error response with a generic message
        return res.status(500).json({ error: "Error getting users" });
    }
};

export { getExistingUsers, getUserInfoById, getUserInfoByName, getUserFriend, getChatRoomByUserId, setDisplayName, addFriend, getFriends, joinRoom, joinEvent };
