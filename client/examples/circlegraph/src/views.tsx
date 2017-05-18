/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { RenderingContext } from "../../../src/base"
import { SNode } from "../../../src/graph"
import { CircularNodeView } from "../../../src/lib"
import { VNode } from "snabbdom/vnode"
import * as snabbdom from "snabbdom-jsx"

const JSX = {createElement: snabbdom.svg}

/**
 * A very simple example node consisting of a plain circle.
 */
export class CircleNodeView extends CircularNodeView {
    render(node: SNode, context: RenderingContext): VNode {
        const radius = this.getRadius(node)
        return <g key={node.id} id={node.id}>
            <circle class-node={true} class-selected={node.selected} r={radius} cx={radius} cy={radius}></circle>
            <text x={radius} y={radius + 7} class-text={true}>{node.id.substr(4)}</text>
        </g>
    }

    protected getRadius(node: SNode) {
        return 40
    }
}
