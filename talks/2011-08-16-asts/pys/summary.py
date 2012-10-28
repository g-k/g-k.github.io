import ast
import inspect

ast_ast = ast.parse(inspect.getsource(ast))

for node in ast.iter_child_nodes(ast_ast):
    if isinstance(node, ast.FunctionDef) or isinstance(node, ast.ClassDef):
        print node.name
    ## elif isinstance(node, ast.ImportFrom):
    ##     print node.module, [alias.name for alias in node.names]
    else:
        print node
