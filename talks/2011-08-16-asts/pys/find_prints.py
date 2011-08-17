import ast

class PrintVisitor(ast.NodeVisitor):

    def visit_Module(self, node):
        print 'Modular Monkeys'

        # See the kids
        self.generic_visit(node)

    def generic_visit(self, node):
        print node
        ast.NodeVisitor.generic_visit(self, node)

PrintVisitor().visit(ast.parse("def foo(): print 'bar';"))

<_ast.Module object at 0x1004aa190>
<_ast.FunctionDef object at 0x1004aa1d0>
<_ast.arguments object at 0x1004aa210>
<_ast.Print object at 0x1004aa250>
<_ast.Str object at 0x1004aa290>
