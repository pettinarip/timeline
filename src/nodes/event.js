export default (scale) => {
  function event (node, d) {
    node.attr('transform', `translate(${scale(d.data.time)},0)`)
        .append('circle')
      .attr('fill', d.data.color || '#000')

    if (d.data.tick) {
      node.append('rect')
        .attr('class', 'tick')
        .attr('width', 1)
    }
  }

  return event
}
