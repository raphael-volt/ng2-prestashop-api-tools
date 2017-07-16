
/*
FILE STRUCTURES

index.ts
prestashop-api.module.ts
prestashop-api.service.ts // authentication
prestashop-config.service.ts // key, url, active
resource.service.ts // CRUD
shared
    resource.types.ts
    resource-descriptor.ts
core
    abstract-resource.service.ts
    abstract-resource-descrptor.ts
*/

import * as mustache from 'mustache'

import {
    ResourceSynopsis,
    ResourceDescriptor,
    PropertyDescriptor,
    AssociationNode,
    AssociationNodeProperty
} from "./resource-descriptor";


export const LIBRARY_NAME: string = "prestashop-api"
export const CORE_DIRNAME: string = "core"
export const SHARED_DIRNAME: string = "shared"

export const ABSTRACT_RESOURCE_NAME: string = "AbstractResource"
export const ABSTRACT_RESOURCE_DESCRIPTOR_NAME: string = "AbstractResourceDescriptor"
export const ABSTRACT_SERVICE_NAME: string = "AbstractService"

export const ABSTRACT_RESOURCE_FILENAME: string = "abstract-resource"
export const ABSTRACT_RESOURCE_DESCRIPTOR_FILENAME: string = "abstract-resource-descrptor"
export const ABSTRACT_RESOURCE_SERVICE_FILENAME: string = "abstract-resource.service"

export const RESOURCE_TYPES_FILENAME: string = "resource.types"
export const RESOURCE_DESCRIPTOR_FILENAME: string = "resource-descrptor"
export const RESOURCE_SERVICE_FILENAME: string = "resource.service"

export const API_SERVICE_FILENAME: string = "prestashop-api.service"
export const API_CONFIG_SERVICE_FILENAME: string = "api-config.service"
export const API_MODULE_FILENAME: string = "prestashop-api.module"

export const API_SERVICE_NAME: string = "PrestashopApiService"
export const API_CONFIG_SERVICE_NAME: string = "ApiConfigService"
export const API_MODULE_NAME: string = "PrestashopApiModule"

const REPO_URL: string = "https://github.com/raphael-volt/prestashop-api-core.git"

const RESOURCES_HEADER: string = `import { ${ABSTRACT_RESOURCE_NAME} } from '../${CORE_DIRNAME}/${ABSTRACT_RESOURCE_FILENAME}'
`

const SERVICE_FILE_HEADER: string = `import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { ${ABSTRACT_RESOURCE_DESCRIPTOR_NAME} } from './${CORE_DIRNAME}/${ABSTRACT_RESOURCE_DESCRIPTOR_FILENAME}'
import { ${API_CONFIG_SERVICE_NAME} } from './${API_CONFIG_SERVICE_FILENAME}'
import {
    {{#resources}}
    {{resource}}{{#coma}},{{/coma}}
    {{/resources}}
} from './${SHARED_DIRNAME}/${RESOURCE_TYPES_FILENAME}'
import {
    {{#descriptors}}
    {{descriptor}}{{#coma}},{{/coma}}
    {{/descriptors}}
} from './${SHARED_DIRNAME}/${RESOURCE_DESCRIPTOR_FILENAME}'
`

const SERVICE_TEMPLATE: string = `@Injectable()
export class {{type}}Service extends AbstractResourceService<{{type}}> {
	constructor(http: Http, configService: ${API_CONFIG_SERVICE_NAME}) {
        super(http, configService, new {{descriptor}}())
    }
}
`
const DESCRIPTOR_FILE_HEADER: string = `import { ${ABSTRACT_RESOURCE_DESCRIPTOR_NAME} } from '../${CORE_DIRNAME}/${ABSTRACT_RESOURCE_DESCRIPTOR_FILENAME}'
import {
    {{#resources}}
    {{resource}}{{#coma}},{{/coma}}
    {{/resources}}
} from './${RESOURCE_TYPES_FILENAME}'
`

const INDEX_TEMPLATE: string = `{{#files}}
export * from './{{name}}'
{{/files}}`


const TYPES_TEMPLATE: string = `
export interface {{interfaceName}} extends ${ABSTRACT_RESOURCE_NAME} {
{{#properties}}
    {{name}}?: {{type}}
{{/properties}}
{{#hasAssociations}}

    associations?: {
    {{#associations}}
        {{name}}: {
        {{#items}}
            {{name}}{{#optional}}?{{/optional}}{{#coma}},{{/coma}}
        {{/items}}
        }[]{{#coma}},{{/coma}}
    {{/associations}}
    }
{{/hasAssociations}}
}
`

