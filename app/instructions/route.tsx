import { Button } from "frames.js/next";
import { vercelURL } from "../utils";
import { frames } from "../../lib/frames";

const handleRequest = frames(async (ctx) => {
  return {
    postUrl: "/captcha/validate?id=",
    image: `${vercelURL()}/images/instructions.png`,
    imageOptions: {
      aspectRatio: "1:1",
    },

    
    buttons: [
      <Button action="post" key="2" target={`/captcha`}>
        🤖 Start
      </Button>,
      ,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
