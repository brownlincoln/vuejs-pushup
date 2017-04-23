
Vue.component("practice-body", {
    template: "#practice-body-template",
    data: function() {
        return {
            pushUpsData: [
                {
                    cycleNums: [5, 10, 11, 9, 10],
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
            ]           
        };
    },
    created: function() {
        if(localStorage.pushUpsKey) {
            this.pushUps = localStorage.getItem("pushUpsKey");
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
            console.log(total);
            return total;
        },
        currentRemaining: function() {
            var tempCompleted = this.pushUpsData[0].completedNum;
            var tempCycleNums = this.pushUpsData[0].cycleNums;
            var currentSum = 0;
            var lastSum = 0;
           // console.log(currentSum);
           var length = tempCycleNums.length;
           if(this.completedNum === this.totalNum) {
                //finishPractice()
           }
           for(var index in tempCycleNums) {
               lastSum = currentSum;
               currentSum += tempCycleNums[index];
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
        initApp: function() {
            localStorage.clear();
            this.setData("originalKey", this.pushUpsData);
            this.setData("pushUpsKey", this.pushUpsData);
            console.log("initApp");
        },
        resetApp: function() {
            this.pushUpsData = localStorage.getItem("originalKey");
            this.initApp();
        },
        decrement: function(pushUp) {
            this.pushUpsData[0].completedNum += 1;
            //console.log(this.pushUpsData[0].completedNum);
        },
        finishPractice: function() {
            //homepage
        }
    }
});
var app = new Vue({
    el: "#practice-page"
});