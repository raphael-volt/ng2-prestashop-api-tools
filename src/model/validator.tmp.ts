/*
let tmp = {
    isPriceDisplayMethod: ["A valid price display method, meaning the value be equals to constants PS_TAX_EXC or PS_TAX_INC.",
        `new RegExp('^PS_TAX_EXC|PS_TAX_INC$')`],
    isPrice: ["A valid price display method (either PS_TAX_EXC or PS_TAX_INC).",
        `new RegExp('^[0-9]{1,10}(\.[0-9]{1,9})?$')`],
    isSerializedArray: ["PHP serialized data.",
        `new RegExp('^a:[0-9]+:{.*;}$')`],
    isBirthDate: ["A valid date, in YYYY-MM-DD format.",
        `new RegExp('^([0-9]{4})-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$)`],
    isColor: ["A valid HTML/CSS color, in #xxxxxx format or text format.",
        `new RegExp('^(#[0-9a-fA-F]{6}|[a-zA-Z0-9-]*)$)`],
    isEmail: ["A valid e-mail address.",
        `new RegExp('^[a-z0-9!#$%&\'*+\/=?^\`{}|~_-]+[.a-z0-9!#$%&\'*+\/=?^\`{}|~_-]*@[a-z0-9]+[._a-z0-9-]*\\.[a-z0-9]+$', "ui")`],
    isImageSize: ["A valid image size, between 0 and 9999.",
        `new RegExp('^[0-9]{1,4}$')`],
    isLanguageCode: ["A valid language code, in XX or XX-XX format.",
        `new RegExp('^[a-zA-Z]{2}(-[a-zA-Z]{2})?$')`],
    isLanguageIsoCode: ["A valid ISO language code, in XX or XXX format.",
        `new RegExp('^[a-zA-Z]{2,3}$')`],
    isLinkRewrite: ["A valid link rewrite.",
        `new RegExp('^[_a-zA-Z0-9-]+$')`],
    isMd5: ["A valid MD5 string: 32 characters, mixing lowercase, uppercase and numerals.",
        `new RegExp('^[a-f0-9A-F]{32}$')`],
    isNumericIsoCode: ["A valid ISO code, in 00 or 000 format.",
        `new RegExp('^[0-9]{2,3}$')`],
    isPasswd: ["A valid password, in. between 5 and 32 characters long.",
        `new RegExp('^[.a-zA-Z_0-9-!@#$%\\^&*()]{5,32}$')`],
    isPasswdAdmin: ["A valid password, between 8 and 32 characters long.",
        `new RegExp('^[.a-zA-Z_0-9-!@#$%\\^&*()]{8,32}$')`],
    isPhpDateFormat: ["A valid PHP date – in fact, a string without '<' nor '>'.",
        `new RegExp('/^[^<>]+$')`],
    isReference: ["A valid product reference.",
        `new RegExp('/^[^<>;={}]*$', "u")`],
    isUrl: ["A valid URL.",
        '/^[~:#,%&_=\\(\\)\\.\\? \\+\\-@\\/a-zA-Z0-9]+$/'],
    isCatalogName: ["A valid product or category name.",
        '/^[^<>;=#{}]*$/u'],
    isCarrierName: ["A valid carrier name.",
        '/^[^<>;=#{}]*$/u'],
    isConfigName: ["A valid configuration key.",
        '/^[a-zA-Z_0-9-]+$/'],
    isGenericName: ["A valid standard name.",
        '/^[^<>;=#{}]*$/u'],
    isImageTypeName: ["A valid image type.",
        '/^[a-zA-Z0-9_ -]+$/'],
    isName: ["A valid name.",
        '/^[^0-9!<>,;?=+()@#"°{}_$%:]*$/u'],
    isTplName: ["A valid template name.",
        '/^[a-zA-Z0-9_-]+$/'],
    isAddress: ["A valid postal address.",
        '/^[^!<>?=+@{}_$%]*$/u'],
    isCityName: ["A valid city name.",
        '/^[^!<>;?=+@#"°{}_$%]*$/u'],
    isCoordinate: ["A valid latitude-longitude coordinates, in 00000.0000 form.",
        '/^\\-?[0-9]{1,8}\\.[0-9]{1,8}$/'],
    isMessage: ["A valid message.",
        '/[<>{}]/i'],
    isPhoneNumber: ["A valid phone number.",
        '/^[+0-9. ()-]*$/'],
    isPostCode: ["A valid postal code.",
        '/^[a-zA-Z 0-9-]+$/'],
    isStateIsoCode: ["A valid state ISO code.",
        '/^[a-zA-Z0-9]{2,3}((-)[a-zA-Z0-9]{1,3})?$/'],
    isZipCodeFormat: ["A valid zipcode format.",
        '/^[NLCnlc -]+$/'],
    isAbsoluteUrl: ["A valid absolute URL.",
        '/^https?:\\/\\/[:#%&_=\\(\\)\\.\\? \\+\\-@\\/a-zA-Z0-9]+$/'],
    isDniLite: ["A valid DNI (Documento Nacional de Identidad) identifier. Specific to Spanish shops.",
        '/^[0-9A-Za-z-.]{1,16}$/'],
    isEan13: ["A valid barcode (EAN13).",
        '/^[0-9]{0,13}$/'],
    isUpc: ["A valid barcode (UPC).",
        '/^[0-9]{0,12}$/'],
    isDate: ["A valid date, in YYYY-MM-DD format.",
        '/^([0-9]{4})-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/'],
    isDateFormat: ["A valid date, in YYYY-MM-DD format.",
        "/^([0-9]{4})-((0?[0-9])|(1[0-2]))-((0?[0-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/"],
    isNegativePrice: ["A valid negative price.",
        "/^[-]?[0-9]{1,10}(\.[0-9]{1,9})?$/"],
    isIp2Long: ["A valid Ip2Long.",
        "/^-?[0-9]+$/"],
    isApe: ["A valid APE code",
        "/^[0-9]{3,4}[a-zA-Z]{1}$/"],
    isTrackingNumber: ["A valid tracking number",
        "/^[~:#,%&_=\(\)\[\]\.\? \+\-@\/a-zA-Z0-9]+$/"],
    isModuleName: ["A valid module name",
        "/^[a-zA-Z0-9_-]+$/"],
    isProductVisibility: ["A valid product visiblity value.",
        "/^both|catalog|search|none$/i"],
    isStockManagement: ["A valid stock management value.",
        "/^WA|FIFO|LIFO$/"],
    isReductionType: ["A valid reduction type.",
        "/^percentage|amount$/"],
    IsGenericName: ["A valid generic name",
        "/^[^<>={}]*$/u"]
}


const _VALIDATORS_DESCRIPTORS = {
    isBool: ["A boolean value (true or false).", "FUNC"],
    isFloat: ["A floating-point value (between -3.4 × 10^38 and +3.4 × 10^38).", "FUNC"],
    isInt: ["An integral value (between -2,147,483,648 and 2,147,483,647).", "FUNC"],
    isString: ["A string of characters.", "FUNC"],
    isNullOrUnsignedId: ["An integral and unsigned value (between 0 and 4294967296), or a NULL value.", "FUNC"],
    isUnsignedId: ["An integral and unsigned value (between 0 and 4294967296).", "FUNC"],
    isCleanHtml: ["Must not contain invalid HTML tags, nor XSS.", "FUNC"],
    isUnsignedInt: ["A valid unsigned int", "FUNC"],
    isPercentage: ["A valid percentage (between 0 and 100).", "FUNC"],
    isUnsignedFloat: ["A valid unsigned float.", "FUNC"],
    isSiret: ["A valid siret number.", "FUNC"],
    isAnything: ["Anything", "FUNC"],

    isPriceDisplayMethod: ["A valid price display method, meaning the value be equals to constants PS_TAX_EXC or PS_TAX_INC.",
        /^PS_TAX_EXC|PS_TAX_INC$/],
    isPrice: ["A valid price display method (either PS_TAX_EXC or PS_TAX_INC).",
        /^[0-9]{1,10}(\.[0-9]{1,9})?$/],
    isSerializedArray: ["PHP serialized data.",
        /^a:[0-9]+:{.*;}$/],
    isBirthDate: ["A valid date, in YYYY-MM-DD format.",
        /^([0-9]{4})-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/],
    isColor: ["A valid HTML/CSS color, in #xxxxxx format or text format.",
        /^(#[0-9a-fA-F]{6}|[a-zA-Z0-9-]*)$/],
    isEmail: ["A valid e-mail address.",
        `new RegExp('^[a-z0-9!#$%&\'*+\\/=?^\`{}|~_-]+[.a-z0-9!#$%&\'*+\\/=?^\`{}|~_-]*@[a-z0-9]+[._a-z0-9-]*\\.[a-z0-9]+$', 'ui')`],
    isImageSize: ["A valid image size, between 0 and 9999.",
        /^[0-9]{1,4}$/],
    isLanguageCode: ["A valid language code, in XX or XX-XX format.",
        /^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/],
    isLanguageIsoCode: ["A valid ISO language code, in XX or XXX format.",
        /^[a-zA-Z]{2,3}$/],
    isLinkRewrite: ["A valid link rewrite.",
        /^[_a-zA-Z0-9-]+$/],
    isMd5: ["A valid MD5 string: 32 characters, mixing lowercase, uppercase and numerals.",
        '/^[a-f0-9A-F]{32}$/'],
    isNumericIsoCode: ["A valid ISO code, in 00 or 000 format.",
        '/^[0-9]{2,3}$/'],
    isPasswd: ["A valid password, in. between 5 and 32 characters long.",
        '/^[.a-zA-Z_0-9-!@#$%\\^&*()]{5,32}$/'],
    isPasswdAdmin: ["A valid password, between 8 and 32 characters long.",
        '/^[.a-zA-Z_0-9-!@#$%\\^&*()]{8,32}$/'],
    isPhpDateFormat: ["A valid PHP date – in fact, a string without '<' nor '>'.",
        '/^[^<>]+$/'],
    isReference: ["A valid product reference.",
        '/^[^<>;={}]*$/u'],
    isUrl: ["A valid URL.",
        '/^[~:#,%&_=\\(\\)\\.\\? \\+\\-@\\/a-zA-Z0-9]+$/'],
    isCatalogName: ["A valid product or category name.",
        '/^[^<>;=#{}]*$/u'],
    isCarrierName: ["A valid carrier name.",
        '/^[^<>;=#{}]*$/u'],
    isConfigName: ["A valid configuration key.",
        '/^[a-zA-Z_0-9-]+$/'],
    isGenericName: ["A valid standard name.",
        '/^[^<>;=#{}]*$/u'],
    isImageTypeName: ["A valid image type.",
        '/^[a-zA-Z0-9_ -]+$/'],
    isName: ["A valid name.",
        '/^[^0-9!<>,;?=+()@#"°{}_$%:]*$/u'],
    isTplName: ["A valid template name.",
        '/^[a-zA-Z0-9_-]+$/'],
    isAddress: ["A valid postal address.",
        '/^[^!<>?=+@{}_$%]*$/u'],
    isCityName: ["A valid city name.",
        '/^[^!<>;?=+@#"°{}_$%]*$/u'],
    isCoordinate: ["A valid latitude-longitude coordinates, in 00000.0000 form.",
        '/^\\-?[0-9]{1,8}\\.[0-9]{1,8}$/'],
    isMessage: ["A valid message.",
        '/[<>{}]/i'],
    isPhoneNumber: ["A valid phone number.",
        '/^[+0-9. ()-]*$/'],
    isPostCode: ["A valid postal code.",
        '/^[a-zA-Z 0-9-]+$/'],
    isStateIsoCode: ["A valid state ISO code.",
        '/^[a-zA-Z0-9]{2,3}((-)[a-zA-Z0-9]{1,3})?$/'],
    isZipCodeFormat: ["A valid zipcode format.",
        '/^[NLCnlc -]+$/'],
    isAbsoluteUrl: ["A valid absolute URL.",
        '/^https?:\\/\\/[:#%&_=\\(\\)\\.\\? \\+\\-@\\/a-zA-Z0-9]+$/'],
    isDniLite: ["A valid DNI (Documento Nacional de Identidad) identifier. Specific to Spanish shops.",
        '/^[0-9A-Za-z-.]{1,16}$/'],
    isEan13: ["A valid barcode (EAN13).",
        '/^[0-9]{0,13}$/'],
    isUpc: ["A valid barcode (UPC).",
        '/^[0-9]{0,12}$/'],
    isDate: ["A valid date, in YYYY-MM-DD format.",
        '/^([0-9]{4})-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/'],
    isDateFormat: ["A valid date, in YYYY-MM-DD format.",
        "/^([0-9]{4})-((0?[0-9])|(1[0-2]))-((0?[0-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/"],
    isNegativePrice: ["A valid negative price.",
        "/^[-]?[0-9]{1,10}(\.[0-9]{1,9})?$/"],
    isIp2Long: ["A valid Ip2Long.",
        "/^-?[0-9]+$/"],
    isApe: ["A valid APE code",
        "/^[0-9]{3,4}[a-zA-Z]{1}$/"],
    isTrackingNumber: ["A valid tracking number",
        "/^[~:#,%&_=\(\)\[\]\.\? \+\-@\/a-zA-Z0-9]+$/"],
    isModuleName: ["A valid module name",
        "/^[a-zA-Z0-9_-]+$/"],
    isProductVisibility: ["A valid product visiblity value.",
        "/^both|catalog|search|none$/i"],
    isStockManagement: ["A valid stock management value.",
        "/^WA|FIFO|LIFO$/"],
    isReductionType: ["A valid reduction type.",
        "/^percentage|amount$/"],
    IsGenericName: ["A valid generic name",
        "/^[^<>={}]*$/u"]
}

    */
