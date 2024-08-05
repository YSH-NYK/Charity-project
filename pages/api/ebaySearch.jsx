import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const clientId = process.env.EBAY_CLIENT_ID;
        const clientSecret = process.env.EBAY_CLIENT_SECRET;

        // Ensure clientId and clientSecret are defined
        if (!clientId || !clientSecret) {
            return res.status(500).json({ message: "eBay credentials are not configured properly." });
        }

        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        try {
            // Request an access token from eBay
            const tokenResponse = await axios.post(
                'https://api.ebay.com/identity/v1/oauth2/token',
                'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${auth}`,
                    },
                }
            );

            const { access_token } = tokenResponse.data;

            if (!access_token) {
                return res.status(500).json({ message: "Failed to retrieve access token from eBay." });
            }

            // Use the access token to search for items
            const { q } = req.body;

            if (!q) {
                return res.status(400).json({ message: "Query parameter 'q' is missing." });
            }

            const searchResponse = await axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${q}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB',
                    'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateRefrenceId=<refrenceId>'
                }
            });

            res.status(200).json(searchResponse.data ?? []);
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(500).json({ message: "Internal Server Error!" });
        }
    } else {
        res.status(400).json({ message: "Invalid Request Method!" });
    }
}
