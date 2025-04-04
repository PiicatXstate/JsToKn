function interLua(lua){
    let varList = {};
    var num = 0;

    for(var code of lua){
        // CONVERT

        // 变量写法替换
        const match1 = code.match(/var\s+(\w+)/);
        const match2 = code.match(/varole\s+(\w+)/);
        const match3 = code.match(/array\s+(\w+)/);


        if (match1 || match2 || match3) {

            // 变量记录
            var matches = [match1, match2, match3];
            var index = matches.findIndex(Boolean);
            var match = matches[index];
            var matchVariable = index !== -1 ? `match${index + 1}` : null;
            const extracted = match[1];
            varList[extracted] = ['变量_' + extracted,'角色变量_' + extracted,'"列表_' + extracted + '"'][Number(matchVariable[5])-1];
            lua[num] = '';

        } else {

            // 变量替换
            function replaceVariables(code, varList) {
                for (const [key, value] of Object.entries(varList)) {
                    const regex = new RegExp(`(?<![a-zA-Z])${key}(?![a-zA-Z])`, 'g');
                    code = code.replace(regex, value);
                }
                return code;
            }
            code = replaceVariables(code,varList);

            // 替换关键函数
            convert = JSON.parse(window.localStorage.getItem("json"));
            const keys = Object.keys(convert).map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            const regex = new RegExp(`(?<!['"])(?:${keys.join('|')})(?!['"])`, 'g');

            code = code.replace(regex, (match) => {
                return convert[match];
            });

            // SAVE
            lua[num] = code;
        };
        num += 1;
    };
    return lua;
};

// var intervalId = setInterval(interLua, 1000);
// navigator.clipboard.writeText(res).then(() => {
// }).catch(err => {
//     console.error('无法粘贴文本：', err);
// });
