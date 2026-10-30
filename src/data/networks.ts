import { Briefcase, Camera, FileText, Globe, Hash, Mail, Music2, Play, Users } from "lucide-react";
import type { Red } from "@/types/content";

export const REDES: Red[] = [
  { id: "instagram", nombre: "Instagram", icon: Camera, color: "#C1366B" },
  { id: "facebook", nombre: "Facebook", icon: Users, color: "#3B5998" },
  { id: "tiktok", nombre: "TikTok", icon: Music2, color: "#1F1F1F" },
  { id: "x", nombre: "X", icon: Hash, color: "#1C1C1C" },
  { id: "linkedin", nombre: "LinkedIn", icon: Briefcase, color: "#0A66C2" },
  { id: "youtube", nombre: "YouTube", icon: Play, color: "#C4281C" },
  { id: "blog", nombre: "Blog", icon: FileText, color: "#6B5B95" },
  { id: "email", nombre: "Email", icon: Mail, color: "#3E7A52" },
  { id: "web", nombre: "Sitio web", icon: Globe, color: "#3B4A8F" },
];

export function redById(id: string): Red | undefined {
  return REDES.find((r) => r.id === id);
}
