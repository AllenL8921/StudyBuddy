//eventController.js

//Import models
import db from "../Models/_db.js";
const { User, Event, Attribute } = db;

const createEvent = async (req, res) => {

    try {
        const { organizerId, title, date, chatRoomId, description, tags } = req.body;

        //Search if organizer exists in userId

        const organizer = await User.findByPk(organizerId);

        if (!organizer) {
            //User was not found
            return res.status(404).json({ error: "Organizer was not found." });
        }

        //Create the event object
        // These are attributes needs to be defined in the request

        const newEvent = await Event.create({
            organizerId,
            title,
            date,
            chatRoomId,
            description,
        });

        console.log(newEvent);

        await newEvent.setAttendees(organizer);

        //Query the tags associated
        if (tags && tags.length > 0) {
            // tags is an array of attributeIds
            const tagInstances = await Attribute.findAll({
                where: { attributeId: tags },
            })

            //  'setTags' comes from `belongsToMany`
            // it creates an association between Event and Attributes table
            await newEvent.setTags(tagInstances);
        }


        return res.status(201).json({
            message: "Event created sucessfully.",
            event: newEvent,
        });

    } catch (error) {
        console.error("Error creating event:", error);

        return res.status(400).json(
            {
                error: "Error creating event.", details: error.message,

            }
        );
    }
};

const getAllEvents = async (req, res) => {

    try {

        const allEvents = await Event.findAll();

        res.status(200).json(allEvents);

    } catch (error) {
        console.log("Error getting events: ", error);

        return res.status(400).json(
            {
                error: "Error getting events.", details: error.message,
            }
        )
    }
};


export { createEvent, getAllEvents };