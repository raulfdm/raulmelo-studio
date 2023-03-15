import { useMachine } from '@xstate/react';
import classNames from 'classnames';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import { createMachine } from 'xstate';

import { ConfiguredRefractor } from './ConfiguredRefractor';

interface ICodeBlockProps {
  code: string;
  language?: string;
  highlightedLines?: string;
  filename?: string;
  copyTitle?: string;
  copyTooltipTitle?: string;
}

const copyMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./CodeBlock.typegen').Typegen0,
    schema: {
      events: {} as { type: 'COPY'; code: string },
    },
    initial: 'notCopied',
    states: {
      notCopied: {
        on: {
          COPY: {
            target: 'copied',
            actions: ['copyCode'],
          },
        },
      },
      copied: {
        after: {
          2000: 'notCopied',
        },
      },
    },
  },
  {
    actions: {
      copyCode: (_, event) => {
        navigator.clipboard.writeText(event.code);
      },
    },
  },
);

export function CodeBlock({
  code,
  language,
  filename,
  highlightedLines,
  copyTitle = 'Copy',
  copyTooltipTitle = 'Copied',
}: ICodeBlockProps) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [tooltipElement, setTooltipElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, tooltipElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const [state, send] = useMachine(copyMachine);

  if (!code) {
    return null;
  }

  let lang = language;

  if (!lang || lang === 'text' || !ConfiguredRefractor.hasLanguage(language)) {
    lang = 'plaintext';
  }

  async function onCopyCode() {
    send({ type: 'COPY', code });
  }

  return (
    <div className="relative code-snippet">
      <button
        ref={setReferenceElement as never}
        type="button"
        title={copyTitle}
        className="absolute p-1 text-gray-500 transition-colors focus:outline-white top-1 right-1 hover:text-gray-300"
        style={{
          backgroundColor: 'var(--syntax-bg)',
        }}
        onClick={onCopyCode}
      >
        {/* <ClipboardIcon /> */}
        COPY
      </button>
      <span
        ref={setTooltipElement as never}
        style={{
          ...styles.popper,
          fontFamily: 'monospace',
        }}
        className={classNames(
          'px-2 py-1 text-sm font-bold bg-green-600 rounded text-gray-50 transition-all',
          {
            'opacity-0': state.matches('notCopied'),
            'opacity-100': state.matches('copied'),
          },
        )}
        {...attributes.popper}
      >
        {copyTooltipTitle}
      </span>

      {filename && <Filename filename={filename} />}
      <ConfiguredRefractor
        language={lang}
        value={code}
        markers={getLines(highlightedLines)}
      />
    </div>
  );
}

function Filename({ filename }: { filename: string }) {
  return (
    <div className="filename">
      <span>{filename}</span>
    </div>
  );
}

function getLines(lines?: string): number[] {
  /**
   * Don't know how but sometimes I got lines as number[]
   */
  if (Array.isArray(lines)) {
    return lines;
  }

  if (!lines || !lines.trim()) {
    return [];
  }
  const allLines = lines.split(',');

  const result = [];

  for (const line of allLines) {
    const [initial, end] = line.split('-');
    const initialParsed = parseInt(initial, 10);

    if (!end) {
      result.push(initialParsed);
    }

    const endParsed = parseInt(end, 10);

    for (let i = initialParsed; i <= endParsed; i++) {
      result.push(i);
    }
  }

  return result;
}
