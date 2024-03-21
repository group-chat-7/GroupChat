const { User, Note, Order } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const axios = require("axios");
const midtransClient = require("midtrans-client");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body;
      let email = `${username}@gmail.com`;

      await User.findOne({
        where: { email, provider: "manual" },
      });

      const data = await User.create({
        username,
        email,
        password,
      });

      const datas = await User.findOne({
        where: { email, provider: "manual" },
      });

      const payload = { id: datas.id };
      const access_token = signToken(payload);
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { username } = req.body;
      let email = `${username}@gmail.com`;

      const data = await User.findOne({ where: { email, provider: "manual" } });

      const payload = { id: data.id };
      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async haveAccess(req, res, next) {
    try {
      const data = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (data.donated === "donated") {
        res.status(200).json({ message: "success" });
      } else {
        res.status(400).json({ message: "you have not payed" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async anime(req, res, next) {
    const options = {
      method: "GET",
      url: `https://any-anime.p.rapidapi.com/v1/anime/gif/1`,
      headers: {
        "X-RapidAPI-Key": "065bb865fbmsh9869ccb03e0d80ap1fc860jsn903bdbd50c81",
        "X-RapidAPI-Host": "any-anime.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      const data = response.data.images[0];
      console.log(data);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  static async payment(req, res, next) {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    const orderId = Math.random().toString();
    const amount = 10000;
    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.user.username,
        email: req.user.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    let transactionToken = transaction.token;
    console.log("transactionToken:", transactionToken);

    await Order.create({
      orderId,
      amount,
      userId: req.user.id,
    });
    res.status(200).json({ message: "success", transactionToken, orderId });
  }
  catch(error) {
    next(error);
  }

  static async upgrade(req, res, next) {
    const { orderId } = req.body;
    const order = await Order.findOne({ where: { orderId } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.donated === "donated" || order.status === "paid") {
      return res.status(200).json({ message: "thx for the donation" });
    }

    const base64ServerKey = Buffer.from(process.env.SERVER_KEY + ":").toString(
      "base64"
    );
    const { data } = await axios.get(
      `
https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          Authorization: `Basic ${base64ServerKey}`,
        },
      }
    );
    console.log(data);
    if (data.transaction_status === "capture" && data.status_code === "200") {
      await req.user.update({ donated: "donated" });
      await Order.update(
        { status: "paid", paidDate: new Date() },
        { where: { orderId } }
      );
      res.status(200).json({ message: "upgrade success" });
    } else {
      res.status(400).json({ message: "Upgrade failed" });
    }
  }
  catch(error) {
    console.log(error);
    next(error);
  }
}

module.exports = Controller;
