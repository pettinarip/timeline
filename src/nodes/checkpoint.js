export default (scale, tDuration) => {
  let radius = 5

  function create (node, d) {
    node.attr('transform', `translate(${scale(d.data.time)},0)`)
    const icon = node.append('g')
      .attr('class', 'icon')
    icon.append('circle')
      .attr('r', d => d.data.radius ? d.data.radius : radius)
    // icon.append('text').text(d => d.icon)
  }

  function update (node, d) {
    node.transition().duration(tDuration).attr('transform', `translate(${scale(d.data.time)},0)`)
    node.select('circle')
      .attr('r', d => d.data.radius ? d.data.radius : radius)
    // icon.append('text').text(d => d.icon)
  }

  return {
    create,
    update
  }
}
