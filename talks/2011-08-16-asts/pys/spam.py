# spam.py
from _ast import PyCF_ONLY_AST
spam_ast = compile(code, 'spam.py', 'exec', PyCF_ONLY_AST)

import ast
code = """for letter in "hello": print ord(letter)"""
code_ast = ast.parse(code)
print code_ast
print ast.dump(code_ast)

import ast

class PrintVisitor(ast.NodeVisitor):

    def visit_Print(self, node):
        print "line:", node.lineno,
        print "column:", node.col_offset
        print node, "value:", node.values[0].s

        # See the kids
        self.generic_visit(node)

PrintVisitor().visit(ast.parse("def foo(): print 'bar'"))

line: 1 column: 11
<_ast.Print object at 0x1004ab210> value: bar
