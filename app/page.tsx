import { NextServerPageProps } from "frames.js/next/server";
import { vercelURL } from "./utils";
import { metadataToMetaTags } from "frames.js/next/pages-router/client";

import {
  Frame,
  getFrameFlattened,
  getFrameHtml,
  GetFrameHtmlOptions,
} from "frames.js";
import Head from "next/head";
import { metadata } from "./layout";
import { title } from "process";

export async function generateMetadata() {
  const frame: Frame = {
    version: "vNext",
    image: `${vercelURL()}/images/intro.gif`,
    postUrl: "https://brianknows.org",
    imageAspectRatio: "1:1",
    buttons: [
      {
        target: "https://www.brianknows.org/",
        label: "📚 Brian API",
        action: "link",
      },
      {
        target: `${vercelURL()}/instructions`,
        label: "ℹ️ Instructions",
        action: "post",
      },
      {
        label: "🤖 Start ",
        target: `${vercelURL()}/captcha`,
        action: "post",
      },
    ],
  };
  const frameMetadata = getFrameFlattened(frame);
  return {
    title: "Brian Frame",
    other: {
      ...frameMetadata,
    },
  };
}

export default function Page() {
  return (
    <div className="p-4">
      <h1>Ciao</h1>
    </div>
  );
}
