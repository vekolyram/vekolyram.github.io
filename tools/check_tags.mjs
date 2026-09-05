import { readFileSync } from 'fs'
import { createMarkdownRenderer } from 'vitepress'

const src = readFileSync(process.env.TEMP + '/ct.md', 'utf8')
const md = await createMarkdownRenderer('docs', {})
const html = md.render(src)
const voidTags = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'])
const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g
const stack = []
let m
while ((m = re.exec(html))) {
  const full = m[0], tag = m[1]
  if (full.startsWith('</')) {
    const top = stack.pop()
    if (top !== tag) {
      console.log('不匹配: 期待 </' + top + '> 但遇到 </' + tag + '> @ index ' + m.index)
      console.log('附近:', html.slice(Math.max(0, m.index - 200), m.index + 200))
      break
    }
  } else if (!voidTags.has(tag) && !full.endsWith('/>')) {
    stack.push(tag)
  }
}
if (stack.length) console.log('未闭合元素栈:', stack.slice(-20).join(' > '))
else console.log('所有标签闭合 OK')
