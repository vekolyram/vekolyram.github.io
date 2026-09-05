"""转义 Markdown 正文中的裸尖括号泛型（VitePress 兼容）。

问题：md 里 C# 泛型如 `List<MenuButton>` 的裸 `<MenuButton>`（未用反引号包裹）
会被 VitePress 当作 HTML 标签并交给 Vue 模板编译器，导致 "Element is missing
end tag" 构建错误。

方案：把 代码块(fence)/行内代码(反引号) 之外、`<` 后紧跟大写字母 的裸 `<` 替换为
`&lt;`（渲染结果不变，仍是字面 `<`，但不再被当作 HTML 标签）。真实 HTML 标签
（details/br/img/... 均为小写）不受影响。

用法：python tools/escape_angle.py
"""
import os
import re

DOCS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs")


def process_line(line):
    """转义单行中代码 span 外的裸 <大写...。"""
    out = []
    i = 0
    n = len(line)
    in_code = False
    while i < n:
        ch = line[i]
        if ch == '`':
            in_code = not in_code
            out.append(ch)
            i += 1
            continue
        if not in_code and ch == '<' and i + 1 < n:
            nxt = line[i + 1]
            if nxt.isupper() or nxt == '?' or (nxt == ' ' and False):
                # 只有后跟大写字母才算潜在 C# 泛型/类型引用
                if nxt.isupper():
                    out.append('&lt;')
                    i += 1
                    continue
        out.append(ch)
        i += 1
    return "".join(out)


def process(text):
    lines = text.splitlines(keepends=True)
    out = []
    in_fence = False
    fence_char = None
    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith('```') or stripped.startswith('~~~'):
            marker = stripped[0]
            if not in_fence:
                in_fence = True
                fence_char = marker
            elif fence_char == marker and len(stripped) >= 3 and stripped[:3] == marker * 3:
                in_fence = False
                fence_char = None
            out.append(line)
            continue
        if in_fence:
            out.append(line)
            continue
        out.append(process_line(line))
    return "".join(out)


def main():
    changed = 0
    for root, _dirs, files in os.walk(DOCS):
        for fname in sorted(files):
            if not fname.endswith(".md"):
                continue
            path = os.path.join(root, fname)
            with open(path, encoding="utf-8", newline="") as f:
                text = f.read()
            new_text = process(text)
            if new_text != text:
                with open(path, "w", encoding="utf-8", newline="") as f:
                    f.write(new_text)
                changed += 1
                print("已处理: {}".format(os.path.relpath(path, DOCS)))
    print("共处理 {} 个文件".format(changed))


if __name__ == "__main__":
    main()
