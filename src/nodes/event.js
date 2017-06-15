import { select } from 'd3-selection'

export default (scale) => {
  function event (selection) {
    selection.each(function (datum) {
      const node = select(this)

      node.attr('transform', `translate(${scale(datum.data.time)},0)`)
          .append('circle')
        .attr('fill', datum.data.color || '#000')

      if (datum.data.tick) {
        node.append('rect')
          .attr('class', 'tick')
          .attr('width', 1)
      }
    })
  }

  return event
}
