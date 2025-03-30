// 判断是否在引号包围范围内
function isCharInQuotes(str, n) {
    if (n < 0 || n >= str.length) {
        return false;
    };
    const regex = /('[^']*'|"[^"]*")/g;
    let match;
    let positions = [];
    while ((match = regex.exec(str)) !== null) {
        const start = match.index;
        const end = regex.lastIndex - 1;
        positions.push([start, end]);
    };
    for (let i = 0; i < positions.length; i++) {
        const [start, end] = positions[i];
        if (n >= start && n <= end) {
            return true;
        }
    };
    return false;
};

function isSymbol(char) {
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]+/;
    return symbolRegex.test(char);
}

// 括号包围范围和参数分析 
function structAnalys(content){
    let frequency = 1;
    let eliminated = [];
    let record = {};
    let script;

    for(sequence in content){
        script = content[sequence];
        if(script === "(" && isCharInQuotes(content,sequence) != true){
            record[frequency] = {
                'start':sequence,
                'end':null,
                'paramHis':sequence,
                'param':[]
            };
            eliminated.unshift(frequency);
            frequency += 1;
        };
        if(script === ")" && isCharInQuotes(content,sequence) != true){
            record[eliminated[0]]['end'] = sequence;
            record[eliminated[0]]['param'].push(content.slice(Number(record[eliminated[0]]['paramHis']) + 1,sequence));
            eliminated.splice(0,1);
        };
        if(script == ',' && isCharInQuotes(content,sequence) != true){
            record[eliminated[0]]['param'].push(content.slice(Number(record[eliminated[0]]['paramHis']) + 1,sequence));
            record[eliminated[0]]['paramHis'] = sequence;
        };
    };
    return record;
};




// 规则
function codeReplace(text,match_rule,replace_rule){

    let param,trav,distance,point,result2;
    let correspond = {};

    // 剔除匹配
    let match = match_rule.replace(/\#{[^}]*}/g, '');
    let analys = structAnalys(match)['1']
    match = match.substring(0,analys['start']) + match.substring(analys['end'],match.length-1);
    let num = text.search(match);


    if(num !== -1){

        // 括号内参数提取
        num += match.length;
        let analys2 = structAnalys(text);
        for(key in analys2){
            if(analys2[key]['start'] == num){
                param = analys2[key]['param'];
                break;
            };
        };

        // 括号内参数对应
        let analys3 = structAnalys(match_rule)['1']['param'];
        trav = 0;
        for(let value of analys3){
            value = value.replace(/\s*/g, "");
            if(value.substring(0,2) == '#{' && value.substring(value.length-1) == '}'){
                // value.substring(2,value.length-1)
                correspond[value] = param[trav];
            };
            trav += 1;
        };

        // 括号外参数提取
        let analys4 = structAnalys(match_rule)['1']
        let cleardata = match_rule.substring(0,analys4['start']) + match_rule.substring(analys4['end'],match_rule.length-1);

        const regex = /#\{[^{}]*\}/g;
        const matches = cleardata.match(regex);
        if (matches) {
            matches.forEach((match2, index) => {
                let num2 = cleardata.search(match2)
                let num3 = cleardata.search(match)
                if(num2 > num3){
                    // distances.push(num2 - num3);
                }else{
                    distance = num2 + match2.length - num3 - 1
                    point =  Number(num) - Number(match.length) + Number(distance);
                    result2 = '';
                    while(point >= 0){
                        if(!isSymbol(text[point])){
                            result2 = text[point] + result2
                        }else{
                            break
                        }
                        point -= 1
                    }
                    correspond[match2] = result2;
                };
            });
        };
        return correspond

    }else{
        return text;
    }
}

function convkernel(code){
    for(codeline of code){
        // 功能函数
    }
}

