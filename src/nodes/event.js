export default (scale, tDuration) => {
  function create (node, d) {
    node.attr('transform', `translate(${scale(d.data.time)},0)`)
        .append('circle')
      .attr('fill', d.data.color || '#000')

    if (d.data.tick) {
      node.append('rect')
        .attr('class', 'tick')
        .attr('width', 1)
    }
  }

  function update (node, d) {
    node.transition().duration(tDuration).attr('transform', `translate(${scale(d.data.time)},0)`)
    node.select('circle')
      .attr('fill', d.data.color || '#000')

    if (d.data.tick) {
      node.select('rect')
        .attr('class', 'tick')
        .attr('width', 1)
    }
  }

  return {
    create,
    update
  }
}
