import Product from '@/models/Products';
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: "productId is required" });
    }

    try {
        let validItem = await Product.findOne({
            where: { is_deleted: 0, id: productId },
            attributes: { exclude: ['created_at', 'updated_at', 'is_active', 'is_deleted'] }
        });

        if (validItem) {
            res.status(200).json({ validItem });
        } else {
            res.status(404).json({ message: "Item Not Found!" });
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: "Internal Server Error!" });
    }
}

export default connectDb(handler);
