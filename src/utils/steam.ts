export function buildSteamHeaderImage(appId: string | number): string {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;
}

export function buildSteamCapsuleImage(appId: string | number): string {
    return `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${appId}/capsule_184x69.jpg`;
}
