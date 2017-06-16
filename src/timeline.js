import * as d3Selection from 'd3-selection'
import { scaleTime } from 'd3-scale'
import { hierarchy } from 'd3-hierarchy'
import * as d3Dispatch from 'd3-dispatch'
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
  let dataNodes
  let dataLines
  let scale
  let svg
  let domain
  let transitionDuration = 300

  const dispatcher = d3Dispatch.dispatch('mouseOver', 'mouseOut', 'click')

  const nodeTypes = {
    bar,
    event,
    checkpoint
  }
  let nodeCreators = {}

  function timeline (_selection) {
    _selection.each(function (d) {
      dataNodes = d

      chartWidth = width - margin.left - margin.right

      buildScales()
      initNodesConfig()
      buildLayout()
      buildSVG(this)
      drawLines()
    })
  }

  function buildScales () {
    scale = scaleTime()
      .rangeRound([0, chartWidth])
      .domain(domain || [dataNodes.start, dataNodes.end])
  }

  function initNodesConfig () {
    Object.keys(nodeTypes).map(key => {
      nodeCreators[key] = nodeTypes[key](scale, transitionDuration)
    })
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

    const linesEnter = lines.enter().append('g').attr('class', 'line')

    lines.merge(linesEnter)
      .attr('transform', (d, i) => `translate(0,${lineHeightGap * i})`)

    lines.exit().remove()

    const nodes = lines.merge(linesEnter).selectAll('.node')
      .data(d => d, (d, i) => `${d.depth}/${d.data.id}/${d.data.type}`)

    drawNodes(nodes)
  }

  function drawNodes (nodes) {
    const nodesEnter = nodes.enter().append('g')

    nodesEnter.attr('class', d => d.data.class
    ? `node ${d.classed} ${d.data.class}`
    : `node ${d.classed}`)
    .each(function (d, i) {
      const node = d3Selection.select(this)
      nodeCreators[d.data.type].create(node, d)
      addMouseEvents(node)
    })

    nodes.each(function (d, i) {
      const node = d3Selection.select(this)
      nodeCreators[d.data.type].update(node, d)
    })

    nodes.exit().remove()
  }

  function addMouseEvents (node) {
    node
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('click', handleClick)
  }

  function handleMouseOver (node) {
    dispatcher.call('mouseOver', this, node, d3Selection.event)
  }

  function handleMouseOut (node) {
    dispatcher.call('mouseOut', this, node, d3Selection.event)
  }

  function handleClick (node) {
    dispatcher.call('click', this, node, d3Selection.event)
  }

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

  timeline.transitionDuration = function (_x) {
    if (!arguments.length) {
      return transitionDuration
    }
    transitionDuration = _x

    return this
  }

  timeline.on = function (_x) {
    const value = dispatcher.on.apply(dispatcher, arguments)

    return value === dispatcher ? timeline : value
  }

  return timeline
}
