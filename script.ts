import { Cell } from './cell.js';
import { Graph } from './graph.js';
const size: number = 25;
let grid: Cell[][];
const borderColor = "#AAA";
let allNodes: number[][];
let allEdgesAndCosts: { n1: number[], n2: number[], costs: number }[];
let map: Graph;
let headPos: [number, number]
let foodPos: [number, number];
let currentPath: object;
let currentDistance: object;

function dijkstra(): void {
    let path = {};
    path[String(headPos)] = [headPos];
    let unsolved = JSON.parse(JSON.stringify(allNodes));
    unsolved = unsolved.filter(item => item != String(headPos));
    unsolved.forEach(
        function (each) {
            if (map.graph[each][String(headPos)] != 0) {
                currentDistance[each] = map.graph[each][String(headPos)];
                currentPath[each] = [String(headPos), each];
            } else {
                currentDistance[each] = Infinity
            }
        }
    );
    currentDistance[String(headPos)] = 0;
    while (unsolved.length != 0) { // && new Date().getTime() < countend
        let minD = Infinity;
        let w: null | string = null;
        unsolved.forEach(
            function (each) {
                if (currentDistance[each] < minD) {
                    w = each
                    minD = currentDistance[w]
                }
            }
        );
        if (w != null) {
            unsolved = unsolved.filter(item => item != w);
        } else {
            break;
        }
        for (let v in map.graph[w]) {
            if (map.graph[w][v] != 0 && unsolved.some(x => x == v)) {
                let prev = currentDistance[v];
                currentDistance[v] = Math.min(prev, minD + map.getCost(w, v));
                if (currentDistance[v] != prev) {
                    let newPath = JSON.parse(JSON.stringify(currentPath[w]));
                    newPath.push([v[0], v[1]]);
                    currentPath[v] = newPath;
                }
            }
        }
    }
}