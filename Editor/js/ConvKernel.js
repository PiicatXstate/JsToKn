function collectTypeObjects(ast) {
    const result = [];
    
    function traverse(value) {
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                for (const item of value) {
                    traverse(item);
                }
            } else {
                if ('type' in value) {
                    result.push(value);
                }
                // 递归遍历所有属性值
                for (const key in value) {
                    traverse(value[key]);
                }
            }
        }
    }
    
    traverse(ast);
    return result;
}


function isMatch(original, rules) {
    function checkObject(originalObj, ruleObj) {
        for (const key in ruleObj) {
            if (!originalObj.hasOwnProperty(key)) return false
            if (!checkValue(originalObj[key], ruleObj[key])) return false
        }
        return true
    }
  
    function checkValue(originalVal, ruleVal) {
        if (ruleVal === null) return originalVal === null
        if (originalVal === null) return false
        if (typeof ruleVal !== typeof originalVal) return false
        if (Array.isArray(ruleVal)) {
            if (!Array.isArray(originalVal)) return false
            return checkArray(originalVal, ruleVal)
        }
        if (typeof ruleVal === 'object') {
            return checkObject(originalVal, ruleVal)
        }
  
        return originalVal === ruleVal
    }
  
    function checkArray(originalArr, ruleArr) {
        if (ruleArr.length > originalArr.length) return false
      
        const originalCopy = [...originalArr]
      
        for (const ruleItem of ruleArr) {
            const foundIndex = originalCopy.findIndex(originalItem => 
                checkValue(originalItem, ruleItem)
            )
        
            if (foundIndex === -1) return false
            originalCopy.splice(foundIndex, 1)
        }
        return true
    }
  
    return checkObject(original, rules)
}


function insertCharacter(str, char, index) {
    return str.substring(0, index) + char + str.substring(index);
}

function removeChars(str, n, m) {
    n = Math.max(0, parseInt(n, 10) || 0);
    m = (parseInt(m, 10) || 0)-1;
    if (n > m) [n, m] = [m, n];
    if (m >= str.length) m = str.length - 1;
    return str.slice(0, n) + str.slice(m + 1);
}


