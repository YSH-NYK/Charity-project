import Product from '@/models/Products'; // Import the Sequelize model
import connectDb from '@/middleware/dbConnect';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const uploadDir = path.join(process.cwd(), '/public/product');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const form = formidable({
            uploadDir,
            keepExtensions: true,
            filename: (name, ext, part, form) => {
                return `${Date.now()}_${part.originalFilename}`;
            }
        });

        const parseForm = () => {
            return new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ fields, files });
                    }
                });
            });
        };

        try {
            const { fields, files } = await parseForm();

            // Get the new filename
            const filename = files?.image[0]?.newFilename;

            // Create a new product entry
            await Product.create({
                name: fields.itemName[0],
                price: parseFloat(fields.price[0]), // Ensure price is a number
                link: fields.link[0],
                charity_id: fields.charityId[0], // Ensure field name matches model
                description: fields.description[0],
                img_name: filename, // Ensure field name matches model
                is_active: 1, // Set default values if needed
                is_deleted: 0
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
