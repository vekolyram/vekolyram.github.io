#!/usr/bin/env node
/**
 * 生成专栏「编译原理精读」的章节骨架。
 *
 * - docs/Compilers/chNN.md：不存在则按目录数据生成；**已存在则跳过**（不覆盖你的笔记）
 * - docs/Compilers/index.md：刷新 BEGIN/END 标记之间的章节总览表
 *
 * 用法：node tools/gen-compilers.mjs
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { BOOK, CHAPTERS } from './compilers-toc.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIR = resolve(ROOT, 'docs/Compilers')
const INDEX = resolve(DIR, 'index.md')
const BEGIN = '<!-- BEGIN:CHAPTERS -->'
const END = '<!-- END:CHAPTERS -->'

const pad = (n) => String(n).padStart(2, '0')

function chapterPage(ch) {
  const secs = ch.sections.map((s, i) => {
    const num = `${ch.n}.${i + 1}`
    return `## ${num} ${s}\n\n<!-- 笔记：要点 / 直觉 / 与其它章节的联系 -->\n`
  }).join('\n')

  return `---
title: 第${ch.n}章 ${ch.title}
---

# 第${ch.n}章 ${ch.title}

> 原书起始页码：p.${ch.page}

::: info 本页是个人读书笔记
本页是《${BOOK.title}》（${BOOK.edition}）第 ${ch.n} 章的**读书笔记**，不含原书正文。
下面的小节标题只作为阅读索引，用于对齐原书结构；内容由你自己填写。
:::

## 本章速览

<!-- 一两句话：这章要解决什么问题？在全书里处于什么位置？和前后章什么关系？ -->

${secs}
## 小结与习题

<!-- 本章要点回顾；哪些习题值得记一笔 -->

| 习题 | 思路与结论 |
|---|---|
|  |  |
`
}

function indexTable() {
  const rows = CHAPTERS.map((ch) =>
    `| [第${ch.n}章 ${ch.title}](./ch${pad(ch.n)}.md) | p.${ch.page} | ${ch.sections.length} 节 | ⬜ |`
  )
  return [
    BEGIN,
    '<!-- 本表由 `node tools/gen-compilers.mjs` 生成，请勿手工编辑 -->',
    '',
    '| 章 | 原书起始页 | 小节数 | 进度 |',
    '|---|---|---|---|',
    ...rows,
    '',
    END,
  ].join('\n')
}

function main() {
  mkdirSync(DIR, { recursive: true })

  let created = 0, skipped = 0
  for (const ch of CHAPTERS) {
    const f = resolve(DIR, `ch${pad(ch.n)}.md`)
    if (existsSync(f)) { skipped++; continue }
    writeFileSync(f, chapterPage(ch), 'utf8')
    created++
  }

  if (!existsSync(INDEX)) {
    console.error('✗ 缺少 docs/Compilers/index.md（该文件需手工维护说明部分）')
    process.exit(1)
  }
  const md = readFileSync(INDEX, 'utf8')
  const a = md.indexOf(BEGIN), b = md.indexOf(END)
  if (a === -1 || b === -1 || b < a) {
    console.error(`✗ 未在 index.md 中找到 ${BEGIN} / ${END} 标记`)
    process.exit(1)
  }
  writeFileSync(INDEX, md.slice(0, a) + indexTable() + md.slice(b + END.length), 'utf8')

  console.log(`✓ 章节页：新建 ${created} 个，跳过已存在 ${skipped} 个（不覆盖笔记）`)
  console.log(`✓ 已刷新 index.md 章节总览表（共 ${CHAPTERS.length} 章）`)
}

main()