function ConvKernel(code){
    // 格式化代码
    let rule = 
    [
        {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "Start"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "id": null,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement"
                  }
                }
              ],
              "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "Identifier",
                        "name": "console"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "log"
                    },
                    "computed": false,
                    "optional": false
                },
                "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "wait"
                },
                "arguments": [],
                "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "object": {},
                "property": {
                  "type": "Identifier",
                  "name": "onclick"
                },
                "computed": false,
                "optional": false
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "id": null,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  }
                }
              ],
              "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "object": {},
                "property": {
                  "type": "Identifier",
                  "name": "mousedown"
                },
                "computed": false,
                "optional": false
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "id": null,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  }
                }
              ],
              "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "object": {},
                "property": {
                  "type": "Identifier",
                  "name": "mouseup"
                },
                "computed": false,
                "optional": false
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "id": null,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  }
                }
              ],
              "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                "type": "Identifier",
                "name": "Slip"
                },
                "property": {
                "type": "Identifier",
                "name": "up"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                "type": "Identifier",
                "name": "Slip"
                },
                "property": {
                "type": "Identifier",
                "name": "down"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                "type": "Identifier",
                "name": "Slip"
                },
                "property": {
                "type": "Identifier",
                "name": "left"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                "type": "Identifier",
                "name": "Slip"
                },
                "property": {
                "type": "Identifier",
                "name": "right"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "Keydown"
            },
            "arguments": [
                {
                "type": "Literal",
                },
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {},
                "property": {
                "type": "Identifier",
                "name": "collide"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [
                {
                "type": "Literal",
                },
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "Trig"
            },
            "arguments": [
                {
                },
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "Cast"
            },
            "arguments": [
                {
                "type": "Literal",
                },
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [
                    {
                    "type": "Identifier",
                    "name": "castParam"
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "Cast"
            },
            "arguments": [
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "cast"
            },
            "arguments": [
                {
                "type": "Literal",
                },
                {
                "type": "Literal",
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "cast"
            },
            "arguments": [],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "castwait"
            },
            "arguments": [],
            "optional": false
            }
        },
        {
            "type": "MemberExpression",
            "object": {
              "type": "Identifier",
              "name": "cast"
            },
            "property": {
              "type": "Identifier",
              "name": "judge"
            },
            "computed": false,
            "optional": false
        },
        {
            "type": "Identifier",
            "name": "castParam"
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "screen"
            },
            "arguments": [
                {
                "type": "Literal"
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "stop"
            },
            "arguments": [
                {
                "type": "Literal"
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "restart"
            },
            "arguments": [],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "Clone"
            },
            "arguments": [
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {},
                "property": {
                "type": "Identifier",
                "name": "clone"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                "type": "Identifier",
                "name": "clone"
                },
                "property": {
                "type": "Identifier",
                "name": "delete"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [],
            "optional": false
            }
        },
        {
            "type": "MemberExpression",
            "object": {
              "type": "Identifier",
              "name": "clone"
            },
            "property": {
              "type": "Identifier",
              "name": "num"
            },
            "computed": false,
            "optional": false
        },
        {
            "type": "MemberExpression",
            "object": {
              "type": "MemberExpression",
              "object": {},
              "property": {
                "type": "Identifier",
                "name": "clone"
              },
              "computed": false,
              "optional": false
            },
            "property": {
              "type": "Identifier",
              "name": "num"
            },
            "computed": false,
            "optional": false
        },
        {
            "type": "BreakStatement",
            "label": null
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "waituntil"
            },
            "arguments": [],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "step"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "id": null,
                  "expression": false,
                  "generator": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement"
                  }
                }
              ],
              "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "move"
            },
            "arguments": [],
            "optional": false
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "Keyup"
            },
            "arguments": [
                {
                "type": "Literal",
                },
                {
                "type": "ArrowFunctionExpression",
                "id": null,
                "expression": false,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
                }
            ],
            "optional": false
            }
        },
    ]
    let judge = true;
    let trav,trav2,text,text2,contrast,contrast2;
    let ast = acorn.parse(code, {
        ecmaVersion: 2022,
        locations: false
    });
    code = astring.generate(ast).split("\n").join("");
    while(judge){
        ast = acorn.parse(code,{
            ecmaVersion: 2022,
            locations: false
        });
        ast = collectTypeObjects(ast)
        trav2 = 0
        for(trav of ast){
            console.log(rule[31])
            if(isMatch(trav,rule[0])){
                // 当开始运行
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当开始运行',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[1])){
                // 打印
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'打印',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[2])){
                // 等待秒数
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'等待秒数',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[3])){
                // 当点击角色
                text = code.substring(trav["expression"]["callee"]["start"],trav["expression"]["callee"]["property"]["start"]-1)
                code = insertCharacter(code,'"点击",' + text + ',',trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当触发事件',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[4])){
                // 当按下角色
                text = code.substring(trav["expression"]["callee"]["start"],trav["expression"]["callee"]["property"]["start"]-1)
                code = insertCharacter(code,'"按下",' + text + ',',trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当触发事件',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[5])){
                // 当放开角色
                text = code.substring(trav["expression"]["callee"]["start"],trav["expression"]["callee"]["property"]["start"]-1)
                code = insertCharacter(code,'"放开",' + text + ',',trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当触发事件',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[6])){
                // 当向上滑动屏幕
                code = insertCharacter(code,'"向上",',trav["expression"]["arguments"][0]["start"])
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当滑动屏幕',trav["expression"]["callee"]["start"])
                console.log(code)
                break
            }else if(isMatch(trav,rule[7])){
                // 当向下滑动屏幕
                code = insertCharacter(code,'"向下",',trav["expression"]["arguments"][0]["start"])
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当滑动屏幕',trav["expression"]["callee"]["start"])
                console.log(code)
                break
            }else if(isMatch(trav,rule[8])){
                // 当向左滑动屏幕
                code = insertCharacter(code,'"向左",',trav["expression"]["arguments"][0]["start"])
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当滑动屏幕',trav["expression"]["callee"]["start"])
                console.log(code)
                break
            }else if(isMatch(trav,rule[9])){
                // 当向右滑动屏幕
                code = insertCharacter(code,'"向右",',trav["expression"]["arguments"][0]["start"])
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当滑动屏幕',trav["expression"]["callee"]["start"])
                console.log(code)
                break
            }else if(isMatch(trav,rule[10])){
                // 当按下键盘
                text = trav["expression"]["arguments"][0]['value']
                text2 = trav["expression"]["callee"]["name"]
                contrast = {
                    'Keydown':'按下',
                    'Keyup':'放开'
                }
                contrast2 = {
                    'Space':'空格键',
                    'Enter':'回车键',
                    'ArrowUp':'↑',
                    'ArrowDown':'↓',
                    'ArrowLeft':'←',
                    'ArrowRight':'→',
                    'Any':'任意键'
                }
                code = removeChars(code,trav["expression"]["arguments"][0]["start"],trav["expression"]["arguments"][0]["end"])
                code = insertCharacter(code,'"' + contrast[text2] +'","' + (text in contrast2 ? contrast2[text] : text) + '"',trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当键盘触发',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[11])){
                // 当碰撞事件发生
                contrast = {
                    'start':'开始',
                    'keep':'持续',
                    'end':'结束'
                }
                text2 = trav["expression"]["arguments"][0]["value"]
                code = removeChars(code,trav["expression"]["arguments"][0]["start"],trav["expression"]["arguments"][0]["end"])
                text = code.substring(trav["expression"]["callee"]["start"],trav["expression"]["callee"]["property"]["start"]-1)
                code = insertCharacter(code,'"' + contrast[text2] +'",' + text,trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当碰撞发生',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[12])){
                // 当条件满足
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当条件满足时触发',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[13])){
                // 当收到广播带参数
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当收到广播带参数',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[14])){
                // 当收到广播
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当收到广播',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[15])){
                // 发送广播带参数
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'发送广播带参数',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[16])){
                // 发送广播
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'发送广播',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[17])){
                // 发送广播并等待
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'发送广播并等待',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[18])){
                // 判断是否收到广播
                code = removeChars(code,trav["start"],trav["end"])
                code = insertCharacter(code,'判断是否收到广播',trav["start"])
                break
            }else if(isMatch(trav,rule[19])){
                // 广播带参数
                code = removeChars(code,trav["start"],trav["end"])
                code = insertCharacter(code,'内容',trav["start"])
                break
            }else if(isMatch(trav,rule[20])){
                // 切换屏幕
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'切换到屏幕',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[21])){
                // 停止脚本
                contrast = ["全部脚本","当前脚本","当前角色的其它脚本","其它角色的脚本"]
                text = trav["expression"]["arguments"][0]["value"]
                code = removeChars(code,trav["expression"]["arguments"][0]["start"],trav["expression"]["arguments"][0]["end"])
                code = insertCharacter(code,'"' + contrast[text] + '"',trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'停止脚本',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[22])){
                // 重启
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'重启',trav["expression"]["callee"]["start"])
                break
            // }else if(isMatch(trav,rule[23])){
            //     // 改变切换屏幕的特效
            //     text = []
            //     text2 = []
            //     trav["expression"]['arguments'].forEach(item => {
            //         text.push(item.value);
            //     });
            //     contrast = {
            //         'up':'向上',
            //         'down':'向下',
            //         'left':'向左',
            //         'right':'向右',
            //         'move':'移入',
            //         'bounce':'弹入',
            //         'appear':'渐显',
            //         'distort':'扭曲',
            //         '':'无效果',
            //     }
            //     text.forEach(item =>{
            //         text2.push('"' + contrast[item] + '"')
            //     })
            //     code = removeChars(code,trav["expression"]["arguments"][0]["start"],trav["end"]-2)
            //     code = insertCharacter(code,text2.toString(),trav["expression"]["callee"]["end"]+1)
            //     code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
            //     code = insertCharacter(code,'设置切屏特效',trav["expression"]["callee"]["start"])
            //     break
            }else if(isMatch(trav,rule[23])){
                // 当克隆体启动时
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当克隆体启动',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[24])){
                // 克隆角色
                text = code.substring(trav["expression"]["callee"]["start"],trav["expression"]["callee"]["property"]["start"]-1)
                code = insertCharacter(code,text,trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'克隆',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[25])){
                // 删除本克隆角色
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'删除本克隆体',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[26])){
                // 克隆体编号
                code = removeChars(code,trav["start"],trav["end"])
                code = insertCharacter(code,'克隆体编号()',trav["start"])
                break
            }else if(isMatch(trav,rule[27])){
                // 角色克隆体总数
                text = code.substring(trav["object"]["object"]["start"],trav["object"]["object"]["end"])
                code = removeChars(code,trav["start"],trav["end"]+2)
                code = insertCharacter(code,'克隆体总数(' + text +')',trav["start"])
                break
            }else if(isMatch(trav,rule[28])){
                // 退出循环
                code = removeChars(code,trav["start"],trav["end"])
                code = insertCharacter(code,'退出循环()',trav["start"])
                break
            }else if(isMatch(trav,rule[29])){
                // 等待直到
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'等待直到',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[30])){
                // 一步执行
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'一步执行',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[31])){
                // 移动步数
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'移动步数',trav["expression"]["callee"]["start"])
                break
            }else if(isMatch(trav,rule[32])){
                // 当放开键盘
                text = trav["expression"]["arguments"][0]['value']
                text2 = trav["expression"]["callee"]["name"]
                contrast = {
                    'Keydown':'按下',
                    'Keyup':'放开'
                }
                contrast2 = {
                    'Space':'空格键',
                    'Enter':'回车键',
                    'ArrowUp':'↑',
                    'ArrowDown':'↓',
                    'ArrowLeft':'←',
                    'ArrowRight':'→',
                    'Any':'任意键'
                }
                code = removeChars(code,trav["expression"]["arguments"][0]["start"],trav["expression"]["arguments"][0]["end"])
                code = insertCharacter(code,'"' + contrast[text2] +'","' + (text in contrast2 ? contrast2[text] : text) + '"',trav["expression"]["callee"]["end"]+1)
                code = removeChars(code,trav["expression"]["callee"]["start"],trav["expression"]["callee"]["end"])
                code = insertCharacter(code,'当键盘触发',trav["expression"]["callee"]["start"])
                break
            }else{
                trav2 += 1
            }
        }
        if(trav2 == ast.length){
            judge = false
        }
    }
    console.log(code)
} 