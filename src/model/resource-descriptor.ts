
export interface ResourceDescriptorCollection {
    [name: string]: ResourceDescriptor
}

export interface ResourceDescriptor {
    get: boolean
    post: boolean
    put: boolean
    delete: boolean
    synopsis: boolean
}

export interface PropertyValidator {
    method: string
    maxSize: boolean
}

export interface PropertyDescriptorCollection {
    [name: string]: PropertyDescriptor
}

export interface PropertyDescriptor {
    translatable: boolean
    required: boolean
    readOnly: boolean
    validator: PropertyValidator
}

export interface AssociationResource {
    [name: string]: AssociationNode
}

export interface AssociationNode {
    [name: string]: AssociationNodeProperty
}

export interface AssociationNodeProperty {
    [name: string]: boolean
}

export interface ResourceSynopsis {
    interfaceName?: string
    nodeName: string
    resource: string
    properties: PropertyDescriptorCollection
    associations?: AssociationResource
}