import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page, Hey, Loading, AnimatePresence } from "@/components/apology";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hey You 💕" },
      { name: "description", content: "A tiny, cute apology made with love — Hey You 💕." },
      { property: "og:title", content: "Hey You 💕" },
      { property: "og:description", content: "A tiny, cute apology made with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Screen,
});

function Screen() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const id = setTimeout(() => setLoading(false), 3800); return () => clearTimeout(id); }, []);
  return (
    <Page>
      <AnimatePresence>{loading && <Loading key="l" />}</AnimatePresence>
      <Hey />
    </Page>
  );
}
