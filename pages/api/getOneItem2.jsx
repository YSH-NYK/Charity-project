import Product from '@/models/Products';
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    // Find the product by ID and ensure it's not deleted
    const validItem = await Product.findOne({
      where: { id: productId, is_deleted: 0 },
      attributes: { exclude: ['created_at', 'updated_at', 'is_active', 'is_deleted'] }
    });

    if (validItem) {
      res.status(200).json({ validItem });
    } else {
      res.status(404).json({ message: "Item Not Found!" });
    }
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default connectDb(handler);
