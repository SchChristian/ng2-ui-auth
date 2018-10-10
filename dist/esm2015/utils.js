/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 * @param {?} baseUrl
 * @param {?} url
 * @return {?}
 */
export function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    /** @type {?} */
    let joined = [baseUrl, url].join('/');
    /** @type {?} */
    let normalize = function (str) {
        return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    };
    return normalize(joined);
}
/**
 * @param {?} obj1
 * @param {?} obj2
 * @return {?}
 */
export function deepMerge(obj1, obj2) {
    /** @type {?} */
    let result = {};
    for (let i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
                result[i] = deepMerge(obj1[i], obj2[i]);
            }
            else {
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
/**
 * @param {?} name
 * @return {?}
 */
export function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    });
}
/**
 * @param {?} obj
 * @return {?}
 */
export function buildQueryString(obj) {
    return Object
        .keys(obj)
        .map((key) => !!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key)
        .join('&');
}
/**
 * @param {?=} w
 * @return {?}
 */
export function getWindowOrigin(w = window) {
    try {
        if (!w || !w.location) {
            return null;
        }
        if (!w.location.origin) {
            return `${w.location.protocol}//${w.location.hostname}${w.location.port ? ':' + w.location.port : ''}`;
        }
        return w.location.origin;
    }
    catch (error) {
        return null;
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // error instanceof DOMException && error.name === 'SecurityError'
    }
}
/**
 * @param {?} location
 * @return {?}
 */
export function getFullUrlPath(location) {
    if (!location.protocol) {
        /** @type {?} */
        let temp = document.createElement('a');
        temp.href = location.href;
        location = temp;
    }
    return location.protocol + '//' + location.hostname
        + (location.port && location.port !== '80' && location.port !== '443' ? location.port : '') // Append the port only when it's not the default Port
        + (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQSxNQUFNLGtCQUFrQixPQUFlLEVBQUUsR0FBVztJQUNoRCxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNoQyxPQUFPLEdBQUcsQ0FBQztLQUNkOztJQUVELElBQUksTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFFdEMsSUFBSSxTQUFTLEdBQUcsVUFBVSxHQUFHO1FBQ3pCLE9BQU8sR0FBRzthQUNMLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDaEMsQ0FBQztJQUVGLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzVCOzs7Ozs7QUFFRCxNQUFNLG9CQUFvQixJQUFZLEVBQUUsSUFBWTs7SUFDaEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ2hCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQzlELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxD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Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5VcmwoYmFzZVVybDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xyXG4gICAgaWYgKC9eKD86W2Etel0rOik/XFwvXFwvL2kudGVzdCh1cmwpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgam9pbmVkID0gW2Jhc2VVcmwsIHVybF0uam9pbignLycpO1xyXG5cclxuICAgIGxldCBub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0clxyXG4gICAgICAgICAgICAucmVwbGFjZSgvW1xcL10rL2csICcvJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcPy9nLCAnPycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXCMvZywgJyMnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFw6XFwvL2csICc6Ly8nKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShqb2luZWQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlKG9iajE6IG9iamVjdCwgb2JqMjogb2JqZWN0KTogYW55IHtcclxuICAgIGxldCByZXN1bHQgPSB7fTtcclxuICAgIGZvciAobGV0IGkgaW4gb2JqMSkge1xyXG4gICAgICAgIGlmIChvYmoxLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgIGlmICgoaSBpbiBvYmoyKSAmJiAodHlwZW9mIG9iajFbaV0gPT09ICdvYmplY3QnKSAmJiAoaSAhPT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGRlZXBNZXJnZShvYmoxW2ldLCBvYmoyW2ldKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IG9iajFbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpIGluIG9iajIpIHtcclxuICAgICAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICBpZiAoaSBpbiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IG9iajJbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2UobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvKFtcXDpcXC1cXF9dKyguKSkvZywgZnVuY3Rpb24oXywgc2VwYXJhdG9yLCBsZXR0ZXIsIG9mZnNldCkge1xyXG4gICAgICAgIHJldHVybiBvZmZzZXQgPyBsZXR0ZXIudG9VcHBlckNhc2UoKSA6IGxldHRlcjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvYmo6IG9iamVjdCkge1xyXG4gICAgcmV0dXJuIE9iamVjdFxyXG4gICAgICAgIC5rZXlzKG9iailcclxuICAgICAgICAubWFwKChrZXkpID0+ICEhb2JqW2tleV0gPyBgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pfWAgOiBrZXkpXHJcbiAgICAgICAgLmpvaW4oJyYnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvd09yaWdpbih3ID0gd2luZG93KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICghdyB8fCAhdy5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF3LmxvY2F0aW9uLm9yaWdpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7dy5sb2NhdGlvbi5wcm90b2NvbH0vLyR7dy5sb2NhdGlvbi5ob3N0bmFtZX0ke3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHcubG9jYXRpb24ucG9ydCA6ICcnfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3LmxvY2F0aW9uLm9yaWdpbjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgLy8gaWdub3JlIERPTUV4Y2VwdGlvbjogQmxvY2tlZCBhIGZyYW1lIHdpdGggb3JpZ2luIGZyb20gYWNjZXNzaW5nIGEgY3Jvc3Mtb3JpZ2luIGZyYW1lLlxyXG4gICAgICAgIC8vIGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09ICdTZWN1cml0eUVycm9yJ1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnVsbFVybFBhdGgobG9jYXRpb246IEhUTUxBbmNob3JFbGVtZW50fExvY2F0aW9uKTogc3RyaW5nIHtcclxuICAgIGlmICghbG9jYXRpb24ucHJvdG9jb2wpIHtcclxuICAgICAgICBsZXQgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcbiAgICAgICAgdGVtcC5ocmVmID0gbG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgbG9jYXRpb24gPSB0ZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0bmFtZVxyXG4gICAgICAgICsgKGxvY2F0aW9uLnBvcnQgJiYgbG9jYXRpb24ucG9ydCAhPT0gJzgwJyAmJiBsb2NhdGlvbi5wb3J0ICE9PSAnNDQzJyA/IGxvY2F0aW9uLnBvcnQgOiAnJykgLy8gQXBwZW5kIHRoZSBwb3J0IG9ubHkgd2hlbiBpdCdzIG5vdCB0aGUgZGVmYXVsdCBQb3J0XHJcbiAgICAgICAgKyAoL15cXC8vLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpID8gbG9jYXRpb24ucGF0aG5hbWUgOiAnLycgKyBsb2NhdGlvbi5wYXRobmFtZSk7XHJcbn0iXX0=