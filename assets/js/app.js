
Vue.component("practice-body", {
    template: "#practice-body-template",
    data: function() {
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
    created: function() {
        if(localStorage.pushUpsKey) {
            this.pushUps = localStorage.getItem("pushUpsKey");
            //this.dataHistory = localStorage.getItem("dataHistoryKey");
        } else {
            this.initApp();
        }
    },
    mounted: function() {

    },
    computed:  {
        totalNum: function() {
            var total = 0;
            var cycles = this.pushUpsData[0].cycleNums;
            //console.log(cycles);
            for(var index in cycles) {
                //console.log(num);
                total = total + cycles[index];
            }
            // console.log(total);
            return total;
        },
        currentRemaining: function() {
            var tempCompleted = this.pushUpsData[0].completedNum;
            var tempCycleNums = this.pushUpsData[0].cycleNums;
            var currentSum = 0;
            var lastSum = 0;
           // console.log(currentSum);
           var length = tempCycleNums.length;
           if(tempCompleted === this.totalNum) {
                //finishPractice()  
                
                var tempDataHistory = this.getDataHistory("dataHistoryKey");
                var todayRecord = {
                    "datetime": getDatetime(),
                    "record": tempCompleted
                };
                tempDataHistory.splice(0, 0, todayRecord);
                this.setDataHistory("dataHistoryKey", tempDataHistory);
                alert("hello");
           }
           for(var index in tempCycleNums) {
               lastSum = currentSum;
               currentSum += tempCycleNums[index];
               if(tempCompleted === currentSum) {
                   this.isTrainTime = false;
                   this.cycleCounter++;
               }
               //console.log(tempCompleted);
               if(tempCompleted === this.totalNum) {
                   //this.setData();                   
                   window.location.href = "homepage.html";
               }
               if(tempCompleted >= lastSum && tempCompleted < currentSum) {
                   return currentSum - tempCompleted;
               }
           }   
        }
    },
    methods: {
        setData: function(key, data) {
            var pushUpsDataString = JSON.stringify(data);
            localStorage.setItem(key, pushUpsDataString);
        },
        getData: function(key) {
            var pushUpsDataString = localStorage.getItem(key);
            return JSON.parse(pushUpsDataString);
        },
        setDataHistory: function(key, data) {
            var dataHistoryString = JSON.stringify(data);
            localStorage.setItem(key, dataHistoryString);
        },
        getDataHistory: function(key) {
            var dataHistoryString = localStorage.getItem(key);
            return JSON.parse(dataHistoryString);
        },
        initApp: function() {
            localStorage.clear();
            this.setData("originalKey", this.pushUpsData);
            this.setData("pushUpsKey", this.pushUpsData);
            this.setDataHistory("dataHistoryKey", [
                {
                    "datetime": getDatetime(),
                    "record": 0
                }
            ]);
            console.log("initApp");
        },
        resetApp: function() {
            this.pushUpsData = localStorage.getItem("originalKey");
            this.initApp();
        },
        decrement: function() {
            this.pushUpsData[0].completedNum += 1;
            // console.log(getDatetime());
            //console.log(this.pushUpsData[0].completedNum);
        },
        finishPractice: function() {
            //homepage
        },
        returnTrain: function() {
            this.isTrainTime = true;
        }
    }
});
var app = new Vue({
    el: "#practice-page",
    data: {
        bestRecord: 150,
        totalRecord: 10000,
        days: 110
    }
   
});

var app2 = new Vue({
    el: "#menu-bar",
    data: {
    },
    methods: {
        redirectToPractice: function() {
            console.log("redirect to practice");
            window.location.href = "main.html";
        }
    }
});

var app3 = new Vue({
    el: "#menu-in-practice",
    data: {
    },
    methods: {
        redirectToHome: function() {
            console.log("redirect to home");
            window.location.href = "homepage.html";
        }
    }
});
