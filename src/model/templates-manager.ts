/*

GENERIC VALUE TYPES 

isBool A boolean value (true or false). n/a

isFloat A floating-point value (between -3.4 × 10^38 and +3.4 × 10^38). n/a

isInt An integral value (between -2,147,483,648 and 2,147,483,647). n/a

isNullOrUnsignedId An integral and unsigned value (between 0 and 4294967296), or a NULL value. n/a

isSerializedArray PHP serialized data. /^a:[0-9]+:{.*;}$/

isString A string of characters. n/a

isUnsignedId An integral and unsigned value (between 0 and 4294967296). n/a

SPECIFIC VALUE TYPES

isBirthDate A valid date, in YYYY-MM-DD format. /^([0-9]{4})-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/

isCleanHtml Must not contain invalid HTML tags, nor XSS.

isColor A valid HTML/CSS color, in #xxxxxx format or text format. /^(#[0-9a-fA-F]{6}|[a-zA-Z0-9-]*)$/

isEmail A valid e-mail address. /^[a-z0-9!#$%&\'*+\/=?^`{}|~_-]+[.a-z0-9!#$%&\'*+\/=?^`{}|~_-]*@[a-z0-9]+[._a-z0-9-]*\.[a-z0-9]+$/ui

isImageSize A valid image size, between 0 and 9999. /^[0-9]{1,4}$/

isLanguageCode A valid language code, in XX or XX-XX format. /^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/

isLanguageIsoCode A valid ISO language code, in XX or XXX format. /^[a-zA-Z]{2,3}$/

isLinkRewrite A valid link rewrite. /^[_a-zA-Z0-9-]+$/

isMd5 A valid MD5 string: 32 characters, mixing lowercase, uppercase and numerals. /^[a-f0-9A-F]{32}$/

isNumericIsoCode A valid ISO code, in 00 or 000 format. /^[0-9]{2,3}$/

isPasswd A valid password, in. between 5 and 32 characters long. /^[.a-zA-Z_0-9-!@#$%\^&*()]{5,32}$/

isPasswdAdmin A valid password, between 8 and 32 characters long. /^[.a-zA-Z_0-9-!@#$%\^&*()]{8,32}$/

isPhpDateFormat A valid PHP date – in fact, a string without '<' nor '>'. /^[^<>]+$/

isPriceDisplayMethod A valid price display method, meaning the value be equals to constants PS_TAX_EXC or PS_TAX_INC. n/a

isReference A valid product reference. /^[^<>;={}]*$/u

isUrl A valid URL. /^[~:#,%&_=\(\)\.\? \+\-@\/a-zA-Z0-9]+$/


NAMES 

isCatalogName A valid product or category name. /^[^<>;=#{}]*$/u

isCarrierName A valid carrier name. /^[^<>;=#{}]*$/u

isConfigName A valid configuration key. /^[a-zA-Z_0-9-]+$/

isGenericName A valid standard name. /^[^<>;=#{}]*$/u

isImageTypeName A valid image type /^[a-zA-Z0-9_ -]+$/

isName A valid name. /^[^0-9!<>,;?=+()@#"°{}_$%:]*$/u

isTplName A valid template name. /^[a-zA-Z0-9_-]+$/


LOCATIONS

isAddress A valid postal address. /^[^!<>?=+@{}_$%]*$/u

isCityName A valid city name. /^[^!<>;?=+@#"°{}_$%]*$/u

isCoordinate A valid latitude-longitude coordinates, in 00000.0000 form. /^\-?[0-9]{1,8}\.[0-9]{1,8}$/

isMessage A valid message. /[<>{}]/i

isPhoneNumber A valid phone number. /^[+0-9. ()-]*$/

isPostCode A valid postal code. /^[a-zA-Z 0-9-]+$/

isStateIsoCode A valid state ISO code. /^[a-zA-Z0-9]{2,3}((-)[a-zA-Z0-9]{1,3})?$/

isZipCodeFormat A valid zipcode format. /^[NLCnlc -]+$/


PRODUCTS

isAbsoluteUrl A valid absolute URL. /^https?:\/\/[:#%&_=\(\)\.\? \+\-@\/a-zA-Z0-9]+$/

isDniLite A valid DNI (Documento Nacional de Identidad) identifier. Specific to Spanish shops. /^[0-9A-Za-z-.]{1,16}$/

isEan13 A valid barcode (EAN13). /^[0-9]{0,13}$/

isLinkRewrite A valid friendly URL. /^[_a-zA-Z0-9-]+$/

isPrice A valid price display method (either PS_TAX_EXC or PS_TAX_INC). n/a

isUpc A valid barcode (UPC). /^[0-9]{0,12}$/

*/
const VALIDATORS_DESCRIPTORS = {
    isBool: ["A boolean value (true or false).", "undefined"],
    isFloat: ["A floating-point value (between -3.4 × 10^38 and +3.4 × 10^38).", "undefined"],
    isInt: ["An integral value (between -2,147,483,648 and 2,147,483,647).", "undefined"],
    isNullOrUnsignedId: ["An integral and unsigned value (between 0 and 4294967296), or a NULL value.", "undefined"],
    isSerializedArray: ["PHP serialized data.", '/^a:[0-9]+:{.*;}$/'],
    isString: ["A string of characters.", "undefined"],
    isUnsignedId: ["An integral and unsigned value (between 0 and 4294967296).", "undefined"],
    isBirthDate: ["A valid date, in YYYY-MM-DD format.", '/^([0-9]{4})-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/'],
    isCleanHtml: ["Must not contain invalid HTML tags, nor XSS.", "undefined"],
    isColor: ["A valid HTML/CSS color, in #xxxxxx format or text format.", '/^(#[0-9a-fA-F]{6}|[a-zA-Z0-9-]*)$/'],
    isEmail: ["A valid e-mail address.", "/^[a-z0-9!#$%&\\'*+\\/=?^`{}|~_-]+[.a-z0-9!#$%&\\'*+\\/=?^`{}|~_-]*@[a-z0-9]+[._a-z0-9-]*\\.[a-z0-9]+$/ui"],
    isImageSize: ["A valid image size, between 0 and 9999.", '/^[0-9]{1,4}$/'],
    isLanguageCode: ["A valid language code, in XX or XX-XX format.", '/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/'],
    isLanguageIsoCode: ["A valid ISO language code, in XX or XXX format.", '/^[a-zA-Z]{2,3}$/'],
    isLinkRewrite: ["A valid link rewrite.", '/^[_a-zA-Z0-9-]+$/'],
    isMd5: ["A valid MD5 string: 32 characters, mixing lowercase, uppercase and numerals.", '/^[a-f0-9A-F]{32}$/'],
    isNumericIsoCode: ["A valid ISO code, in 00 or 000 format.", '/^[0-9]{2,3}$/'],
    isPasswd: ["A valid password, in. between 5 and 32 characters long.", '/^[.a-zA-Z_0-9-!@#$%\\^&*()]{5,32}$/'],
    isPasswdAdmin: ["A valid password, between 8 and 32 characters long.", '/^[.a-zA-Z_0-9-!@#$%\\^&*()]{8,32}$/'],
    isPhpDateFormat: ["A valid PHP date – in fact, a string without '<' nor '>'.", '/^[^<>]+$/'],
    isPriceDisplayMethod: ["A valid price display method, meaning the value be equals to constants PS_TAX_EXC or PS_TAX_INC.", "undefined"],
    isReference: ["A valid product reference.", '/^[^<>;={}]*$/u'],
    isUrl: ["A valid URL.", '/^[~:#,%&_=\\(\\)\\.\\? \\+\\-@\\/a-zA-Z0-9]+$/'],
    isCatalogName: ["A valid product or category name.", '/^[^<>;=#{}]*$/u'],
    isCarrierName: ["A valid carrier name.", '/^[^<>;=#{}]*$/u'],
    isConfigName: ["A valid configuration key.", '/^[a-zA-Z_0-9-]+$/'],
    isGenericName: ["A valid standard name.", '/^[^<>;=#{}]*$/u'],
    isImageTypeName: ["A valid image type.", '/^[a-zA-Z0-9_ -]+$/'],
    isName: ["A valid name.", '/^[^0-9!<>,;?=+()@#"°{}_$%:]*$/u'],
    isTplName: ["A valid template name.", '/^[a-zA-Z0-9_-]+$/'],
    isAddress: ["A valid postal address.", '/^[^!<>?=+@{}_$%]*$/u'],
    isCityName: ["A valid city name.", '/^[^!<>;?=+@#"°{}_$%]*$/u'],
    isCoordinate: ["A valid latitude-longitude coordinates, in 00000.0000 form.", '/^\\-?[0-9]{1,8}\\.[0-9]{1,8}$/'],
    isMessage: ["A valid message.", '/[<>{}]/i'],
    isPhoneNumber: ["A valid phone number.", '/^[+0-9. ()-]*$/'],
    isPostCode: ["A valid postal code.", '/^[a-zA-Z 0-9-]+$/'],
    isStateIsoCode: ["A valid state ISO code.", '/^[a-zA-Z0-9]{2,3}((-)[a-zA-Z0-9]{1,3})?$/'],
    isZipCodeFormat: ["A valid zipcode format.", '/^[NLCnlc -]+$/'],
    isAbsoluteUrl: ["A valid absolute URL.", '/^https?:\\/\\/[:#%&_=\\(\\)\\.\\? \\+\\-@\\/a-zA-Z0-9]+$/'],
    isDniLite: ["A valid DNI (Documento Nacional de Identidad) identifier. Specific to Spanish shops.", '/^[0-9A-Za-z-.]{1,16}$/'],
    isEan13: ["A valid barcode (EAN13).", '/^[0-9]{0,13}$/'],
    isPrice: ["A valid price display method (either PS_TAX_EXC or PS_TAX_INC).", "undefined"],
    isUpc: ["A valid barcode (UPC).", '/^[0-9]{0,12}$/']
}


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

