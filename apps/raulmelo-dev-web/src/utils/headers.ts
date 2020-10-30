function trim(str: string) {
  return str.trim();
}

function removeColonSeparator(str: string) {
  const separatorRegex = /;.*/;
  return str.replace(separatorRegex, '');
}

function removeLangWithoutWeight(lang: string) {
  return lang.includes('q=');
}

export function parseAcceptLanguage(headerParam = 'en') {
  return headerParam
    .split(',')
    .filter(removeLangWithoutWeight)
    .map(trim)
    .map(removeColonSeparator);
}
