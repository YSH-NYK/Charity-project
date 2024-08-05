import Product from '@/models/Products'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Find the product by primary key (id)
            const product = await Product.findByPk(req.body.itemId);

            if (product) {
                // Toggle the `is_active` field
                const newStatus = product.is_active === 1 ? 0 : 1;

                // Update the product with the new `is_active` value
                await Product.update(
                    { is_active: newStatus },
                    { where: { id: req.body.itemId } }
                );

                res.status(200).json({ message: "Activity Changed Successfully!" });
            } else {
                res.status(404).json({ message: "Item Not Found!" });
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