/*
isNullOrUnsignedId
isUnsignedId
isBool
isDate
isUnsignedInt
isFloat
isCleanHtml
isInt
isPercentage
isNegativePrice
isDateFormat
isUnsignedFloat
isIp2Long
isSiret
isApe
isTrackingNumber
isAnything
isModuleName
isString
isProductVisibility
isReductionType
isStockManagement
*/
export enum ValidationErrors {
    NONE,
    TO_LONG,
    IS_BOOL,
    IS_FLOAT,
    IS_INT,
    IS_UNSIGNED_INT,
    IS_NULL_OR_UNSIGNED_INT,
    IS_UNSIGNED_ID,
    IS_NULL_OR_UNSIGNED_ID,
    IS_STRING,
    IS_CLEAN_HTML,
    IS_PERCENTAGE,
    IS_UNSIGNED_FLOAT,
    IS_SIRET,
    IS_ANY_THING
}

const INT_MAX_VALUE: number = 4294967296
const INT_MIN_VALUE: number = - INT_MAX_VALUE

const validate = (input: string, maxLenght: number, re: RegExp, code: ValidationErrors): ValidationErrors => {
    if(re.test(input)) {
        if(! validateLength(input, maxLenght))
            return ValidationErrors.TO_LONG
        return ValidationErrors.NONE
    }
    return code
}

