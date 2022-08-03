/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

//////////////////////////////////////////////////////////////////////////////////
const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arrOfarr) => {
    return arrOfarr.map((arr) => {
        return createEmployeeRecord(arr)
    })
}

// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
// ]

// console.log(createEmployeeRecords(twoRows))  

// const createTimeInEvent = (date) => {
//     let timeinObj = {
//         type: "TimeIn",
//         hour: parseInt(date.split(" ")[1]),
//         date: date.split(" ")[0],
//     }
//     console.log(this)
//     return this.push(timeinObj)
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//NOTE: Arrow functions will are lexically scoped and while always strictly inherit the context of the parent
function createTimeInEvent(date) {
    let timeObj = {
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0],
    }
    this.timeInEvents.push(timeObj)
    return this
}

// let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// console.log(bpRecord)
// let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")
// console.log(updatedBpRecord)
// let newEvent = updatedBpRecord.timeInEvents[0]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createTimeOutEvent(date) {
    let timeObj = {
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0],
    }
    this.timeOutEvents.push(timeObj)
    return this
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hoursWorkedOnDate(date) {
    console.log(this)
    let inObj = this.timeInEvents.filter((e) => {
        return e.date === date
    })
    let outObj = this.timeOutEvents.filter((e) => {
        return e.date === date
    })
    return (outObj[0].hour - inObj[0].hour) / 100
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// createTimeInEvent.call(cRecord, "2044-03-15 0900")
// createTimeOutEvent.call(cRecord, "2044-03-15 1100")
// console.log(hoursWorkedOnDate.call(cRecord, "2044-03-15"))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// createTimeInEvent.call(cRecord, "2044-03-15 0900")
// createTimeOutEvent.call(cRecord, "2044-03-15 1100")
// console.log(wagesEarnedOnDate.call(cRecord, "2044-03-15"))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function findEmployeeByFirstName(collection, firstNameString) {
    let filterName = collection.filter((obj) => {
        return obj.firstName === firstNameString
    })
    return filterName[0]
}

// let src = [
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150]
// ]
// let emps = createEmployeeRecords(src)
// let loki = findEmployeeByFirstName(emps, "Loki")
// console.log(loki)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calculatePayroll(empRecords) {
    let arrWages = empRecords.map((obj)=>{
        return allWagesFor.call(obj)
    })
    let total = arrWages.reduce((prev, curr) => prev + curr)
    return total
}
