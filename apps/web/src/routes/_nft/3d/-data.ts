export const TOTEM_MODEL_IDS = [1, 2, 3, 4] as const

export function getTotemModelUrl(id: number) {
  return `/models/totem${id}.glb`
}
