import Charity from '@/models/Charity'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    try {
        // Fetch charities that are not deleted
        const charities = await Charity.findAll({
            where: { is_deleted: 0 }, // Use the Sequelize field name
            attributes: { exclude: ['created_at', 'updated_at', 'is_deleted'] } // Exclude fields
        });

        // Set caching headers to ensure the response is not cached
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');

        res.status(200).json({ charities }); // Return the result
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export default connectDb(handler);
