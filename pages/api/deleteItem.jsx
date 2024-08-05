import Product from '@/models/Products'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { itemId } = req.body;

            // Find the product by primary key (id)
            const product = await Product.findByPk(itemId);

            if (product) {
                // Mark the product as deleted
                await Product.update(
                    { is_deleted: 1 },
                    { where: { id: itemId } }
                );

                res.status(200).json({ message: "Deleted Successfully!" });
            } else {
                res.status(404).json({ message: "Product Not Found!" });
            }
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(500).json({ message: "Internal Server Error!" });
        }
    } else {
        res.status(400).json({ message: "Invalid Request Method!" });
    }
}

export default connectDb(handler);
