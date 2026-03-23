import jwt from "jsonwebtoken";

const COOKIE_NAME = "sellerToken";

export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.json({ success: true, message: "Logged In" });
    }

    return res.json({ success: false, message: "Invalid Credentials" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const isSellerAuth = (req, res) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ success: true, email: decoded.email });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sellerLogout = (req, res) => {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};