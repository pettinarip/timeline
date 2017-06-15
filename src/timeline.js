import * as d3Selection from 'd3-selection'
import * as d3Array from 'd3-array'
import { scaleTime } from 'd3-scale'
import { hierarchy } from 'd3-hierarchy'
import { dispatch } from 'd3-dispatch'
import 'd3-transition'

import bar from './nodes/bar'
import event from './nodes/event'
import checkpoint from './nodes/checkpoint'

export default () => {
  let margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
  let width = 1200
  let height = 100
  let lineHeightGap = 50
  let chartWidth
  let transitionTime = 750
  let showTreeClasses = true
  let dataNodes
  let dataLines
  let scale
  let svg
  let domain
  let dispatcher = dispatch('timelineClick', 'timelineMouseOver', 'timelineMouseOut')

  function timeline (_selection) {
    _selection.each(function (d) {
      dataNodes = d

      chartWidth = width - margin.left - margin.right

      buildScales()
      initNodes()
      buildLayout()
      buildSVG(this)
      drawLines()

      // addMouseEvents()
    })
  }

  function buildScales () {
    scale = scaleTime()
      .rangeRound([0, chartWidth])
      .domain(domain || [dataNodes.start, dataNodes.end])
  }

  function initNodes () {
    //
  }

  function buildLayout () {
    dataLines = dataNodes.map(nodes => {
      const root = hierarchy(nodes)
      root.each(node => {
        node.classed = `${node.data.type}`
      })
      return root.descendants()
    })
  }

  function buildSVG (container) {
    if (!svg) {
      svg = d3Selection.select(container)
        .append('svg')
          .attr('class', 'timeline')
      svg.append('g')
        .attr('class', 'chart-group')
        .attr('transform', `translate(${margin.left},${margin.top})`)
    }

    svg.attr('width', width)
      .attr('height', height)
  }

  function drawLines () {
    const lines = svg.select('.chart-group').selectAll('.line')
      .data(dataLines)

    lines.enter().append('g')
      .attr('class', 'line')
      .attr('transform', (d, i) => `translate(0,${lineHeightGap * i})`)
        .call(redrawNodes)

    lines.exit().remove()
  }

  function redrawNodes (line) {
    line.each(function (data, i) {
      const { bar, event, checkpoint } = data.reduce((result, node) => {
        return {
          ...result,
          [node.data.type]: result[node.data.type].concat(node)
        }
      }, {
        bar: [],
        event: [],
        checkpoint: []
      })

      redrawBarNodes(this, bar)
      redrawEventNodes(this, event)
      redrawCheckpointNodes(this, checkpoint)
    })
  }

  function redrawBarNodes (container, data) {
    const barNode = bar(scale)

    const nodes = d3Selection.select(container)
      .selectAll('.bar')
        .data(data, d => d.data.id)

    nodes.enter().append('g')
      .attr('class', d => `node ${d.classed}`)
        .call(barNode)

    nodes.exit().remove()
  }

  function redrawEventNodes (container, data) {
    const eventNode = event(scale)

    const nodes = d3Selection.select(container)
      .selectAll('.event')
        .data(data, d => d.data.id)

    nodes.enter().append('g')
      .attr('class', d => `node ${d.classed}`)
        .call(eventNode)

    nodes.exit().remove()
  }

  function redrawCheckpointNodes (container, data) {
    //
  }

  // function addMouseEvents (node) {
  //   node.on('click', handleClick)
  //   node.on('mouseover', handleMouseOver)
  //   node.on('mouseout', handleMouseOut)
  // }
  //
  // function handleClick (d) {
  //   dispatcher.call('timelineClick', this, d3Selection.event, d)
  // }

  // function handleMouseOver (d) {
  //   const node = this
  //   dispatcher.call('timelineMouseOver', this, d3Selection.event, d)
  //   if (d.data.highlight) {
  //     toggleDisplayed(that.root, false)
  //     toggleDisplayed(node, true)
  //     toggleHighlight(node, true)
  //     that.update()
  //   }
  // }
  //
  // function handleMouseOut (d) {
  //   dispatcher.call('timelineMouseOut', this, d3Selection.event, d)
  //   if (d.data.highlight) {
  //     toggleDisplayed(that.root, true)
  //     toggleHighlight(d, false)
  //     that.update()
  //   }
  // }
  //
  // function toggleDisplayed (root, displayed = true) {
  //   root.displayed = displayed
  //   const nodes = root.descendants()
  //   nodes.forEach(child => { child.displayed = displayed })
  // }
  //
  // function toggleHighlight (root, highlight = true) {
  //   root.highlight = highlight
  //   const nodes = root.descendants()
  //   nodes.forEach(child => { child.highlight = highlight })
  // }
  //
  // // Check if any node has roundedCorners activated. If it does, then it
  // // prepend a new node that is going to be the <clipPath> node
  // function fixRoundedCornersNodes (node) {
  //   if (node.roundedCorners) {
  //     return node.children && node.children.length
  //       ? { ...node, children: [{ ...node, roundedCorners: false, children: node.children.map(fixRoundedCornersNodes) }] }
  //       : { ...node, children: [{ ...node, roundedCorners: false }] }
  //   } else {
  //     return node.children && node.children.length
  //       ? { ...node, children: node.children.map(fixRoundedCornersNodes) }
  //       : node
  //   }
  // }

  timeline.margin = function (_x) {
    if (!arguments.length) {
      return margin
    }
    margin = _x

    return this
  }

  timeline.width = function (_x) {
    if (!arguments.length) {
      return width
    }
    width = _x

    return this
  }

  timeline.height = function (_x) {
    if (!arguments.length) {
      return height
    }
    height = _x

    return this
  }

  timeline.domain = function (_x) {
    if (!arguments.length) {
      return domain
    }
    domain = _x

    return this
  }

  timeline.lineHeightGap = function (_x) {
    if (!arguments.length) {
      return lineHeightGap
    }
    lineHeightGap = _x

    return this
  }

  return timeline
}
