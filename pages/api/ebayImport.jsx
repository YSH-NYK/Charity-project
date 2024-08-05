import Product from '@/models/Products'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, price, link, charityId, imgName } = req.body;

            // Check if the product already exists and is not deleted
            const existingProduct = await Product.findOne({
                where: {
                    name: name,
                    charity_id: charityId, // Match the field name in the Sequelize model
                    is_deleted: 0
                }
            });

            if (existingProduct) {
                // If the product already exists and is not deleted, return an error response
                return res.status(400).json({ message: "Item already imported!" });
            }

            // If the product does not exist, create a new product
            await Product.create({
                name: name,
                price: parseFloat(price), // Ensure price is a number
                link: link,
                charity_id: charityId, // Match the field name in the Sequelize model
                img_name: imgName, // Match the field name in the Sequelize model
                import_flag: 1 // Match the field name in the Sequelize model
            });

            res.status(200).json({ message: "Data Saved Successfully!" });
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(500).json({ message: "Internal Server Error!" });
        }
    } else {
        res.status(400).json({ message: "Invalid Request Method!" });
    }
}

export default connectDb(handler);
