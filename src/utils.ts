/**
 * Created by Ron on 17/12/2015.
 */

export function joinUrl(baseUrl: string, url: string) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }

    let joined = [baseUrl, url].join('/');

    let normalize = function (str) {
        return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    };

    return normalize(joined);
}

export function deepMerge(obj1: object, obj2: object): any {
    let result = {};
    for (let i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
                result[i] = deepMerge(obj1[i], obj2[i]);
            } else {
                result[i] = obj1[i];
            }
        }
    }
    for (let i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            if (i in result) {
                continue;
            }
            result[i] = obj2[i];
        }

    }
    return result;
}

export function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    });
}

export function buildQueryString(obj: object) {
    return Object
        .keys(obj)
        .map((key) => !!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key)
        .join('&');
}

export function getWindowOrigin(w = window) {
    try {
        if (!w || !w.location) {
            return null;
        }
        if (!w.location.origin) {
            return `${w.location.protocol}//${w.location.hostname}${w.location.port ? ':' + w.location.port : ''}`;
        }
        return w.location.origin;
    } catch (error) {
        return null;
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // error instanceof DOMException && error.name === 'SecurityError'
    }
}

export function getFullUrlPath(location: HTMLAnchorElement|Location): string {
    if (!location.protocol) {
        let temp = document.createElement('a');

        temp.href = location.href;

        location = temp;
    }

    return location.protocol + '//' + location.hostname
        + (location.port && location.port !== '80' && location.port !== '443' ? location.port : '') // Append the port only when it's not the default Port
        + (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname);
}