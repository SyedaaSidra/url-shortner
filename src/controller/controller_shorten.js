const urls = require("../models/url");
const validUrl = require("valid-url");
const shortid = require("shortid");
require("dotenv").config();

Base_URL = process.env.BASE_URL;
const shotenURl = async (req, res) => {
  const { originalUrl } = req.body;
  console.log("Received URL:", originalUrl);
  console.log(originalUrl);
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

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 1);

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
  console.log("#####");
  try {
    let url = await urls.findOne({ shortCode });
    console.log(url);
    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    if (url.expiredAt < Date.now()) {
      return res.status(410).json({ error: "Link expired" });
    }
    await urls.updateOne({ shortCode }, { $inc: { Visited: 1 } });
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect Error:", error);

    return res.status(500).json({ error: "Server error" });
  }
};

const showAnalytics = async (req, res) => {
  const shortCode = req.params.shortCode;
  try {
    let url = await urls.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      Visited: url.Visited,
      createdAt: url.createdAt,
      expiredAt: url.expiredAt,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  shotenURl,
  redirecttoOriginal,
  showAnalytics,
};
