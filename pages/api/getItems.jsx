import Product from '@/models/Products'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    const { charityId } = req.body;

    if (!charityId) {
        return res.status(400).json({ error: "charityId is required" });
    }

    try {
        // Fetch products based on charityId and is_deleted status
        const products = await Product.findAll({
            where: { is_deleted: 0, charity_id: charityId }, // Use Sequelize field names
            attributes: { exclude: ['created_at', 'updated_at', 'is_deleted'] }, // Exclude specific fields
            order: [['id', 'DESC']] // Order by id in descending order
        });

        res.status(200).json({ products }); // Return the result
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
};

export default connectDb(handler);
