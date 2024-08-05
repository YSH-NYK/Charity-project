import Charity from '@/models/Charity';
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { charityId } = req.body;

            if (!charityId) {
                return res.status(400).json({ message: "charityId is required" });
            }

            let validCharity = await Charity.findByPk(charityId);

            if (validCharity) {
                validCharity.highlighted = !validCharity.highlighted;
                await validCharity.save();

                res.status(200).json({ message: "Activity Changed Successfully!" });
            } else {
                res.status(404).json({ message: "Charity Not Found!" });
            }
        } catch (error) {
            console.error("Error changing charity highlight status:", error);
            res.status(500).json({ message: "Internal Server Error!" });
        }
    } else {
        res.status(400).json({ message: "Invalid Request Method!" });
    }
}

export default connectDb(handler);