const DESCRIPTOR_TEMPLATE_VERBOSE: string = `
export class {{voClass}}Descriptor extends ${ABSTRACT_RESOURCE_DESCRIPTOR_NAME}<{{voClass}}> {
    constructor() {
        super(
            "{{resource}}", 
            "{{nodeName}}",
            {
                get: {{descriptor.get}},
                post: {{descriptor.post}},
                put: {{descriptor.put}},
                delete: {{descriptor.delete}}
            },
            {    
            {{#properties}}
                {{name}}: {
                    translatable: {{desc.translatable}},
                    required: {{desc.required}},
                    readOnly: {{desc.readOnly}},
                    validator: {
                        method: "{{desc.validator.method}}",
                        maxSize: {{desc.validator.maxSize}}
                    }
                }{{#coma}},{{/coma}}
            {{/properties}}
            }{{#hasAssociations}},
            {
            {{#associations}}
                {{name}}: {
                    {{nodeName}}: {
                    {{#items}}
                        {{name}}: {{required}}{{#coma}},{{/coma}}
                    {{/items}}
                    }
                }{{#coma}},{{/coma}}
            {{/associations}}
            }{{/hasAssociations}}
        )
    }
}
`
const DESCRIPTOR_TEMPLATE: string = `
export class {{descriptorName}} extends ${ABSTRACT_RESOURCE_DESCRIPTOR_NAME}<{{voClass}}> {
    constructor() {
        super("{{resource}}", "{{nodeName}}",
            {{descriptor.get}}, {{descriptor.post}}, {{descriptor.put}}, {{descriptor.delete}},
            {    
            {{#properties}}
                {{name}}: [{{desc.translatable}}, {{desc.required}}, {{desc.readOnly}}, "{{desc.validator.method}}", {{desc.validator.maxSize}}]{{#coma}},{{/coma}}
            {{/properties}}
            }{{#hasAssociations}},
            {
            {{#associations}}
                {{name}}: {
                    {{nodeName}}: {
                    {{#items}}
                        {{name}}: {{required}}{{#coma}},{{/coma}}
                    {{/items}}
                    }
                }{{#coma}},{{/coma}}
            {{/associations}}
            }{{/hasAssociations}}
        )
    }
}
`

export class TemplatesManager {

    private static firstCharToUpperCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    private static getInterfaceName(nodename: string): string {
        let data: string[] = nodename.split("_")
        let i: number
        const n: number = data.length
        for (i = 0; i < n; i++) {
            data[i] = TemplatesManager.firstCharToUpperCase(data[i])
        }
        return data.join("")
    }

    static sortByName(a: { name: string }, b: { name: string }): number {
        return [a.name, b.name].sort().indexOf(a.name) == 0 ? -1 : 1
    }

    static sortByNameAndTranlatable(a: { name: string, desc: PropertyDescriptor }, b: { name: string, desc: PropertyDescriptor }): number {
        if (!a.desc.translatable && !b.desc.translatable)
            return TemplatesManager.sortByName(a, b)

        if (a.desc.translatable && !b.desc.translatable)
            return -1

        if (!a.desc.translatable && b.desc.translatable)
            return 1
        return TemplatesManager.sortByName(a, b)
    }

    static resourcesHeader(): string {
        return RESOURCES_HEADER
    }
    static resources: string[] = []
    static descriptors: string[] = []
    static descriptorHeader(): string {
        const tm = TemplatesManager
        tm.resources.sort()
        let resources: { resource: string, coma: boolean }[] = []
        // let l: string[] = [ABSTRACT_RESOURCE_NAME].concat(tm.resources)
        for (let r of tm.resources)
            resources.push({ resource: r, coma: true })
        resources[resources.length - 1].coma = false
        return mustache.render(DESCRIPTOR_FILE_HEADER, { resources: resources })
    }
    static createRenderableList(inputs: string[], propertie: string) {
        let output: { coma: boolean, [props: string]: any }[] = []
        let item: { coma: boolean, [props: string]: any }
        let i: number
        const n: number = inputs.length
        for (i = 0; i < n; i++) {
            item = { coma: i < n - 1 }
            item[propertie] = inputs[i]
            output.push(item)
        }
        return output
    }
    static servicesHeader(): string {
        const tm = TemplatesManager
        return mustache.render(SERVICE_FILE_HEADER, {
            resources: tm.createRenderableList(tm.resources, "resource"),
            descriptors: tm.createRenderableList(tm.descriptors, "descriptor")
        })
    }

    static getServiceTemplateInputs(): { type: string, descriptor: string }[] {
        let tm = TemplatesManager
        let inputs: { type: string, descriptor: string }[] = []
        let i:number
        const n: number = tm.resources.length
        for(i=0; i<n; i++) {
            inputs.push ({
                type: tm.resources[i],
                descriptor: tm.descriptors[i]
            })
        }
        return inputs
    }
    static serviceTemplate(input: { type: string, descriptor: string }): string {
        return mustache.render(SERVICE_TEMPLATE, input)
    }

