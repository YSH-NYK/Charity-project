import Charity from '@/models/Charity'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Find the charity by primary key (id)
            const charity = await Charity.findByPk(req.body.charityId);

            if (charity) {
                // Toggle the `is_active` field
                const newStatus = charity.is_active === 1 ? 0 : 1;

                // Update the charity with the new `is_active` value
                await Charity.update(
                    { is_active: newStatus },
                    { where: { id: req.body.charityId } }
                );

                res.status(200).json({ message: "Activity Changed Successfully!" });
            } else {
                res.status(404).json({ message: "Charity Not Found!" });
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
