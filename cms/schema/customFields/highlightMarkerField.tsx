import type {BlockDecoratorDefinition} from 'sanity'

import {HighlighterIcon} from 'lucide-react'

export const highlightMarkerField: BlockDecoratorDefinition = {
  title: `Highlight`,
  value: `highlight`,
  component: ({children, ...props}) => {
    return (
      <span style={{background: `pink`, padding: `0.2em`, color: `black`}} {...props}>
        {children}
      </span>
    )
  },
  icon: () => (
    <div style={{height: `25px`, display: `grid`, placeItems: `center`}}>
      <HighlighterIcon size={16} />
    </div>
  ),
}
