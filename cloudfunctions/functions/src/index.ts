import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
require("dotenv").config();

const serviceAccount = require(`../account/${process.env.SERVICE_ACCOUNT}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.fetchCustomToken = functions
  .region("asia-northeast1")
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    switch (req.method) {
      case "OPTIONS":
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
        break;
      case "POST":
        const userId = req.body.data?.userId;
        const api_secret = req.body.data?.api_secret;

        if (api_secret !== process.env.SECRET) {
          res.status(401).send({ error: "Unauthorized" });
        } else if (userId && typeof userId === "string") {
          const customToken = await admin.auth().createCustomToken(userId);
          res.status(200).send({
            data: {
              customToken,
            },
          });
        } else {
          res.status(400).send({ error: "Bad Request" });
        }
        break;
      default:
        res.status(405).send({ error: "Method Not Allowed" });
        break;
    }
    return;
  });
