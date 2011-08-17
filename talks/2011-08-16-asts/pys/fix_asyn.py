import ast
import inspect

from pysnmp.entity.rfc3413.oneliner import cmdgen

class AsyncNotAsyn(ast.NodeTransformer):

    def visit_Name(self, node):
        # print node.id, node.lineno

        if 'asynC' == node.id[:5]:

            print node.id.replace('asynC', 'asyncC')
            return ast.copy_location(
                ast.Name(id=ast.Str(s='async' + node.id[4:])), node
            )
        # Visit my kids too
        self.generic_visit(node)

cmdgen_ast = ast.parse(inspect.getsource(cmdgen))

print ast.dump(AsyncNotAsyn().visit(cmdgen_ast))

import ast
import astutil.codegen

class NamePrivatizer(ast.NodeTransformer):

    def visit_Name(self, node):
        return ast.copy_location(
            ast.Name(id='_' + node.id), node
        )
        # Visit my kids too
        self.generic_visit(node)

public_ast = ast.parse("print 'hi'; dog = foo;")
private_ast = NamePrivatizer().visit(public_ast)

print repr(astutil.codegen.to_source(private_ast))
