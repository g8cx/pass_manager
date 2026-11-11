import { getCollections } from "../../services/sidebar/collection_load_service.js";
import { renderCollections } from "./render_collections.js";
// Effects
import { updateWheelEffect } from "./effects/scroll_drum_effect.js";
import { updateScrollShadows } from "./effects/scroll_shadow_effect.js";
import { innitSwitchCollections } from "./effects/switch_collections.js";

export async function initSidebar() {
  const container = document.querySelector("#collections_navigation");

  if (!container) return;

  try {
    const collections = await getCollections();

    await renderCollections(collections, container);

    updateWheelEffect();
    updateScrollShadows();
    innitSwitchCollections();
  } catch (error) {
    console.error("Sidebar initialization error:", error);
  }
}
