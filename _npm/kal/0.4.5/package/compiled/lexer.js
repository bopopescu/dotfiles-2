(function(){function tokenize(code){var lex;return lex=new Lexer(code),[lex.tokens,lex.comments]}function Lexer(code,line_number){this.code=code,this.line=line_number||1,this.indent=0,this.indents=[],this.tokenize()}var parse_token,token_types;exports.tokenize=tokenize,Lexer.prototype.tokenize=function(){var last_token_type,index,chunk,regex,type,text,ki$1,kobj$1,tt,code,context_len,val,comment_token;for(this.tokens=[],this.comments=[],last_token_type=null,index=0;this.code.length>index;){for(chunk=this.code.slice(index),kobj$1=token_types,ki$1=0;kobj$1.length>ki$1;ki$1++)if(tt=kobj$1[ki$1],regex=tt[0],type=tt[1],text=null!=regex.exec(chunk)?regex.exec(chunk)[0]:void 0,null!=text){this.type=type;break}text||(code=(""+this.code).trim(),context_len=code.length>=16?16:code.length,null==text?this.error("invalid token '"+code.slice(index,index+context_len)+"...' on line "+this.line):void 0),val=parse_token[this.type](text),"NEWLINE"===last_token_type&&this.handleIndentation(type,text),"COMMENT"===type?(comment_token={text:text,line:this.line,value:val,type:type},comment_token.post_fix="NEWLINE"===(null!=this.tokens[this.tokens.length-1]?this.tokens[this.tokens.length-1].type:void 0)?!1:!0,comment_token.multiline=val.match(/\n/)?!0:!1,this.comments.push(comment_token)):this.tokens.push({text:text,line:this.line,value:val,type:type}),index+=text.length,this.line+=(null!=text.match(/\n/g)?text.match(/\n/g).length:void 0)||0,last_token_type=type}this.tokens.push({text:"\n",line:this.line,value:"",type:"NEWLINE"}),this.handleIndentation("NEWLINE",""),"NEWLINE"===this.tokens[this.tokens.length-1].type?this.tokens.pop():void 0},Lexer.prototype.handleIndentation=function(type,text){var indentation;if(indentation="WHITESPACE"===type?text.length:0,indentation>this.indent)this.indents.push(this.indent),this.indent=indentation,this.tokens.push({text:text,line:this.line,value:"",type:"INDENT"});else if(this.indent>indentation){for(;this.indents.length>0&&this.indent>indentation;)this.indent=this.indents.pop(),indentation>this.indent?this.error("indentation is misaligned on line "+this.line):void 0,this.tokens.push({text:text,line:this.line,value:"",type:"DEDENT"});indentation!==this.indent?this.error("indentation is misaligned"):void 0}},Lexer.prototype.error=function(message){throw message},exports.Lexer=Lexer,parse_token={},parse_token.NUMBER=function(text){return Number(text)},parse_token.STRING=function(text){return text},parse_token.IDENTIFIER=function(text){return text},parse_token.NEWLINE=function(){return""},parse_token.WHITESPACE=function(){return" "},parse_token.COMMENT=function(text){var rv;return rv=text.trim(),rv="#"===rv[1]?rv.slice(3,-3):rv.slice(1),rv=rv.replace(/^\s+/,""),rv=rv.replace(/\n[\f\r\t\v\u00A0\u2028\u2029 ]*#*[\f\r\t\v\u00A0\u2028\u2029 ]*/g,"\n * "),rv.replace(/(\/\*)|(\*\/)/g,"**")},parse_token.LITERAL=function(text){return text.replace(/[\f\r\t\v\u00A0\u2028\u2029 ]/,"")},parse_token.REGEX=function(text){return text},token_types=[[/^###([^#][\s\S]*?)(?:###[^\n\S]*|(?:###)?$)|^(?:\s*#(?!##[^#]).*)+/,"COMMENT"],[/^(\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)([imgy]{0,4})(?!\w)/,"REGEX"],[/^0x[a-f0-9]+/i,"NUMBER"],[/^[0-9]+(\.[0-9]+)?(e[+-]?[0-9]+)?/i,"NUMBER"],[/^'(?:[^'\\]|\\.)*'/,"STRING"],[/^"(?:[^"\\]|\\.)*"/,"STRING"],[/^[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*/,"IDENTIFIER"],[/^\n([\f\r\t\v\u00A0\u2028\u2029 ]*\n)*\r*/,"NEWLINE"],[/^[\f\r\t\v\u00A0\u2028\u2029 ]+/,"WHITESPACE"],[/^[\<\>\!\=]\=/,"LITERAL"],[/^[\+\-\*\/\^\=\.><\(\)\[\]\,\.\{\}\:\?]/,"LITERAL"]]})();