const validateLength = (input: any, maxLength: number): boolean => {
    if (!maxLength)
        return true
    return String(input).length <= maxLength
}

export const isString = (value: any, maxLenght?: number): ValidationErrors => {
    if (typeof value === 'string') {
        if (!validateLength(value, maxLenght))
            return ValidationErrors.TO_LONG
        return ValidationErrors.NONE
    }
    return ValidationErrors.IS_STRING
}

export const isAnything = (value: any, maxLenght?: number): ValidationErrors => {
    return ValidationErrors.NONE
}

export const isBool = (value: any, maxLenght?: number): ValidationErrors => {
    if (value === true || value === false || String(value) === "false" || String(value) === "true")
        return ValidationErrors.NONE
    return ValidationErrors.IS_BOOL
}

export const isFloat = (value: any, maxLenght?: number): ValidationErrors => {
    value = Number(value)
    if (!isNaN(value) && isFinite(value)) {
        if (!validateLength(value, maxLenght))
            return ValidationErrors.TO_LONG
        return ValidationErrors.NONE
    }
    return ValidationErrors.IS_FLOAT
}

export const isUnsignedFloat = (value: any, maxLenght?: number): ValidationErrors => {
    if (isFloat(value) == ValidationErrors.NONE) {
        if (!validateLength(value, maxLenght))
            return ValidationErrors.TO_LONG
        if (Number(value) >= 0)
            return ValidationErrors.NONE
    }
    return ValidationErrors.IS_UNSIGNED_FLOAT
}

