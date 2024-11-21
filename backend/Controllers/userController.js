//userController.js
// getExistingUsers
// addFriend
// getFriends

//Import Models
import db from '../Models/_db.js';
const { User, StudyRoom, Event } = db;

const getExistingUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        return res.status(400).json("Error fetching all users.", { error: error.message });
    }
};

const getUserInfo = async (req, res) => {
    try {

        // Access user id from the URL parameters (e.g. /users/:id)
        const { id } = req.params;

        // Fetch the user from the database
        const user = await User.findByPk(id);

        // If the user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user info with a 200 status code
        return res.status(200).json({ user });

    } catch (error) {
        console.error("Error getting user info:", error);

        // Send a 500 error response with a generic message
        return res.status(500).json({ error: "Error getting user info" });
    }
};

const getUserFriend = async (req, res) => {

    try {

        const userId = params.userId;

        const user = User.findByPk(userId);

        if (user) {
            console.log("Found user.");
            return res.status(200).json("User was found.", user);
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
            return res.status(422).json({ error: "You can't friend yourself." });
        }

        const user = await User.findByPk(userId); // This should work if User is defined correctly
        const friend = await User.findByPk(friendId);

        if (!user || !friend) {
            return res.status(404).json({ error: "User or friend not found." });
        }

        const existingFriendship = await user.getFriends({ where: { clerkUserId: friendId } });

        if (existingFriendship.length > 0) {
            return res.status(422).json({ error: "Friendship already exists." });
        }

        await user.addFriend(friendId);

        return res.status(200).json({ message: "Friend added successfully.", friendId });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const getFriends = async (req, res) => {

    try {
        const { userId } = req.body;

        console.log(`Trying to fetch friends of ${userId}`);

        const userWithFriends = await User.findOne({
            where: { clerkUserId: userId },
            include: [{ model: User, as: 'Friends' }]
        });

        // Check if the user was found
        if (!userWithFriends) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(userWithFriends.friends);

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const joinEvent = async (req, res) => {

    try {

        const { userId, eventId } = req.body;

        // Find the event from eventId
        const event = Event.findByPk(eventId);

        // Validation checks
        // 1. User can not join an event that they are currently in



    } catch (error) {
        console.error("Error joining event:", error);

        return res.status(400).json("Error joining event.", error.message);
    }
};

const joinRoom = async (req, res) => {

    try {

        const { userId, eventId } = req.body;

        // Find the event from eventId
        const event = StudyRoom.findByPk(eventId);

        // Validation checks
        // 1. User can not join an event that they are currently in



    } catch (error) {
        console.error("Error joining event:", error);

        return res.status(400).json("Error joining event.", error.message);
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

        const chatRooms = await ChatRoom.findAll({
            include: {
                model: User,
                as: 'Participants',
                where: { clerkUserId: userId },
                required: true,
            }
        });

        console.log("getChatRoomByUserId: ", chatRooms)
        if (!chatRooms) {
            return res.status(404).json({ error: "Chat Room Not Found" })
        }

        return res.status(200).json(chatRooms);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
};

export { getExistingUsers, getUserInfo, getUserFriend, getChatRoomByUserId, setDisplayName, addFriend, getFriends, joinEvent };
