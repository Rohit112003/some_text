import { createFileRoute } from "@tanstack/react-router";

import { Page, Letter } from "@/components/apology";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "A Letter For You 💝" },
      { name: "description", content: "A tiny, cute apology made with love — A Letter For You 💝." },
      { property: "og:title", content: "A Letter For You 💝" },
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
      
      <Letter />
    </Page>
  );
}