import { TsLibStringUtils } from "ts-lib-string-utils";

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

export const VALIDATORS_FILENAME: string = "validators"

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
                {{name}}: [{{desc.translatable}}, {{desc.required}}, {{desc.readOnly}}, {{desc.validator.method}}, {{desc.validator.maxSize}}]{{#coma}},{{/coma}}
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

const VALIDATOR_TEMPLATE: string = `export enum ValidationErrors {
    NONE,
    TO_LONG,
    {{#errors}}
    {{name}}{{#coma}},{{/coma}}
    {{/errors}}
}

export const VALIDATIONS_DESCRIPTIONS: { [code: number]: string } = {
    [ValidationErrors.NONE]: "",
    [ValidationErrors.TO_LONG]: "Maximum length reached",
    {{#errors}}
    [ValidationErrors.{{name}}]: "{{{description}}}"{{#coma}},{{/coma}}
    {{/errors}}
}

const validate = (input: string, maxLength: number, re: RegExp, error: ValidationErrors): ValidationErrors => {
    if (maxLength && input.length > maxLength)
        return ValidationErrors.TO_LONG
    if (re && !re.test(input))
        return error
    return ValidationErrors.NONE
}
{{#errors}}

export const {{func}} = (input: string, maxLength): ValidationErrors => {
    return validate(input, maxLength, {{{regexp}}}, ValidationErrors.{{name}})
}
{{/errors}}
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
    static validators: string[] = []
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
        const tm = TemplatesManager
        let inputs: { type: string, descriptor: string }[] = []
        let i: number
        const n: number = tm.resources.length
        for (i = 0; i < n; i++) {
            inputs.push({
                type: tm.resources[i],
                descriptor: tm.descriptors[i]
            })
        }
        return inputs
    }
    static serviceTemplate(input: { type: string, descriptor: string }): string {
        return mustache.render(SERVICE_TEMPLATE, input)
    }

    static validatorsTemplate(): string {
        const tm = TemplatesManager
        let enums: any[] = []
        const re: RegExp = /-/g
        const sep: string = "_"
        let f: string
        for (f of tm.validators) {
            if(VALIDATORS_DESCRIPTORS[f] !== undefined) {
                enums.push({
                    func: f,
                    name: TsLibStringUtils.kebab(f).replace(re, sep).toUpperCase(),
                    regexp: VALIDATORS_DESCRIPTORS[f][1],
                    description: VALIDATORS_DESCRIPTORS[f][0]
                })
            }
        }
        for(let i=0; i<enums.length-1; i++) {
            enums[i].coma = true
        }
        return mustache.render(VALIDATOR_TEMPLATE, {errors: enums})
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
        let validator: string
        for (let name in synopsis.properties) {
            validator = synopsis.properties[name].validator.method
            if(validator) {
                if (!validator.length)
                    validator = undefined
                else if (tm.validators.indexOf(validator) == -1)
                    tm.validators.push(validator)
            }
            else
                validator = undefined

            properties.push(
                {
                    name: name,
                    type: tm.getType(validator),
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
            case undefined:
                type = undefined
                break
            default:
                break;
        }
        return type
    }
}

