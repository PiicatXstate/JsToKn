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

class CodeReplacer {
    constructor(originalCode) {
        this.code = originalCode;
    }

    // 封装字符串插入和删除操作
    insert(char, start) {
        this.code = this.code.substring(0, start) + char + this.code.substring(start);
        return this;
    }

    remove(start, end) {
        end --;
        start = Math.max(0, start);
        end = Math.min(end, this.code.length - 1);
        if (start > end) [start, end] = [end, start];
        this.code = this.code.slice(0, start) + this.code.slice(end + 1);
        return this;
    }

    getCode() {
        return this.code;
    }
}

function ConvKernel(code){
    const replacer = new CodeReplacer(code);
    let judge = true;
    let trav,trav2,text,text2,contrast,contrast2;
    let ast = acorn.parse(code, {
        ecmaVersion: 2022,
        locations: false
    });
    code = astring.generate(ast).split("\n").join("");
    while(judge){
        code = replacer.getCode();
        ast = acorn.parse(code,{
            ecmaVersion: 2022,
            locations: false
        });
        ast = collectTypeObjects(ast)
        trav2 = 0
        for(trav of ast){
            if(isMatch(trav,rule[0])){
                const { start, end } = trav.expression.callee;
                replacer.remove(start, end).insert('当开始运行', start);
                break;
            }else if(isMatch(trav,rule[1])){
                const { start, end } = trav.expression.callee;
                replacer.remove(start, end).insert('打印', start);
                break;
            }else if(isMatch(trav,rule[2])){
                const { start, end } = trav.expression.callee;
                replacer.remove(start, end).insert('等待秒数', start);
                break;
            }else if(isMatch(trav,rule[3])){
                text = code.substring(trav.expression.callee.start,trav.expression.callee.property.start-1);
                replacer.insert('"点击",' + text + ',', trav.expression.callee.end+1)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当触发事件', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[4])){
                text = code.substring(trav.expression.callee.start,trav.expression.callee.property.start-1);
                replacer.insert('"按下",' + text + ',', trav.expression.callee.end+1)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当触发事件', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[5])){
                text = code.substring(trav.expression.callee.start,trav.expression.callee.property.start-1);
                replacer.insert('"放开",' + text + ',', trav.expression.callee.end+1)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当触发事件', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[6])){
                replacer.insert('"向上",', trav.expression.arguments[0].start)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当滑动屏幕', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[7])){
                replacer.insert('"向下",', trav.expression.arguments[0].start)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当滑动屏幕', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[8])){
                replacer.insert('"向左",', trav.expression.arguments[0].start)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当滑动屏幕', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[9])){
                replacer.insert('"向右",', trav.expression.arguments[0].start)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当滑动屏幕', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[10]) || isMatch(trav,rule[32])){
                text = trav.expression.arguments[0].value;
                text2 = trav.expression.callee.name;
                contrast = {'Keydown':'按下','Keyup':'放开'};
                contrast2 = {
                    'Space':'空格键','Enter':'回车键','ArrowUp':'↑',
                    'ArrowDown':'↓','ArrowLeft':'←','ArrowRight':'→','Any':'任意键'
                };
                replacer.remove(trav.expression.arguments[0].start, trav.expression.arguments[0].end)
                      .insert('"' + contrast[text2] +'","' + (text in contrast2 ? contrast2[text] : text) + '"', trav.expression.callee.end+1)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当键盘触发', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[11])){
                contrast = {'start':'开始','keep':'持续','end':'结束'};
                text2 = trav.expression.arguments[0].value;
                text = code.substring(trav.expression.callee.start,trav.expression.callee.property.start-1);
                replacer.remove(trav.expression.arguments[0].start, trav.expression.arguments[0].end)
                      .insert('"' + contrast[text2] +'",' + text, trav.expression.callee.end+1)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当碰撞发生', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[12])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当条件满足时触发', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[13])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当收到广播带参数', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[14])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当收到广播', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[15])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('发送广播带参数', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[16])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('发送广播', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[17])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('发送广播并等待', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[18])){
                replacer.remove(trav.start, trav.end)
                      .insert('判断是否收到广播', trav.start);
                break;
            }else if(isMatch(trav,rule[19])){
                replacer.remove(trav.start, trav.end)
                      .insert('内容', trav.start);
                break;
            }else if(isMatch(trav,rule[20])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('切换到屏幕', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[21])){
                contrast = ["全部脚本","当前脚本","当前角色的其它脚本","其它角色的脚本"];
                text = trav.expression.arguments[0].value;
                replacer.remove(trav.expression.arguments[0].start, trav.expression.arguments[0].end)
                      .insert('"' + contrast[text] + '"', trav.expression.callee.end+1)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('停止脚本', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[22])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('重启', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[23])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('当克隆体启动', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[24])){
                text = code.substring(trav.expression.callee.start,trav.expression.callee.property.start-1);
                replacer.insert(text, trav.expression.callee.end+1)
                      .remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('克隆', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[25])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('删除本克隆体', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[26])){
                replacer.remove(trav.start, trav.end)
                      .insert('克隆体编号()', trav.start);
                break;
            }else if(isMatch(trav,rule[27])){
                text = code.substring(trav.object.object.start,trav.object.object.end);
                replacer.remove(trav.start, trav.end+2)
                      .insert('克隆体总数(' + text +')', trav.start);
                break;
            }else if(isMatch(trav,rule[28])){
                replacer.remove(trav.start, trav.end)
                      .insert('退出循环()', trav.start);
                break;
            }else if(isMatch(trav,rule[29])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('等待直到', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[30])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('一步执行', trav.expression.callee.start);
                break;
            }else if(isMatch(trav,rule[31])){
                replacer.remove(trav.expression.callee.start, trav.expression.callee.end)
                      .insert('移动步数', trav.expression.callee.start);
                break;
            }else{
                trav2 += 1;
            }
        }
        if(trav2 == ast.length){
            judge = false;
        }
    }
    console.log(code);
}