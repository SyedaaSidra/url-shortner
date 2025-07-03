const urls = require("./models/url.js");
const validUrl = require("valid-url");
const shortid = require("shortid");
require("dotenv").config();

Base_URL = process.env.BASE_URL;
export const shotenURl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(500).json({ error: "invalid URl send by User.." });
  }

  if (!validUrl.isUri(Base_URL)) {
    return res.status(500).json({ error: "BaseUrl is invalid.." });
  }

  try {
    const CheckExitance = await urls.findOne({ originalUrl });

    if (CheckExitance) {
      return res
        .status(200)
        .json({ shortUrl: `${Base_URL}/${urls.shortCode}` });
    }

    const shortCode = shortid.generate();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    let url = new urls({
      originalUrl,
      shortCode,
      createdAt: new Date(),
      expiresAt,
    });

    urls.save(url);

    return res.status(200).json({ shortUrl: `${Base_URL}/${urls.shortCode}` });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
