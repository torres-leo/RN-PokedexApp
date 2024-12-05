function isColorLight(hexColor: string): boolean {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is light
  return brightness > 128; // Adjust threshold if needed
}

export function getReadableTextColor(backgroundColor: string): string {
  return isColorLight(backgroundColor) ? '#000000' : backgroundColor;
}
