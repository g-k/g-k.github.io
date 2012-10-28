import sys

from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter

code = sys.stdin.read()

print highlight(code, PythonLexer(stripnl=False, tabsize=4), HtmlFormatter())
