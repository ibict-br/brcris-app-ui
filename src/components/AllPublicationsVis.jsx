/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const Graph = dynamic(import('react-graph-vis'), { ssr: false })
import 'vis-network/styles/vis-network.css'
// import { Edge, Node, Options } from 'vis-network'

// Exemplo https://codesandbox.io/s/vis-test-fhir-test-2-forked-0m1l1x?file=/src/index.js:1774-1820
const nodes = [
  {
    id: 1,
    label: 'Publicações',
    title: '40.565 publicações',
    level: 1,
    shape: 'circle',
    color: '#F7964D',
    font: {
      color: '#ffffff',
    },
  },
  {
    id: 2,
    label: 'Pessoas',
    title: '10.00 pessoas',
    level: 2,
    shape: 'circle',
    color: '#CB6CE6',
    font: {
      color: '#ffffff',
    },
  },
  {
    id: 3,
    label: 'Instituições',
    title: '140 instituições',
    level: 3,
    shape: 'circle',
    color: '#00dafc',
  },
  {
    id: 4,
    label: 'Revistas',
    title: '253 revistas',
    level: 4,
    shape: 'circle',
    color: '#FF5757',
    font: {
      color: '#ffffff',
    },
  },
  {
    id: 5,
    label: 'Autores',
    title: '3000 autores',
    level: 5,
    shape: 'circle',
    color: '#FFDE59',
  },
  {
    id: 6,
    label: 'Fundações',
    title: '5 fundações',
    level: 6,
    shape: 'circle',
    color: '#4152B3',
    font: {
      color: '#ffffff',
    },
  },
]
const edges = [
  { from: 1, to: 2, id: 1, label: 'um' },
  { from: 1, to: 3, id: 3 },
  { from: 2, to: 3, id: 2 },
  // { from: 2, to: 4, id: 14 },
  { from: 1, to: 4, id: 4 },
  { from: 3, to: 5, id: 12 },

  { from: 4, to: 5, id: 6 },
  { from: 4, to: 6, id: 13 },
  { from: 1, to: 6, id: 5 },
  { from: 6, to: 2, id: 7 },
  { from: 1, to: 5, id: 8 },

  { from: 7, to: 8, id: 9 },
  { from: 1, to: 7, id: 10 },
  { from: 6, to: 8, id: 11 },
]

const options = {
  edges: {
    color: '#fff',
    smooth: {
      enabled: true,
      type: 'continuous',
      roundness: 0,
    },
  },
  nodes: {
    shape: 'dot',
    size: 64,
  },
  interaction: {
    dragNodes: false,
    dragView: false,
    hover: true,
  },
  layout: {
    hierarchical: {
      enabled: false,
      nodeSpacing: 100,
    },
  },
}

function VisGraph() {
  const [graph] = useState({ nodes, edges })

  const events = {
    click: function (event) {
      console.log('clicou', event.nodes)
      window.location.href = `/search?index=${event.node}`
    },
  }

  return (
    <>
      <Graph graph={graph} options={options} events={events} />
    </>
  )
}
export default VisGraph
