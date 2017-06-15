import { select } from 'd3-selection'
import timeline from './timeline'
import { data1, data2, data2mod } from './data'

// EXAMPLE 1
const timelineChart1 = timeline()
  .margin({ top: 0, bottom: 0, left: 10, right: 10 })
  .width(1200)
  .height(150)
  .domain([1485392400, 1485435600])

select('#example1 .chart')
  .datum(data1)
  .call(timelineChart1)

// EXAMPLE 2
const timelineChart2 = timeline()
  .margin({ top: 0, bottom: 0, left: 10, right: 10 })
  .width(1200)
  .height(50)
  .domain([1485392400, 1485435600])

function example2 (data) {
  select('#example2 .chart')
    .datum(data)
    .call(timelineChart2)
}

example2(data2)

const updateButton = document.getElementById('update-data')
let toggleFlag = false
updateButton.addEventListener('click', (e) => {
  e.preventDefault()
  example2(toggleFlag ? data2 : data2mod)
  toggleFlag = !toggleFlag
})
