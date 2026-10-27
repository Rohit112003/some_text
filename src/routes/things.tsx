import { createFileRoute } from "@tanstack/react-router";

import { Page, Stickies } from "@/components/apology";

export const Route = createFileRoute("/things")({
  head: () => ({
    meta: [
      { title: "Little Things I Messed Up" },
      { name: "description", content: "A tiny, cute apology made with love — Little Things I Messed Up." },
      { property: "og:title", content: "Little Things I Messed Up" },
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
      
      <Stickies />
    </Page>
  );
}
