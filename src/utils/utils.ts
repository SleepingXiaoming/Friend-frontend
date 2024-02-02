export function copy(value: any) {
    navigator.clipboard.writeText(value).then(function (text) {
        console.debug(text);
    });
}
