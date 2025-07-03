const urls = require("../models/url");
const validUrl = require("valid-url");
const shortid = require("shortid");
require("dotenv").config();

Base_URL = process.env.BASE_URL;
const shotenURl = async (req, res) => {
  const { originalUrl } = req.body;
  console.log(originalUrl);
  console.log("req.body:", req.body);

  if (!validUrl.isUri(originalUrl)) {
    return res.status(500).json({ error: "invalid URl send by User.." });
  }

  if (!validUrl.isUri(Base_URL)) {
    return res.status(500).json({ error: "BaseUrl is invalid.." });
  }

  try {
    let url = await urls.findOne({ originalUrl });

    if (url) {
      return res.status(200).json({ shortUrl: `${Base_URL}/${url.shortCode}` });
    }

    const shortCode = shortid.generate();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    url = new urls({
      originalUrl,
      shortCode,
      createdAt: new Date(),
      expiredAt,
    });

    await url.save();

    return res.status(200).json({ shortUrl: `${Base_URL}/${url.shortCode}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const redirecttoOriginal = async (req, res) => {
  const shortCode = req.params.shortCode;
  console.log(shortCode);
  try {
    let url = await urls.findOne({ shortCode });
    console.log(url);
    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // if (url.expiredAt < Date.now()) {
    //   return res.status(410).json({ error: "Link expired" });
    // }
    console.log(url.originalUrl);
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect Error:", error);

    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  shotenURl,
  redirecttoOriginal,
};
