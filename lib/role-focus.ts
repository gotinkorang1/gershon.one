import { roleFocusProfiles, type RoleFocusId } from "@/lib/site";

export function isRoleFocusId(value: string): value is RoleFocusId {
  return roleFocusProfiles.some((profile) => profile.id === value);
}

export function getRoleFocus(id: RoleFocusId | null) {
  return id ? roleFocusProfiles.find((profile) => profile.id === id) ?? null : null;
}

export function prioritizeByKeys<T>(
  items: readonly T[],
  priorities: readonly string[] | undefined,
  getKey: (item: T, index: number) => string,
): T[] {
  if (!priorities?.length) return [...items];

  const ranks = new Map(priorities.map((key, index) => [key, index]));
  return items
    .map((item, index) => ({ item, index, rank: ranks.get(getKey(item, index)) }))
    .sort((a, b) => {
      if (a.rank === undefined && b.rank === undefined) return a.index - b.index;
      if (a.rank === undefined) return 1;
      if (b.rank === undefined) return -1;
      return a.rank - b.rank;
    })
    .map(({ item }) => item);
}

export function isTopMatch(
  key: string,
  priorities: readonly string[] | undefined,
  limit = 2,
) {
  return priorities?.slice(0, limit).includes(key) ?? false;
}
