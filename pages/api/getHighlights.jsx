import Charity from '@/models/Charity'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    try {
        // Fetch highlighted charities that are not deleted and limit to 3 results
        const highlights = await Charity.findAll({
            where: { is_deleted: 0, highlighted: 1 }, // Use the Sequelize field names
            attributes: { exclude: ['created_at', 'updated_at', 'is_deleted'] }, // Exclude specific fields
            limit: 3 // Limit the results to 3
        });

        res.status(200).json({ highlights }); // Return the result
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export default connectDb(handler);
