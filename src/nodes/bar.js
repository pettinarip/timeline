export default (scale) => {
  function bar (selection) {
    const classes = selection.attr('class')
    selection
      .attr('class', d => d.data.class ? `${classes} ${d.data.class}` : null)
      .append('rect')
        .attr('x', d => scale(d.data.start))
        .attr('width', d => scale(d.data.end) - scale(d.data.start))
        .attr('fill', d => d.data.color || 'black')
  }

  return bar
}
