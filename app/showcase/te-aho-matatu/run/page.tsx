import type { Metadata } from "next";
import PublicRunDashboard from "./PublicRunDashboard";

export const metadata: Metadata = {
  title: "Run the σ-test yourself | Te Aho Matatū",
  description:
    "Your own private instance of the σ-Correspondence Protocol. Sessions stay on your device and are never submitted — this is not the official pre-registered experiment.",
};

export default function RunPage() {
  return <PublicRunDashboard />;
}
