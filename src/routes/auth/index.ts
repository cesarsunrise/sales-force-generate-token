import express, { Router, Request, Response } from "express";
import EnvManager from "../../config/EnvManager";
import jsforce from "jsforce";

const auth: Router = express.Router();

let oauth2 = new jsforce.OAuth2(EnvManager.getSalesForceCredentials());

// Initial OAuth2 flow
// example: https://myapp.ngrok.io/oauth2/auth
auth.get("/oauth2/auth", async (req: Request, res: Response) => {
  res.redirect(oauth2.getAuthorizationUrl({ scope: "api" }));
});

// Redirect callback
auth.get("/getAccessToken", async (req: Request, res: Response) => {
  const conn = new jsforce.Connection({ oauth2: oauth2 });
  const { code } = req.query;
  conn.authorize(code as string, function (err) {
    if (err) {
      return console.error(err);
    }

    console.log(`CREDENTIALS FOR ${EnvManager.getSalesForceEnv()}====`);
    console.log("accessToken", conn.accessToken);
    console.log("refreshToken", conn.refreshToken);
    console.log("instanceUrl", conn.instanceUrl);

    const result: any = {
      env: EnvManager.getSalesForceEnv(),
      accessToken: conn.accessToken,
      refreshToken: conn.refreshToken,
      instanceUrl: conn.instanceUrl,
    };

    res.json(result);
  });
});

export default auth;
