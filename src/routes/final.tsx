import { createFileRoute } from "@tanstack/react-router";

import { Page, Final } from "@/components/apology";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "One Last Thing 💕" },
      { name: "description", content: "A tiny, cute apology made with love — One Last Thing 💕." },
      { property: "og:title", content: "One Last Thing 💕" },
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
      
      <Final />
    </Page>
  );
}