export const isInt = (value: any, maxLenght?: number): ValidationErrors => {
    if (typeof value === 'number' && isFinite(value) && Math.floor(value) === value) {
        if (!validateLength(value, maxLenght))
            return ValidationErrors.TO_LONG
        if (value > INT_MIN_VALUE && value < INT_MAX_VALUE)
            return ValidationErrors.NONE
    }
    return ValidationErrors.IS_INT
}

export const isPercentage = (value: any, maxLenght?: number): ValidationErrors => {
    if (isFloat(value) == ValidationErrors.NONE) {
        value = Number(value)
        if (value >= 0 && value < 100)
            return ValidationErrors.NONE
    }
    return ValidationErrors.IS_PERCENTAGE
}

export const isUnsignedInt = (value: any, maxLenght?: number): ValidationErrors => {
    if (isInt(value) == ValidationErrors.NONE) {
        if (Number(value) >= 0) {
            if (validateLength(value, maxLenght))
                return ValidationErrors.NONE
            return ValidationErrors.TO_LONG
        }
    }
    return ValidationErrors.IS_UNSIGNED_INT
}

export const isNullOrUnsignedInt = (value: any, maxLenght?: number): ValidationErrors => {
    if (value == null || value == undefined || String(value).toLowerCase() == "null")
        return ValidationErrors.NONE
    let error: ValidationErrors = isUnsignedInt(value, maxLenght)
    if (error == ValidationErrors.IS_UNSIGNED_INT)
        error = ValidationErrors.IS_NULL_OR_UNSIGNED_INT
    return error
}

