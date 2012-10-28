import ast
import subprocess

import astutil.codegen



class NamePrivatizer(ast.NodeTransformer):

    def visit_Name(self, node):
        node.id

        new_name = subprocess.call( )

        return ast.copy_location(
            ast.Name(id='_' + node.id), node
        )
        # Visit my kids too
        self.generic_visit(node)

public_ast = ast.parse("print 'big_foooo'; dog = foo;")
private_ast = NamePrivatizer().visit(public_ast)

print astutil.codegen.to_source(private_ast)
