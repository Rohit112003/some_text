import { createFileRoute } from "@tanstack/react-router";

import { Page, Songs } from "@/components/apology";

export const Route = createFileRoute("/songs")({
  head: () => ({
    meta: [
      { title: "Songs That Remind Me Of You 🎶" },
      { name: "description", content: "A tiny, cute apology made with love — Songs That Remind Me Of You 🎶." },
      { property: "og:title", content: "Songs That Remind Me Of You 🎶" },
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
      
      <Songs />
    </Page>
  );
}
