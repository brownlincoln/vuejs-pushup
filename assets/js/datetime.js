//调用：getDatetime(2016, 12, 12)，则输出2016-12-12。
//或者getDatetime()，输出当前日期
function getDatetime(year, month, day) {
    if(arguments.length === 0) {
        var d = new Date();
        var datestring = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
        return datestring;
    } else if(arguments.length === 3) {
        var d = new Date(year, month, day);
        var datestring = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        return datestring;
    } else {
        console.log("error in getDatetime(year, month, date) method");
        return;
    }

}

function IsDateStringEqual(dateStr1, dateStr2) {
    return dateStr1.valueOf() == dateStr2.valueOf();
}