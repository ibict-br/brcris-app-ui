/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react'
import { Options, Edge, Node } from 'vis-network'

import useVisNetwork from './useVisNetwork'

import useSWR from 'swr'

const nodes: Node[] = [
  {
    id: 1,
    label: 'um',
    title: '1',
    // level: 1,
    group: 'struct',
  },
  {
    id: 2,
    label: 'dois',
    title: '2',
    // level: 2,
    group: 'struct',
  },
  {
    id: 3,
    label: 'tres',
    title: '3',
    // level: 3,
    group: 'object',
  },
  {
    id: 4,
    label: 'quatro',
    title: '4',
    // level: 4,
    group: 'market',
  },
  {
    id: 5,
    label: 'cinco',
    title: '5',
    // level: 5,
    group: 'object',
  },
  {
    id: 6,
    label: 'seis',
    // level: 4,
    group: 'market',
  },
  {
    id: 7,
    label: 'sete',
    // level: 3,
    group: 'object',
  },
]

const edges: Edge[] = [
  { from: 1, to: 2, id: 1 },
  { from: 1, to: 3, id: 6 },
  { from: 2, to: 3, id: 2 },
  { from: 3, to: 5, id: 3 },
  { from: 3, to: 4, id: 4 },
  { from: 4, to: 5, id: 5 },
  { from: 3, to: 6, id: 7 },
  { from: 1, to: 7, id: 8 },
  { from: 1, to: 7, id: 10 },
  { from: 2, to: 7, id: 9 },
]

const options: Options = {
  groups: {
    // market: {
    //   shape: "triangleDown"
    // },
    // struct: {
    //   shape: "hexagon"
    // }
  },
  interaction: {
    selectable: false,
    selectConnectedEdges: false,
  },
  edges: {
    smooth: {
      enabled: true,
      type: 'diagonalCross',
      roundness: 0.5,
    },
  },
  nodes: {
    shape: 'dot',
    size: 16,
  },
  layout: {
    hierarchical: {
      enabled: true,
    },
  },
}

export default () => {
  const fetcher = (...args: Array<any>) =>
    fetch(...(args as [any])).then((res) => res.json())

  const { data } = useSWR('/api/visNetwork', fetcher)
  const articles = data
  let notas = []

  if (articles !== undefined) {
    for (let article of articles) {
      for (let institution of article._source.institutions) {
        if (institution.id !== nodes[article._source.institutions[institution]]?.id) {
          notas.push({ id: institution.id, label: institution.name })
        }
      }
    }
    //console.log('123', data[1]._source.institutions)
    console.log('123', notas)
  }
 

  const { ref, network } = useVisNetwork({
    options,
    edges,
    nodes,
  })

  const handleClick = () => {
    if (!network) return

    network.focus(5)
  }

  useEffect(() => {
    if (!network) return

    network.once('beforeDrawing', () => {
      network.focus(5)
    })
    network.setSelection({
      edges: [1, 2, 3, 4, 5],
      nodes: [1, 2, 3, 4, 5],
    })
  }, [network])

  return (
    <>
      <button onClick={handleClick}>Focus</button>
      <div style={{ height: 700, width: '100%' }} ref={ref} />
    </>
  )
}