"""把 MkDocs/Material 特化语法转换为 VitePress 兼容语法。

在 everest-vitepress/docs/ 的 md 副本上运行：
  1. `!!! type "中文标题"` Python-Markdown admonition → VitePress GitHub callout：
     `> [!TYPE] 中文标题` + 内容行加 `> ` 前缀
  2. `<details markdown="1">` → `<details>`（markdown-it 靠空行分隔解析内部 Markdown）

用法：python tools/convert_vitepress.py
"""
import os
import re

DOCS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs")

ADMON = re.compile(r'^!!!\s+(\w+)(?:\s+"([^"]*)")?\s*$')
TYPE_MAP = {
    "note": "NOTE",
    "tip": "TIP",
    "important": "IMPORTANT",
    "warning": "WARNING",
    "danger": "DANGER",
    "caution": "CAUTION",
    "info": "NOTE",   # VitePress 无 INFO，回退 NOTE
}
DEFAULT_TITLE = {
    "note": "说明", "tip": "提示", "important": "重要", "warning": "警告",
    "danger": "危险", "caution": "小心", "info": "信息",
}


def convert(text):
    lines = text.splitlines(keepends=True)
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = ADMON.match(line)
        if m:
            atype = m.group(1).lower()
            alert = TYPE_MAP.get(atype)
            if alert is None:
                out.append(line)
                i += 1
                continue
            title = m.group(2) or DEFAULT_TITLE.get(atype, "")
            out.append("> [!{}] {}\n".format(alert, title))
            i += 1
            # 收集 4 空格缩进内容，直到非缩进行
            while i < len(lines):
                l = lines[i]
                if l.startswith("    ") or l.startswith("\t"):
                    out.append("> " + l[4:] if l.startswith("    ") else "> " + l[1:])
                    i += 1
                elif l.strip() == "":
                    # admonition 内部空行
                    out.append(">\n")
                    i += 1
                else:
                    break
            continue
        # 处理 <details> 属性
        if re.match(r"^<details\s+markdown=\"1\"\s*>", line):
            out.append("<details>\n")
            i += 1
            continue
        if re.match(r"^<details\s+markdown=\"1\"\s*/>", line) or re.match(r"^<details\s+markdown=\"1\"\s*>\s*$", line):
            out.append("<details>\n")
            i += 1
            continue
        out.append(line)
        i += 1
    return "".join(out)


def main():
    total_files = 0
    for root, _dirs, files in os.walk(DOCS):
        for fname in sorted(files):
            if not fname.endswith(".md"):
                continue
            path = os.path.join(root, fname)
            with open(path, encoding="utf-8", newline="") as f:
                text = f.read()
            new_text = convert(text)
            if new_text != text:
                with open(path, "w", encoding="utf-8", newline="") as f:
                    f.write(new_text)
                total_files += 1
                print("已转换: {}".format(os.path.relpath(path, DOCS)))
    print("共转换 {} 个文件".format(total_files))


if __name__ == "__main__":
    main()
