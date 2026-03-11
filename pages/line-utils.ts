import {
  layoutNextLine,
  type LayoutCursor,
  type LayoutLine,
  type PreparedTextWithSegments,
} from '../src/layout.ts'

export type CollectedLines = {
  lineCount: number
  height: number
  lines: LayoutLine[]
}

export function collectLines(
  prepared: PreparedTextWithSegments,
  maxWidth: number,
  lineHeight: number,
): CollectedLines {
  const lines: LayoutLine[] = []
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }

  while (true) {
    const line = layoutNextLine(prepared, cursor, maxWidth)
    if (line === null) break
    lines.push(line)
    cursor = line.end
  }

  return {
    lineCount: lines.length,
    height: lines.length * lineHeight,
    lines,
  }
}
