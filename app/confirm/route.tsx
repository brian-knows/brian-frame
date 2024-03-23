import { createFrames, Button } from "frames.js/next";
import { generateCaptchaChallenge } from "../../lib/captcha";
import { getBrianTransactionCalldata } from "../../lib/kv";
import { getFrameMessage } from "frames.js/getFrameMessage";

const frames = createFrames();
const handleRequest = frames(async (ctx) => {
  const url = new URL(ctx.request.url);
  const { searchParams } = url;
  const requestId = searchParams.get("id");
  const body = await ctx.request.json();
  const message = await getFrameMessage(body);
  const txCalldata = await getBrianTransactionCalldata(
    requestId!,
    message.buttonIndex - 1
  );
  return {
    postUrl: "/captcha/validate?id=",
    image: <div tw="text-blue-500 flex">Exec</div>,
    buttons: [
      <Button action="tx" key="1" target={`/captcha/validate`}>
        Confirm
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;