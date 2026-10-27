import { createFileRoute } from "@tanstack/react-router";

import { Page, Envelope } from "@/components/apology";

export const Route = createFileRoute("/note")({
  head: () => ({
    meta: [
      { title: "A Little Note 💌" },
      { name: "description", content: "A tiny, cute apology made with love — A Little Note 💌." },
      { property: "og:title", content: "A Little Note 💌" },
      { property: "og:description", content: "A tiny, cute apology made with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Screen,
});

function Screen() {
  return (
    <Page>
      
      <Envelope />
    </Page>
  );
}
