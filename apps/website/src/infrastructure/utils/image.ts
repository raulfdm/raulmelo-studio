export function scaleDownImageSize(width: number, height: number) {
  const maxWidth = 1300;

  if (width <= maxWidth) {
    return { width, height };
  }

  const ratio = maxWidth / width;
  const newWidth = maxWidth;
  const newHeight = Math.floor(height * ratio);

  return { width: newWidth, height: newHeight };
}

export function calculateAspectRatio(
  width: number,
  height: number,
): `${number}:${number}` {
  // Calculate the aspect ratio by dividing the width by the height
  const aspectRatio = width / height;

  // Convert the aspect ratio to a simplified fraction
  const fraction = simplifyFraction(aspectRatio);

  // Combine the numerator and denominator into a string separated by a colon

  return `${fraction.numerator}:${fraction.denominator}`;
}

// Helper function to simplify a fraction
function simplifyFraction(fraction: number) {
  // Find the greatest common divisor of the numerator and denominator
  const findGreatestCommonDivisor = (a: number, b: number): number =>
    b === 0 ? a : findGreatestCommonDivisor(b, a % b);
  const greatestCommonDivisor = findGreatestCommonDivisor(
    Math.floor(fraction * 10000),
    10000,
  );

  // Divide both the numerator and denominator by the greatest common divisor to simplify the fraction
  const numerator = Math.floor((fraction * 10000) / greatestCommonDivisor);
  const denominator = 10000 / greatestCommonDivisor;

  return { numerator, denominator };
}
