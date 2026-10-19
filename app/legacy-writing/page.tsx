import { permanentRedirect } from "next/navigation";

export default function LegacyWritingRedirect() {
  permanentRedirect("/blog");
}
