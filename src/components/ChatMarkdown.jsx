/** Renders basic chat markdown: **bold**, *italic*, and line breaks. */
const ChatMarkdown = ({ text, className = '' }) => {
  if (!text) return null

  const lines = String(text).split('\n')

  return (
    <span className={`whitespace-pre-wrap ${className}`}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 && <br />}
          {parseInline(line)}
        </span>
      ))}
    </span>
  )
}

function parseInline(line) {
  const nodes = []
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*)/g
  let lastIndex = 0
  let match
  let key = 0

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index))
    }
    if (match[2] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-on-surface">
          {match[2]}
        </strong>
      )
    } else if (match[3] !== undefined) {
      nodes.push(<em key={key++}>{match[3]}</em>)
    }
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex))
  }

  return nodes.length ? nodes : line
}

export default ChatMarkdown