    static descriptorTemplate(synopsis: ResourceSynopsis, descriptor: ResourceDescriptor): string {
        let tm = TemplatesManager
        const voClass: string = tm.getInterfaceName(synopsis.nodeName)
        const descriptorName: string = `${voClass}Descriptor`
        let data: {
            descriptorName: string
            voClass: string,
            resource: string,
            nodeName: string,
            descriptor: ResourceDescriptor,
            properties: { name: string, coma: boolean, desc: PropertyDescriptor }[],
            hasAssociations: boolean,
            associations: any[]
        } = {
                voClass: tm.getInterfaceName(synopsis.nodeName),
                descriptorName: descriptorName,
                resource: synopsis.resource,
                nodeName: synopsis.nodeName,
                descriptor: descriptor,
                properties: [],
                hasAssociations: false,
                associations: []
            }
        let name: string
        for (name in synopsis.properties) {
            data.properties.push({
                name: name,
                coma: true,
                desc: synopsis.properties[name]
            })
        }
        data.properties.sort(tm.sortByNameAndTranlatable)
        data.properties[data.properties.length - 1].coma = false
        if (synopsis.associations) {
            data.hasAssociations = true
            let asso: {
                name: string,
                nodeName: string,
                coma: boolean,
                items: {
                    name: string,
                    required: boolean,
                    coma: boolean
                }[]
            }
            for (name in synopsis.associations) {
                let nodeDesc: AssociationNode = synopsis.associations[name]
                for (let nodeName in nodeDesc) {
                    asso = {
                        name: name,
                        nodeName: nodeName,
                        coma: true,
                        items: []
                    }
                    for (let nodeProp in nodeDesc[nodeName]) {
                        asso.items.push(
                            {
                                name: nodeProp,
                                required: nodeDesc[nodeName][nodeProp],
                                coma: true
                            }
                        )
                    }

                    asso.items.sort(tm.sortByName)
                    asso.items[asso.items.length - 1].coma = false
                }
                data.associations.push(asso)
            }
            data.associations.sort(tm.sortByName)
            data.associations[data.associations.length - 1].coma = false
        }
        tm.descriptors.push(data.descriptorName)
        return mustache.render(DESCRIPTOR_TEMPLATE, data)
    }

    static interfaceTamplate(synopsis: ResourceSynopsis): string {
        const tm = TemplatesManager

        let properties: { name: string, type: string, desc: PropertyDescriptor }[] = []
        for (let name in synopsis.properties) {
            properties.push(
                {
                    name: name,
                    type: tm.getType(synopsis.properties[name].validator.method),
                    desc: synopsis.properties[name]
                }
            )
        }
        properties.sort(tm.sortByNameAndTranlatable)
        let associations: {
            name: string,
            coma: boolean,
            items: {
                name: string,
                optional: boolean,
                coma: boolean
            }[]
        }[] = []
        if (synopsis.associations) {
            let association: {
                name: string,
                coma: boolean,
                items: {
                    name: string,
                    coma: boolean,
                    optional: boolean
                }[]
            }
            for (let name in synopsis.associations) {
                association = {
                    name: name,
                    coma: true,
                    items: []
                }
                for (let nodename in synopsis.associations[name]) {
                    for (let itemProp in synopsis.associations[name][nodename]) {
                        association.items.push(
                            {
                                name: itemProp,
                                coma: true,
                                optional: !synopsis.associations[name][nodename][itemProp]
                            }
                        )
                    }
                }
                association.items.sort(tm.sortByName)
                association.items[association.items.length - 1].coma = false
                associations.push(association)
            }
            associations.sort(tm.sortByName)
            associations[associations.length - 1].coma = false
        }
        const resourceName: string = tm.getInterfaceName(synopsis.nodeName)
        tm.resources.push(resourceName)
        return mustache.render(TYPES_TEMPLATE, {
            interfaceName: resourceName,
            properties: properties,
            hasAssociations: (synopsis.associations != undefined),
            associations: associations
        })
    }

    static getType(validateFunction: string): string {
        let type: string = "string"
        switch (validateFunction) {
            case "isFloat":
            case "isUnsignedFloat":
            case "isInt":
            case "isUnsignedId":
            case "isImageSize":
            case "isNumericIsoCode":
            case "isEan13":
            case "isUpc":
                type = "number"
                break
            case "isNullOrUnsignedId":
                type = "number | null"
                break
            case "isBool":
                type = "boolean"
                break
            case "isDate":
            case "isBirthDate":
                type = "Date"
                break;
            default:
                break;
        }
        return type
    }
}

