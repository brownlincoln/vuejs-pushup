function getDatetime() {
    var d = new Date();
    var datestring = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return datestring;
}