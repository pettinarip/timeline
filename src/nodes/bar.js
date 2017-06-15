export default (scale) => {
  function bar (node, d) {
    node.append('rect')
      .attr('x', scale(d.data.start))
      .attr('width', scale(d.data.end) - scale(d.data.start))
      .attr('fill', d.data.color || 'black')
  }

  return bar
}
