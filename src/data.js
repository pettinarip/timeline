export const data1 = [
  {
    id: 1,
    type: 'bar',
    class: 'bar--wrapper',
    start: 1485392400000,
    end: 1485416400000,
    children: [{
      id: 1,
      type: 'event',
      time: 1485402400000,
      tick: true,
      children: []
    }, {
      id: 2,
      type: 'event',
      time: 1485406400000,
      tick: true,
      children: []
    }, {
      id: 1,
      type: 'checkpoint',
      time: 1485406400000,
      children: []
    }]
  },
  {
    id: 2,
    type: 'bar',
    class: 'bar--wrapper',
    start: 1485416400000,
    end: 1485435600000,
    children: [{
      id: 1,
      type: 'bar',
      class: 'bar--primary',
      start: 1485416400000,
      end: 1485421600000,
      children: [{
        id: 1,
        type: 'event',
        time: 1485421600000,
        children: []
      }, {
        id: 2,
        type: 'event',
        time: 1485435600000,
        children: []
      }]
    }]
  },
  {
    id: 3,
    type: 'bar',
    class: 'bar--wrapper',
    start: 1485392400000,
    end: 1485435600000,
    children: [{
      id: 1,
      type: 'checkpoint',
      time: 1485412400000,
      children: [{
        id: 1,
        type: 'event',
        time: 1485421600000,
        children: []
      }]
    }, {
      id: 2,
      type: 'event',
      time: 1485435600000,
      children: []
    }]
  }
]

export const data2 = [
  {
    id: 1,
    type: 'bar',
    class: 'bar--wrapper',
    start: 1485392400000,
    end: 1485416400000,
    children: [{
      id: 1,
      type: 'event',
      time: 1485402400000,
      tick: true,
      children: []
    }, {
      id: 2,
      type: 'event',
      time: 1485406400000,
      tick: true,
      children: []
    }]
  }
]

export const data2mod = [
  {
    id: 1,
    type: 'bar',
    class: 'bar--wrapper',
    start: 1485392400000,
    end: 1485435600000,
    children: [{
      id: 1,
      type: 'event',
      time: 1485392400000,
      tick: true,
      children: []
    }, {
      id: 2,
      type: 'event',
      time: 1485406400000,
      tick: true,
      children: []
    }, {
      id: 1,
      type: 'checkpoint',
      time: 1485412400000,
      children: []
    }, {
      id: 1,
      type: 'bar',
      class: 'bar--primary',
      start: 1485412400000,
      end: 1485415400000,
      children: []
    }]
  }
]
