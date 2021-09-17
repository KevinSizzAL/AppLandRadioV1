import lodash from 'lodash'

export const getJSON = (obj={}, fields=[], undefined_response='') => {
    if (typeof(obj) !== 'object' || typeof(fields) !== 'object' ) return undefined_response
    return lodash.get(obj, fields)?lodash.get(obj, fields):undefined_response
} 