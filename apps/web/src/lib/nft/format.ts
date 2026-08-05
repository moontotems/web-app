/** "0x1234...abcd" style shortening for display. */
export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
