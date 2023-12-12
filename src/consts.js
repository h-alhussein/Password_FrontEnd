
export const BASE_URL = 'http://localhost:8082';
export const IMAGE_URL = 'http://localhost:8082/api/v1/images/';
export const PAGE_SIZE = 2;

export function COLORS() { return ["darkblue", "darkgreen", "darkred"]; }


export function formatDate(string) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(string).toLocaleDateString('de-DE', options);
}

export function formatDate2(string) {
    var options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
}
