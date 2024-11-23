import db from '../Models/_db.js'

const { StudySession } = db

//Define functionality for StudySession routes

const createStudySession = async (req, res) => {

    try {

        const { organizerId, studySessionName, description, attributeId } = req.body;

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
        const newChatRoom = await ChatRoom.create().roomId;


        const newStudySession = await StudySession.create({
            organizerId,
            studySessionName,
            newChatRoom,
            description,
        });

        console.log(newStudySession);

        await newEvent.setAttendees(organizer);

        //Query the tags associated
        if (attributeId) {

            console.log(attributeId);
            // tags is an array of attributeIds
            const tagInstances = await Attribute.findAll({
                where: { attributeId: attributeId },
            })

            //  'setTags' comes from `belongsToMany`
            // it creates an association between Event and Attributes table
            await newStudySession.setTags(tagInstances);
        }

        return res.status(201).json({
            message: "Event created sucessfully.",
            event: newStudySession,
        });

    } catch (error) {
        console.error("Error creating event:", error);

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

        return res.status(200).json(studySessions);

    } catch (error) {
        console.error("Error getting study sessions:", error);
    }
};

export { createStudySession, getAllStudySessions }