>>> import ast
>>> code = """for letter in "hello": print ord(letter)"""
>>> code_ast = ast.parse(code)
>>> print code_ast
>>> <_ast.Module object at 0x101569f10>
>>> print ast.dump(code_ast)
>>> Module(body=[For(target=Name(id='letter', ctx=Store()), iter=Str(s='hello'), body=[Print(dest=None, values=[Call(func=Name(id='ord', ctx=Load()), args=[Name(id='letter', ctx=Load())], keywords=[], starargs=None, kwargs=None)], nl=True)], orelse=[])])
