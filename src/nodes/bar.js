export default (scale) => {
  function create (node, d) {
    node.append('rect')
      .attr('x', scale(d.data.start))
      .attr('width', scale(d.data.end) - scale(d.data.start))
      .attr('fill', d.data.color || 'black')
  }

  function update (node, d) {
    node.transition().select('rect')
      .attr('x', scale(d.data.start))
      .attr('width', scale(d.data.end) - scale(d.data.start))
      .attr('fill', d.data.color || 'black')
  }

  return {
    create,
    update
  }
}
