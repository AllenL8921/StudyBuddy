import db from '../Models/_db.js'

const { User, Attribute, ChatRoom, StudySession } = db

//Define functionality for StudySession routes

const createStudySession = async (req, res) => {

    try {

        const { title, organizerId, isPublic, description, attributeIds } = req.body;

        console.log("Received: ", req.body);

        //Search if organizer exists in userId

        const organizer = await User.findByPk(organizerId);

        if (!organizer) {
            //User was not found
            return res.status(404).json({ error: "Organizer was not found." });
        }

        // Create the ChatRoom object
        // These are attributes needs to be defined in the request

        // Create a new ChatRoom
        const newChatRoom = await ChatRoom.create();
        const roomId = newChatRoom.roomId;

        // Create a unique persistence key


        const newStudySession = await StudySession.create({
            title,
            organizerId,
            isPublic,
            studySessionName: title,
            chatRoomId: roomId,
            description,
        });

        console.log(newStudySession);

        await newStudySession.setAttendees(organizer);

        //Query the tags associated
        if (attributeIds && attributeIds.length > 0) {

            console.log(attributeId);
            // tags is an array of attributeIds
            const tagInstances = await Attribute.findAll({
                where: { attributeId: attributeIds, },
            })

            //  'setTags' comes from `belongsToMany`
            // it creates an association between Event and Attributes table
            await newStudySession.setTags(tagInstances);
        }

        return res.status(201).json({
            message: "Study Session created sucessfully.",
            studySession: newStudySession,
        });

    } catch (error) {
        console.error("Error creating Study Session:", error);

        return res.status(400).json(
            {
                error: "Error creating study session.", details: error.message,

            }
        );
    }
};


const getAllStudySessions = async (req, res) => {
    try {

        const studySessions = await StudySession.findAll({
            where: {
                isPublic: true,
            }
        });

        const result = await Promise.all(studySessions.map(async session => {

            const organizer = await User.findOne({
                where: { clerkUserId: session.organizerId }, // Find the user by organizerId
                attributes: ['username'],  // Only fetch the username
            });

            return {
                id: session.id,
                title: session.title,
                description: session.description,
                isPublic: session.isPublic,
                organizerUsername: organizer ? organizer.username : null,  // Safely access username
            };
        }));


        return res.status(200).json(result);

    } catch (error) {
        console.error("Error getting study sessions:", error);
    }
};

const getAttendees = async (req, res) => {

    try {
        const { roomId } = req.params;

        console.log(`Trying to fetch attendees of room ${roomId}`);

        const attendees = await StudySession.findOne({
            where: { chatRoomId: roomId },
            include: [{ model: User, as: 'Participants' }]
        });

        // Check if the attendees was found
        if (!attendees) {
            return res.status(404).json({ error: 'Attendees not found' });
        }
        console.log('Fetched attendees: ', attendees)
        return res.status(200).json(attendees.Participants);

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export { createStudySession, getAttendees, getAllStudySessions }