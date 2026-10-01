"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getMe, readSnapshot, subscribe } from "@/lib/api";

const SERVER = "__server__";

/** Current signed-in entrant. `undefined` while hydrating, `null` when nobody is signed in. */
export function useMe() {
  const raw = useSyncExternalStore(subscribe, readSnapshot, () => SERVER);
  // `raw` is the cache key: re-derive only when the stored data changes.
  return useMemo(() => (raw === SERVER ? undefined : getMe()), [raw]);
}