export const isUnsignedId = (value: any, maxLenght?: number): ValidationErrors => {
    let error: ValidationErrors = isUnsignedInt(value, maxLenght)
    if (error == ValidationErrors.IS_UNSIGNED_INT)
        error = ValidationErrors.IS_NULL_OR_UNSIGNED_ID
    return error
}

export const isNullOrUnsignedId = (value: any, maxLenght?: number): ValidationErrors => {
    let error: ValidationErrors = isNullOrUnsignedInt(value, maxLenght)
    if (error == ValidationErrors.IS_NULL_OR_UNSIGNED_INT)
        error = ValidationErrors.IS_NULL_OR_UNSIGNED_ID
    return error
}

export const isCleanHtml = (value: any, maxLenght?: number): ValidationErrors => {
    let error: ValidationErrors = isString(value, maxLenght)
    if (error == ValidationErrors.IS_STRING)
        error = ValidationErrors.IS_CLEAN_HTML
    return error
}

export const isSiret = (value: any, maxLenght?: number): ValidationErrors => {
    value = String(value)
    let siret: string = String(value).trim()
    if (siret.length != 14)
        return ValidationErrors.IS_SIRET
    let sum: number = 0
    for (let i = 0; i != 14; i++) {
        let tmp = (((i + 1) % 2) + 1) * Number(siret.charAt(i))
        if (tmp >= 10)
            tmp -= 9
        sum += tmp;
    }
    return (sum % 10 === 0) ? ValidationErrors.NONE : ValidationErrors.IS_SIRET
}