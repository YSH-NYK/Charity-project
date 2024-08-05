import Product from '@/models/Products';
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
            const filename = files?.image?.[0]?.newFilename;
            let validItem = await Product.findByPk(fields.itemId[0]);

            if (validItem) {
                if (filename !== undefined) {
                    validItem.img_name = filename;
                }

                validItem.name = fields.itemName[0];
                validItem.description = fields.description[0];
                validItem.link = fields.link[0];
                validItem.price = fields.price[0];
                await validItem.save();

                res.status(200).json({ message: "Data Updated Successfully!" });
            } else {
                res.status(404).json({ message: "Item Not Found!" });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "Internal Server Error!" });
        }
    } else {
        res.status(400).json({ message: "Invalid Request Method!" });
    }
}

export default connectDb(handler);
