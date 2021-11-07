import rangeParser from 'parse-numeric-range';

import { ClassInformation, NodeWithProperties } from '../types';

const LANGUAGE_PREFIX = 'language-';
const LINE_RANGE_REGEX = /{.*}/g;

export function extractClassInformationFromNode(
  node: NodeWithProperties,
): ClassInformation | undefined {
  const originalClassName = extractLanguageClassNameFromNode(node);

  if (!originalClassName) {
    return;
  }

  const normalizedClassName = normalizeLanguageClassName(originalClassName);

  return {
    originalClassName,
    languageClassName: normalizedClassName,
    language: extractLanguage(normalizedClassName),
    markers: extractLineRange(originalClassName),
  };
}

function normalizeLanguageClassName(className: string): string {
  return className.replace(LINE_RANGE_REGEX, '').toLowerCase();
}

function extractLanguage(className: string): string {
  return className.replace(LANGUAGE_PREFIX, '').replace(LINE_RANGE_REGEX, '');
}

function extractLanguageClassNameFromNode(
  node: NodeWithProperties,
): string | undefined {
  const classNames = node.properties.className || [];

  for (const className of classNames) {
    if (className.slice(0, 9) === LANGUAGE_PREFIX) {
      return className;
    }
  }

  return undefined;
}

function extractLineRange(className: string): number[] | undefined {
  const [rawLines] = LINE_RANGE_REGEX.exec(className) ?? [];

  if (!rawLines) {
    return;
  }

  const sanitizedLines = rawLines.replace('{', '').replace('}', '');

  return rangeParser(sanitizedLines);
}
