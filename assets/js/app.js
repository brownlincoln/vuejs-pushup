
var component1 = Vue.component("practice-body", {
    template: "#practice-body-template",
    data: function () {
        return {
            pushUpsData: [
                {
                    cycleNums: [2, 1, 3, 4, 2],
                    completedNum: 0,
                    startTime: Date.now(),
                    endTime: Date.now()
                },
                {
                    cycleNums: [10, 10, 11, 9, 10],
                    completedNum: 0,
                    startTime: Date.now(),
                    endTime: Date.now()
                }
            ],
            dataHistory: [
                {
                    "datetime": getDatetime(),
                    "record": 123
                }
            ],
            isTrainTime: true,
            cycleCounter: 1
        };
    },
    created: function () {
        if (localStorage.pushUpsKey) {
            this.pushUps = localStorage.getItem("pushUpsKey");
            //this.dataHistory = localStorage.getItem("dataHistoryKey");
        } else {
            this.initApp();
        }
    },
    mounted: function () {

    },
    computed: {
        totalNum: function () {
            var total = 0;
            var cycles = this.pushUpsData[0].cycleNums;
            //console.log(cycles);
            for (var index in cycles) {
                //console.log(num);
                total = total + cycles[index];
            }
            // console.log(total);
            return total;
        },
        currentRemaining: function () {
            var tempCompleted = this.pushUpsData[0].completedNum;
            var tempCycleNums = this.pushUpsData[0].cycleNums;
            var currentSum = 0;
            var lastSum = 0;
            // console.log(currentSum);
            var length = tempCycleNums.length;
            if (tempCompleted === this.totalNum) {
                //finishPractice() 
                updateRecordAndHistory(tempCompleted);

            }
            for (var index in tempCycleNums) {
                lastSum = currentSum;
                currentSum += tempCycleNums[index];
                if (tempCompleted === currentSum) {
                    this.isTrainTime = false;
                    this.cycleCounter++;
                }
                //console.log(tempCompleted);
                if (tempCompleted === this.totalNum) {
                    //this.setData();                   
                    window.location.href = "stats.html";
                }
                if (tempCompleted >= lastSum && tempCompleted < currentSum) {
                    return currentSum - tempCompleted;
                }
            }
        }
    },
    methods: {
        setData: function (key, data) {
            var pushUpsDataString = JSON.stringify(data);
            localStorage.setItem(key, pushUpsDataString);
        },
        getData: function (key) {
            var pushUpsDataString = localStorage.getItem(key);
            return JSON.parse(pushUpsDataString);
        },
        setDataHistory: function (key, data) {
            var dataHistoryString = JSON.stringify(data);
            localStorage.setItem(key, dataHistoryString);
        },
        getDataHistory: function (key) {
            var dataHistoryString = localStorage.getItem(key);
            return JSON.parse(dataHistoryString);
        },
        initApp: function () {
            localStorage.clear();
            this.setData("originalKey", this.pushUpsData);
            this.setData("pushUpsKey", this.pushUpsData);
            this.setDataHistory("dataHistoryKey", [
                {
                    "datetime": getDatetime(1971, 1, 1),
                    "record": 0
                }
            ]);
            localStorage.setItem("bestRecordKey", 0);
            localStorage.setItem("daysKey", 0);
            localStorage.setItem("totalRecordKey", 0);
            console.log("initApp");
            
        },
        resetApp: function () {
            // this.pushUpsData = localStorage.getItem("originalKey");
            this.initApp();
        },
        decrement: function () {
            this.pushUpsData[0].completedNum += 1;
            // console.log(getDatetime());
            //console.log(this.pushUpsData[0].completedNum);
        },
        clearData: function () {
            this.initApp();
            window.location.href = "homepage.html";
        },
        returnTrain: function () {
            this.isTrainTime = true;
        }
    }
});
var app = new Vue({
    el: "#practice-page",
    data: {
        bestRecord: localStorage.getItem("bestRecordKey"),
        totalRecord: localStorage.getItem("totalRecordKey"),
        days: localStorage.getItem("daysKey")
    }

});

