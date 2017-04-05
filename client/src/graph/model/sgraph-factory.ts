import { injectable } from "inversify"
import { SModelFactory } from "../../base/model/smodel-factory"
import {
    getBasicType, SChildElement, SModelElementSchema, SModelRoot, SModelRootSchema, SParentElement
} from "../../base/model/smodel"
import {
    SCompartment,
    SCompartmentElement, SEdge, SEdgeSchema, SGraph, SGraphSchema, SLabel, SLabelSchema, SNode, SNodeSchema
} from "./sgraph"

@injectable()
export class SGraphFactory extends SModelFactory {

    createElement(schema: SModelElementSchema, parent?: SParentElement): SChildElement {
        if (schema instanceof SChildElement) {
            if (parent !== undefined)
                schema.parent = parent
            return schema
        } else if (this.isNodeSchema(schema))
            return this.initializeChild(new SNode(), schema, parent)
        else if (this.isEdgeSchema(schema))
            return this.initializeChild(new SEdge(), schema, parent)
        else if (this.isLabelSchema(schema))
            return this.initializeChild(new SLabel(), schema, parent)
        else if (this.isCompartmentSchema(schema))
            return this.initializeChild(new SCompartment(), schema, parent)
        else
            return super.createElement(schema, parent)
    }

    createRoot(schema: SModelRootSchema): SModelRoot {
        if (schema instanceof SModelRoot)
            return schema
        else if (this.isGraphSchema(schema))
            return this.initializeRoot(new SGraph(), schema)
        else
            return super.createRoot(schema)
    }

    isGraphSchema(schema: SModelElementSchema): schema is SGraphSchema {
        return getBasicType(schema) == 'graph'
    }

    isNodeSchema(schema: SModelElementSchema): schema is SNodeSchema {
        return getBasicType(schema) == 'node'
    }

    isEdgeSchema(schema: SModelElementSchema): schema is SEdgeSchema {
        return getBasicType(schema) == 'edge'
    }

    isLabelSchema(schema: SModelElementSchema): schema is SLabelSchema {
        return getBasicType(schema) == 'label'
    }

    isCompartmentSchema(schema: SModelElementSchema): schema is SLabelSchema {
        return getBasicType(schema) == 'comp'
    }

}
