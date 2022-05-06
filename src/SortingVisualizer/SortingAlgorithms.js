
// bubble sort
export function bubbleSort(array) {
    let changes = [];
    for (let i=0;i<array.length;i++) {
        changes.push(['p']);
        for (let j=0;j<array.length-1;j++) {
            if (array[j] > array[j+1]) {
                changes.push([j,j+1]);
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }
    return changes;
}