var app2 = new Vue({
    el: "#menu-bar",
    data: {
    },
    methods: {
        redirectToPractice: function () {
            console.log("redirect to practice");
            window.location.href = "main.html";
        },
        redirectToStats: function () {
            console.log("redirect to stats");
            window.location.href = "stats.html";
        },
        redirectToFreePractice: function () {
            console.log("redirect to free practice");
            window.location.href = "free-practice.html";
        },
        clearData: function() {
            var pushUpsData = localStorage.getItem("originalKey");
            localStorage.clear();
            localStorage.setItem("originalKey", JSON.stringify(pushUpsData));
            localStorage.setItem("pushUpsKey", JSON.stringify(pushUpsData));
            localStorage.setItem("dataHistoryKey", JSON.stringify([
                {
                    "datetime": getDatetime(1971, 1, 1),
                    "record": 0
                }
            ]));
            localStorage.setItem("bestRecordKey", 0);
            localStorage.setItem("daysKey", 0);
            localStorage.setItem("totalRecordKey", 0);
             
             window.location.href = "homepage.html";
        }
    }
});

var app3 = new Vue({
    el: "#menu-in-practice",
    data: {
    },
    methods: {
        redirectToHome: function () {
            //将自由训练的数据存起来
            var counterEle = document.getElementById("counter-id");
            if (counterEle) {
                //alert("store free practice data");
                var counterData = parseInt(counterEle.textContent);
                // localStorage.setItem("freeCounterKey", counterData);
                updateRecordAndHistory(counterData);
            }
            console.log("redirect to home");
            window.location.href = "homepage.html";
        }
    }
});

var app3 = new Vue({
    el: "#stats-id",
    data: {
        "dataHistory": JSON.parse(localStorage.getItem("dataHistoryKey"))
    }
});

var app4 = new Vue({
    el: "#free-id",
    data: {
        "datetime": getDatetime(),
        "counter": 0
    },
    methods: {
        increment: function () {
            return ++this.counter;
        }
    }
});

function updateRecordAndHistory(tempCompleted) {
    //更新记录，天数和总数
    var bestRecord = localStorage.getItem("bestRecordKey");
    var days = localStorage.getItem("daysKey");
    var totalRecord = localStorage.getItem("totalRecordKey");
    totalRecord = parseInt(totalRecord) + tempCompleted;
    localStorage.setItem("totalRecordKey", totalRecord);

    //关于天数，首先需要看今天是否已经做过。如果是，则天数不增加；否则天数加一。

    //获取最新的记录
    var tempDataHistory = JSON.parse(localStorage.getItem("dataHistoryKey"));
    var lastDate = tempDataHistory[0].datetime;
    //console.log(tempDataHistory[0] + " " + lastDate);
    // var nowDate = getDatetime(2017, 5, 30);
    var nowDate = getDatetime();
    //alert(nowDate);
    var isEqual = IsDateStringEqual(lastDate, nowDate);
    if (isEqual) {
        tempDataHistory[0].record = parseInt(tempDataHistory[0].record) + tempCompleted;

        //是否超过目前最优记录
        if (tempDataHistory[0].record > bestRecord) {
            localStorage.setItem("bestRecordKey", tempDataHistory[0].record);
        }
    } else {
        var todayRecord = {
            "datetime": nowDate,
            "record": tempCompleted
        };
        tempDataHistory.splice(0, 0, todayRecord);
        days++;
        if (tempCompleted > bestRecord) {
            localStorage.setItem("bestRecordKey", tempCompleted);
        }
    }
    localStorage.setItem("dataHistoryKey", JSON.stringify(tempDataHistory));
    //alert("hello");
    localStorage.setItem("daysKey", days);
}