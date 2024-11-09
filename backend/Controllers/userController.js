//userController.js
// getExistingUsers
// addFriend
// getFriends

//Import Models
import db from '../Models/_db.js';
const { User, Event } = db;

const getExistingUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        return res.status(400).json("Error fetching all users.", { error: error.message });
    }
};

const findUser = async (req, res) => {

    try {

        const userId = params.userId;

        const user = User.findByPk(userId);

        //TODO::
        //This route could potentially return a user's chatlogs with another.

        if (user) {
            console.log("Found user.");
            return res.status(200).json("User was found.", user);
        } else {
            console.log("Error finding user: ", error);
            return res.status(404).json("Error finding user.", { error: "User is not in DB." });
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

export { getExistingUsers, findUser, addFriend, getFriends, joinEvent };
