(function(){function translate_sugar(tokens,options,tokenizer){var out_tokens,debug,t,ki$1,kobj$1;if(out_tokens=coffee_style_functions(print_statement(noparen_function_calls(multiline_statements(multiline_lists(clean(code_in_strings(tokens,tokenizer))))))),null!=options?options.show_tokens:void 0){for(debug=[],kobj$1=out_tokens,ki$1=0;kobj$1.length>ki$1;ki$1++)t=kobj$1[ki$1],"NEWLINE"===t.type?debug.push("\n"):debug.push(t.value||t.type);console.log(debug.join(" "))}return out_tokens}function clean(tokens){var out_tokens,token,ki$2,kobj$2;for(out_tokens=[],kobj$2=tokens,ki$2=0;kobj$2.length>ki$2;ki$2++)token=kobj$2[ki$2],"WHITESPACE"!==token.type?out_tokens.push(token):out_tokens.length>0&&(out_tokens[out_tokens.length-1].trailed_by_white=!0);return out_tokens}function multiline_statements(tokens){var out_tokens,last_token,continue_line,reduce_dedent,token,skip_token,ki$3,kobj$3;for(out_tokens=[],last_token=null,continue_line=!1,reduce_dedent=0,kobj$3=tokens,ki$3=0;kobj$3.length>ki$3;ki$3++)token=kobj$3[ki$3],skip_token=!1,k$indexof.call([","],null!=last_token?last_token.value:void 0)>=0&&"NEWLINE"===token.type?(continue_line=!0,skip_token=!0):continue_line&&("INDENT"===token.type?(skip_token=!0,reduce_dedent+=1):"NEWLINE"===token.type?skip_token=!0:"DEDENT"===token.type&&(reduce_dedent>0?(reduce_dedent-=1,skip_token=!0,0===reduce_dedent&&out_tokens.push({text:"\n",line:token.line,value:"",type:"NEWLINE"})):out_tokens.push(last_token))),skip_token?void 0:out_tokens.push(token),last_token=token;return out_tokens}function noparen_function_calls(tokens){var out_tokens,close_paren_count,last_token,triggers,closures,ignore_next_indent,i,token,last_token_isnt_reserved,last_token_callable,token_isnt_reserved,non_literal,callable_literal,this_token_not_operator,declaring_a_function,soft_paren,bitwise_shift,closure;for(out_tokens=[],close_paren_count=0,last_token=null,triggers=[],closures=[],ignore_next_indent=!1,i=0;tokens.length>i;){if(token=tokens[i],last_token_isnt_reserved=!(k$indexof.call(KEYWORDS,null!=last_token?last_token.value:void 0)>=0)||"."===(null!=tokens[i-2]?tokens[i-2].value:void 0)||k$indexof.call(RVALUE_OK,null!=last_token?last_token.value:void 0)>=0,last_token_callable="IDENTIFIER"===(null!=last_token?last_token.type:void 0)&&last_token_isnt_reserved||"]"===(null!=last_token?last_token.value:void 0),token_isnt_reserved=!(k$indexof.call(NOPAREN_WORDS,token.value)>=0),non_literal=k$indexof.call(["IDENTIFIER","NUMBER","STRING","REGEX"],token.type)>=0,callable_literal="{"===token.value||"["===token.value&&(null!=last_token?last_token.trailed_by_white:void 0)||"-"===token.value&&">"===(null!=tokens[i+1]?tokens[i+1].value:void 0),this_token_not_operator=(non_literal||callable_literal)&&token_isnt_reserved,declaring_a_function=k$indexof.call(["function","task","method","class"],null!=tokens[i-2]?tokens[i-2].value:void 0)>=0&&"IDENTIFIER"===(null!=last_token?last_token.type:void 0),soft_paren="("===token.value&&token.soft&&!declaring_a_function,bitwise_shift=k$indexof.call(["left","right"],null!=last_token?last_token.value:void 0)>=0&&"bitwise"===(null!=tokens[i-2]?tokens[i-2].value:void 0),last_token_callable&&(this_token_not_operator||soft_paren)&&!bitwise_shift?(triggers.push("NEWLINE"),out_tokens.push({text:"(",line:token.line,value:"(",type:"LITERAL"}),closures.push(")")):("function"===token.value||">"===token.value&&"-"===(null!=last_token?last_token.value:void 0))&&"NEWLINE"===triggers[triggers.length-1]?(triggers[triggers.length-1]="DEDENT",ignore_next_indent=!0):"INDENT"===token.type?ignore_next_indent?ignore_next_indent=!1:(triggers.push("DEDENT"),closures.push("")):"NEWLINE"===token.type&&"INDENT"!==(null!=tokens[i+1]?tokens[i+1].type:void 0)&&(ignore_next_indent=!1),("NEWLINE"===token.type||k$indexof.call(["if","unless","when","except"],token.value)>=0)&&closures.length>0&&"NEWLINE"===triggers[triggers.length-1]){for(;closures.length>0&&"NEWLINE"===triggers[triggers.length-1];)triggers.pop(),closure=closures.pop(),""!==closure?out_tokens.push({text:closure,line:token.line,value:closure,type:"LITERAL"}):void 0;out_tokens.push(token)}else"DEDENT"===token.type&&closures.length>0&&"DEDENT"===triggers[triggers.length-1]?(out_tokens.push(token),triggers.pop(),closure=closures.pop(),""!==closure?out_tokens.push({text:closure,line:token.line,value:closure,type:"LITERAL"}):void 0):(0===closures.length||token.type!==triggers[triggers.length-1])&&out_tokens.push(token);last_token=token,i+=1}for(;closures.length>0;)closure=closures.pop(),""!==closure?out_tokens.push({text:closure,line:token.line,value:closure,type:"LITERAL"}):void 0;return out_tokens}function coffee_style_functions(tokens){var out_tokens,last_token,i,token,new_tokens,t,f_token;for(out_tokens=[],last_token=null,i=0;tokens.length>i;){if(token=tokens[i],"-"===(null!=last_token?last_token.value:void 0)&&">"===(null!=token?token.value:void 0)){if(out_tokens.pop(),new_tokens=[],t=out_tokens.pop(),")"===(null!=t?t.value:void 0)){for(;"("!==(null!=t?t.value:void 0);)new_tokens.unshift(t),t=out_tokens.pop();new_tokens.unshift(t)}else out_tokens.push(t),new_tokens.push({text:"(",line:token.line,value:"(",type:"LITERAL"}),new_tokens.push({text:")",line:token.line,value:")",type:"LITERAL"});f_token={text:"function",line:token.line,value:"function",type:"IDENTIFIER"},new_tokens.unshift(f_token),out_tokens=out_tokens.concat(new_tokens)}else out_tokens.push(token);last_token=token,i+=1}return out_tokens}function code_in_strings(tokens,tokenizer){var out_tokens,token,rv,r,m,add_parens,new_token_text,new_tokens,ki$4,kobj$4;if(null==tokenizer)return tokens;for(out_tokens=[],kobj$4=tokens,ki$4=0;kobj$4.length>ki$4;ki$4++)if(token=kobj$4[ki$4],"STRING"===token.type&&'"'===token.value[0]){for(rv=token.value,r=/#{.*?}/g,m=r.exec(rv),add_parens=m?!0:!1,add_parens?out_tokens.push({text:"(",line:token.line,value:"(",type:"LITERAL",soft:!0}):void 0;m;)new_token_text=rv.slice(0,m.index)+'"',out_tokens.push({text:new_token_text,line:token.line,value:new_token_text,type:"STRING"}),out_tokens.push({text:"+",line:token.line,value:"+",type:"LITERAL"}),new_tokens=tokenizer(rv.slice(m.index+2,m.index+m[0].length-1))[0],1!==new_tokens.length?out_tokens.push({text:"(",line:token.line,value:"(",type:"LITERAL"}):void 0,out_tokens=out_tokens.concat(new_tokens),1!==new_tokens.length?out_tokens.push({text:")",line:token.line,value:")",type:"LITERAL"}):void 0,rv='"'+rv.slice(m.index+m[0].length),'""'===rv?rv="":out_tokens.push({text:"+",line:token.line,value:"+",type:"LITERAL"}),r=/#{.*?}/g,m=r.exec(rv);""!==rv?out_tokens.push({text:rv,line:token.line,value:rv,type:"STRING"}):void 0,add_parens?out_tokens.push({text:")",line:token.line,value:")",type:"LITERAL",soft:!0}):void 0}else out_tokens.push(token);return out_tokens}function multiline_lists(tokens){var out_tokens,list_depth,last_token_was_white,indent_depths,indent_depth,leftover_indent,token,skip_this_token,token_is_white,ki$5,kobj$5;for(out_tokens=[],list_depth=0,last_token_was_white=!1,indent_depths=[],indent_depth=0,leftover_indent=0,kobj$5=tokens,ki$5=0;kobj$5.length>ki$5;ki$5++)token=kobj$5[ki$5],skip_this_token=!1,token_is_white=k$indexof.call(["NEWLINE","INDENT","DEDENT"],token.type)>=0||","===token.value,"["===token.value||"{"===token.value?(list_depth+=1,indent_depths.push(indent_depth),indent_depth=0):"]"===token.value||"}"===token.value?(list_depth-=1,leftover_indent=indent_depth,indent_depth=indent_depths.pop()):"INDENT"===token.type?(indent_depth+=1,0!==leftover_indent&&(leftover_indent+=1,skip_this_token=!0,0===leftover_indent?out_tokens.push({text:"",line:token.line,value:"\n",type:"NEWLINE"}):void 0)):"DEDENT"===token.type?(indent_depth-=1,0!==leftover_indent&&(leftover_indent-=1,0===leftover_indent?out_tokens.push({text:"",line:token.line,value:"\n",type:"NEWLINE"}):void 0,skip_this_token=!0)):"NEWLINE"===token.type?0!==leftover_indent&&(skip_this_token=!0):leftover_indent=0,list_depth>0?token_is_white&&!last_token_was_white?out_tokens.push({text:",",line:token.line,value:",",type:"LITERAL"}):token_is_white||skip_this_token?void 0:out_tokens.push(token):skip_this_token?void 0:out_tokens.push(token),last_token_was_white=token_is_white&&list_depth>0;return out_tokens}function print_statement(tokens){var new_tokens,token,ki$6,kobj$6;for(new_tokens=[],kobj$6=tokens,ki$6=0;kobj$6.length>ki$6;ki$6++)token=kobj$6[ki$6],"print"===token.value&&"IDENTIFIER"===token.type?(new_tokens.push({text:"print",line:token.line,value:"console",type:"IDENTIFIER"}),new_tokens.push({text:"print",line:token.line,value:".",type:"LITERAL"}),new_tokens.push({text:"print",line:token.line,value:"log",type:"IDENTIFIER"})):new_tokens.push(token);return new_tokens}var grammar,KEYWORDS,RVALUE_OK,NOPAREN_WORDS,k$indexof=[].indexOf||function(item){for(var i=0,l=this.length;l>i;i++)if(i in this&&this[i]===item)return i;return-1};grammar=require("./grammar"),KEYWORDS=grammar.KEYWORDS,RVALUE_OK=grammar.RVALUE_OK,NOPAREN_WORDS=["is","otherwise","except","else","doesnt","exist","exists","isnt","inherits","from","and","or","xor","in","when","instanceof","of","nor","if","unless","except","for","with","wait","task","fail","parallel","series","safe","but","bitwise","mod","second","seconds","while","until"],exports.translate_sugar=translate_sugar})();