import Charity from "@/models/Charity";
import connectDb from "@/middleware/dbConnect";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "/public/charity");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      filename: (name, ext, part, form) => {
        return `${Date.now()}_${part.originalFilename}`;
      },
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

      // Extract and validate charity ID
      const charityId = parseInt(fields.id, 10);

      // Debug log to check ID
      console.log("Parsed Charity ID:", charityId);

      if (isNaN(charityId)) {
        return res.status(400).json({ message: "Invalid Charity ID!" });
      }

      // Find the charity by ID
      let validCharity = await Charity.findByPk(charityId);

      if (validCharity) {
        // Handle image file
        const filename = files?.image?.newFilename;
        if (filename) {
          validCharity.img_name = filename;
        }

        // Update charity fields with correct type handling
        validCharity.name = Array.isArray(fields.institudeName)
          ? fields.institudeName[0]
          : fields.institudeName;
        validCharity.address = Array.isArray(fields.address)
          ? fields.address[0]
          : fields.address;
        validCharity.about = Array.isArray(fields.about)
          ? fields.about[0]
          : fields.about;
        validCharity.email = Array.isArray(fields.email)
          ? fields.email[0]
          : fields.email;
        validCharity.contact1 = Array.isArray(fields.contact1)
          ? fields.contact1[0]
          : fields.contact1;
        validCharity.contact2 = Array.isArray(fields.contact2)
          ? fields.contact2[0]
          : fields.contact2;

        // Save the updated charity record
        await validCharity.save();

        res.status(200).json({ message: "Data Updated Successfully!" });
      } else {
        res.status(404).json({ message: "Charity Not Found!" });
      }
    } catch (error) {
      console.error("Error updating charity:", error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  } else {
    res.status(400).json({ message: "Invalid Request Method!" });
  }
};

export default connectDb(handler);
