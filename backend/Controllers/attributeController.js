import db from "../Models/_db.js";
const { Attribute } = db;

const getAllAttributes = async (req, res) => {
    try {

        const attributes = await Attribute.findAll();


        return res.status(200).json({ attributes });

    } catch (error) {
        console.error("Error fetching attributes:", error);
        return res.status(500).json({ message: 'Internal Server Error' });

    }
};

export { getAllAttributes };