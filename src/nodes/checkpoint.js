export default (scale) => {
  let radius = 5

  function checkpoint (node, d) {
    node.attr('transform', `translate(${scale(d.data.time)},0)`)
    const icon = node.append('g')
      .attr('class', 'icon')
    icon.append('circle')
      .attr('r', d => d.data.radius ? d.data.radius : radius)
    // icon.append('text').text(d => d.icon)
  }

  return checkpoint
}
