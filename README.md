# Timeline
Visualization made using D3 hierarchy. Each node can be a `bar`, `event` or `checkpoint` type.

## Installation
```sh
$ yarn
$ yarn dev
```

## Example
```javascript
import createTimeline from 'timeline'

const data = {
    // Root node, a wrapping bar
    id: 1,
    type: 'bar', // Node type
    start: 1485392400,
    end: 1485435600,
    roundedCorners: true,
    children: [{
        // Child nodes
        id: 1,
        type: 'event',
        time: 1485402400,
        children: []
    }]
}

const root = document.getElementById('root')
const timeline = createTimeline(root, {
    height: 100,
    margin: [10, 20],
    domain: [1485392400, 1485435600]
})
timeline.draw(data)
```

### Prod bundle (~31kb gzipped)
```sh
$ yarn run build
```

## TODO

* Tests
* Highlight types (branch, children, parents)
* Dont hide highlight when the hover moves to a node child
