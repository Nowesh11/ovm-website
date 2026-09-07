import { redirect } from "next/navigation";

import { equipmentItems } from "@/data/equipment";

/* The section has no landing page of its own — the sidebar is the index, so
   /equipment lands on the first item with that sidebar already in view. */
export default function EquipmentIndexPage() {
  redirect(`/equipment/${equipmentItems[0].slug}`);
}
