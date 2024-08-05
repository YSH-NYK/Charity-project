// pages/api/getOneCharity.js
import Charity from "@/models/Charity";
import Product from "@/models/Products"; // Adjust the path as necessary
import connectDb from "@/middleware/dbConnect";

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { charityId } = req.body;

    if (!charityId) {
        return res.status(400).json({ error: "charityId is required" });
    }

    try {
        console.log(`Fetching details for charityId: ${charityId}`);

        const validCharity = await Charity.findOne({
            where: { is_deleted: 0, id: charityId },
            attributes: { exclude: ['created_at', 'updated_at', 'is_active', 'is_deleted'] }
        });

        if (!validCharity) {
            return res.status(404).json({ message: "Charity Not Found!" });
        }

        console.log(`Found charity: ${JSON.stringify(validCharity)}`);

        const productList = await Product.findAll({
            where: { is_deleted: 0, is_active: 1, charity_id: charityId },
            attributes: { exclude: ['created_at', 'updated_at', 'is_active', 'is_deleted'] },
            order: [['id', 'DESC']]
        });

        console.log(`Found products: ${JSON.stringify(productList)}`);

        return res.status(200).json({ validCharity, productList });
    } catch (error) {
        console.error("Error fetching charity details:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default connectDb(handler);
