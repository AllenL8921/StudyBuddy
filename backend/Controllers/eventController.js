//eventController.js

//Import models
import db from "../Models/_db.js";
import { Sequelize } from 'sequelize';

const { User, ChatRoom, Event, Attribute } = db;

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

const getAllEvents = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1;  // Default to page 1
        const limit = parseInt(req.query.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;  // Calculate offset based on page and limit

        //TODO:: Apply query logic based on page, limit, offset
        const allEvents = await Event.findAll();

        return res.status(200).json(allEvents);

    } catch (error) {
        console.log("Error getting events: ", error);

        return res.status(400).json(
            {
                error: "Error getting events.", details: error.message,
            }
        )
    }
};

const getEventByName = async (req, res) => {
    const { name } = req.query;
    console.log(name);

    if (!name) {
        return res.status(400).json({ message: 'Please provide a searcch term' });
    }

    try {

        const events = await Event.findAll({
            where: {
                title: {
                    [Sequelize.Op.iLike]: `%${name}%`,
                },
            },
        });

        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }
        res.status(200).json(events);

    } catch (error) {
        console.log("Error getting events: ", error);

        return res.status(400).json(
            {
                error: "Error getting events.", details: error.message,
            }
        )
    }
};

export { createEvent, getAllEvents, getEventByName };