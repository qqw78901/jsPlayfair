/**
 * Created by King-z on 2016/10/23 0023.
 */

// 创建密码表
var position=[];
function creat(key) {/*创建密码表*/
    var a = [5];
    for (var temp = 0; temp < 5; temp++)a[temp] = [];
    /*初始化矩阵完成*/
    var words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];
    for (var num in key) {
        var x = parseInt(num / 5), y = num % 5;
        var w = key[num];
        var po = w.charCodeAt()-65;
        position[po] = x+","+y;
        var p = words.indexOf(w);
        words.splice(p, 1);
        a[x][y] = w;
    }
    /**/
    for (var num1 in words) {
        var num2 = num1 * 1 + num * 1 + 1;
        var x1 = parseInt(num2 / 5),
            y1 = num2 % 5;
        var po = words[num1].charCodeAt()-65;
        position[po] = x1+","+y1;
        a[x1][y1] = words[num1];

    }
    return a;
}

function out(arr){
    var content="";
    for(var i=0;i<5;i++){
        for(var j =0;j<5;j++){
            content+=arr[i][j]+"&nbsp;";
        }
        content+="<br/>";
    }
    return content;
}
function lock(content,arr){/*加密返回密文*/
    var cLength = content.length;
    var psw="";
    /*奇数*/
    if(cLength%2){
        content+="K";
        cLength++;
    }/*保证能配对*/
    var result="";
    for(i=0;i<cLength;i=i+2){
        /*开始替换*/
        var aArr = find(content[i]),bArr=find(content[i+1]);
        var aX,aY,bX,bY,raX,raY,rbX,rbY;
        aX=aArr[0]*1;aY=aArr[1]*1;
        bX=bArr[0]*1;bY=bArr[1]*1;
        if(aX==bX){/*行相同*/
            raY = aY==4?0:(aY+1);
            rbY = bY==4?0:(bY+1);
            result+=arr[aX][raY]+arr[bX][rbY];
        }else if(aY==bY){/*列相同*/
            raX = aX==4?0:(aX+1);
            rbX = bX==4?0:(bX+1);
            result+=arr[raX][aY]+arr[rbX][bY];
        }else{/*行列不同*/
            raY = bY;rbY=aY;
           result+=arr[aX][raY]+arr[bX][rbY];
        }
    }
    return result;
}
function find(str)  {
    /*找出在密码表的位置*/
    var code = str.charCodeAt()-65;
    var arr = position[code].split(",");
    return arr;

}

function keyValidate(str) {
    str = str.replace(/\s|"|-/g,"");//去空
    str = str.toUpperCase();//所有小写转成大写
    str = str.replace(",","");//去逗号
    var pattern = new RegExp("[`~!@#$^&*(-)=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？Z]","g");
    str = str.replace(pattern,"");//去掉特殊字符及Z
    var arr =str.split("");
    var temp;
    for (var i = 0; i < arr.length; i++)
        for (var j = i + 1; j < arr.length; j++)
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--;
                temp = arr[i].charCodeAt();
                if (90 < temp || temp < 65)
                    return "";
            }
    return arr.join("");

}
function contentValidate(str) {
    str = str.replace(/\s|"|-/g,"");//去空
    str = str.toUpperCase();//所有小写转成大写
    var pattern = new RegExp("[`~!@#$^&*(-)=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？Z]","g");
    str = str.replace(pattern,"");//去掉特殊字符及Z
    console.log(str);
    var arr =str.split("");
    var temp,temp1;
    var result=[];
    for(i=0;i<arr.length;i=i+2){
        temp = arr[i].charCodeAt();
        if(arr[i+1])
        temp1 = arr[i+1].charCodeAt();
        if (90 < temp || temp < 65||90 < temp1 || temp1 < 65)
            return "";
        if(arr[i]==arr[i+1]){
            if(arr[i]!="K")
            result.push(arr[i],"K",arr[i+1]);
            else
                result.push(arr[i],"L",arr[i+1]);
        }else{
            result.push(arr[i],arr[i+1]);
        }

    }
    return arr.join("");
}
/*开始解密*/

function unlock(content,arr){
        var cLength = content.length;
        /*奇数*/
        var result="";
        for(i=0;i<cLength;i=i+2){
            /*开始替换*/
            var aArr = find(content[i]),bArr=find(content[i+1]);
            var aX,aY,bX,bY,raX,raY,rbX,rbY;
            aX=aArr[0]*1;aY=aArr[1]*1;
            bX=bArr[0]*1;bY=bArr[1]*1;
            if(aX==bX){/*行相同*/
                raY = aY==0?4:(aY-1);
                rbY = bY==0?4:(bY-1);
                result+=arr[aX][raY]+arr[bX][rbY];
            }else if(aY==bY){/*列相同*/
                raX = aX==0?4:(aX-1);
                rbX = bX==0?4:(bX-1);
                result+=arr[raX][aY]+arr[rbX][bY];
            }else{/*行列不同*/
                raY = bY;rbY=aY;
                result+=arr[aX][raY]+arr[bX][rbY];
            }
        }
        return result;
}

$(function(){
    /*大写字母A 到Z 的值是从65 到90，小写a 是从97-122 开始的*/
    $("#on_lock").click(function(){
        var key=$("#key").val();
        key = keyValidate(key);
        var content=$("#psw").val();
        content = contentValidate(content);
        if(key.length==0)alert("密匙含有不合法字符");
        if(content.length==0)alert("明文含有不合法字符");
        var keyArr= creat(key);
        var result = lock(content,keyArr);
        $("#keyArr").html(out(keyArr));
        $("#result").html("结果："+result);
    });
    $("#un_lock").click(function(){
        var key=$("#key").val();
        key = keyValidate(key);
        var content=$("#psw").val();
        content = contentValidate(content);
        if(key.length==0){
            alert("密匙含有不合法字符");
            return;
        }
        if(content.length==0){
            alert("明文含有不合法字符");
            return;
        }
        var keyArr= creat(key);
        var result = unlock(content,keyArr);
        result = result.toLowerCase();
        $("#keyArr").html(out(keyArr));
        $("#result").html("结果："+result);
    })
});