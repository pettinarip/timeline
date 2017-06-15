import { select } from 'd3-selection'
import timeline from './timeline'
import { data1, data2 } from './data'

// const onElementClick = (event, ele, d) => console.log('click', event, ele, d)
// const onElementMouseover = (event, ele, d) => console.log('mouseover', event, ele, d)
// const onElementMouseout = (event, ele, d) => console.log('mouseout', event, ele, d)

// EXAMPLE 1
const timelineChart1 = timeline()
  .margin({ top: 0, bottom: 0, left: 10, right: 10 })
  .width(1200)
  .height(50)
  .domain([1485392400, 1485435600])

select('#example1 .chart')
  .datum(data1)
  .call(timelineChart1)

// EXAMPLE 2
function example2 (data) {
  const timelineChart2 = timeline()
    .margin({ top: 0, bottom: 0, left: 10, right: 10 })
    .width(1200)
    .height(50)
    .domain([1485392400, 1485435600])

  select('#example2 .chart')
    .datum(data)
    .call(timelineChart2)
}

example2(data2)

const updateButton = document.getElementById('update-data')
const data2mod = [data1[1]]
let toggleFlag = false
updateButton.addEventListener('click', (e) => {
  e.preventDefault()
  select('#example2 .timeline').remove()
  example2(toggleFlag ? data2 : data2mod)
  toggleFlag = !toggleFlag
})
