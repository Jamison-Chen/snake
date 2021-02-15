import {
    Cell
} from './cell.js';
import {
    Graph
} from './graph.js';
const size = 20;
let grid;
// const borderColor = "#AAA";
let allNodes;
let allEdgesAndCosts;
let map;
let headPos = [9, 4];
let body = [
    [9, 2],
    [9, 3]
];
let storedTail;
let foodPos = [9, 15];
let stillAlive = true;
let direction = 4;


function test() {
    let a = [1, 2];
    let b = [1, 2];
    let c = [
        [1, 2],
        [3, 4]
    ];
    console.log(a == b);
    console.log(a[0] == b[0] && a[1] == b[1]);
    console.log(String(a) == String(b));
    console.log(JSON.parse(JSON.stringify(c)));
    // console.log(String([1, 2]));
}

// test();

function dijkstra() {
    let currentDistance = {};
    let currentPath = {};
    currentPath[String(headPos)] = [headPos];
    currentDistance[String(headPos)] = 0;
    let unsolved = JSON.parse(JSON.stringify(allNodes));
    unsolved = unsolved.filter(item => item[0] != headPos[0] || item[1] != headPos[1]);
    unsolved.forEach(
        function(each) {
            currentDistance[String(each)] = map.getCosts(each, headPos);
            if (map.getCosts(each, headPos) != Infinity) {
                currentPath[String(each)] = [headPos, each];
            }
        }
    );
    while (unsolved.length != 0) {
        let minD = Infinity;
        let w = null;
        unsolved.forEach(function(each) {
            if (currentDistance[String(each)] < minD) {
                w = each;
                minD = currentDistance[String(w)];
            }
        });
        if (w != null) {
            unsolved = unsolved.filter(item => item[0] != w[0] || item[1] != w[1]);
        } else {
            break;
        }
        for (let v in map.graph[String(w)]) {
            let intV0 = parseInt(v.split(",")[0]);
            let intV1 = parseInt(v.split(",")[1]);
            if (map.graph[String(w)][v] != 0 && unsolved.some(x => x[0] == intV0 && x[1] == intV1)) {
                let prev = currentDistance[v];
                currentDistance[v] = Math.min(prev, minD + map.getCosts(w, [intV0, intV1]));
                if (currentDistance[v] != prev) {
                    let newPath = JSON.parse(JSON.stringify(currentPath[String(w)]));
                    newPath.push([intV0, intV1]);
                    currentPath[v] = newPath;
                }
            }
        }
    }
    return {
        shortestD: currentDistance,
        shortestPath: currentPath
    };
}

function arrary2graphInfo(aGrid) {
    let n = [];
    let e = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!aGrid[i][j].isBody) {
                n.push([i, j]);
                if (j + 1 < size && !aGrid[i][j + 1].isBody) {
                    e.push({
                        n1: [i, j],
                        n2: [i, j + 1],
                        costs: 1
                    });
                }
                if (i + 1 < size && !aGrid[i + 1][j].isBody) {
                    e.push({
                        n1: [i, j],
                        n2: [i + 1, j],
                        costs: 1
                    });
                }
            }
        }
    }
    return {
        nodes: n,
        edgesAndCosts: e
    };
}

function setup() {
    initGridDOM();
    clearBoard();
    addAllEventListener();
}

function initGridDOM() {
    let divSideLen = 55 / size;
    for (let i = 0; i < size; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "each-row");
        for (let j = 0; j < size; j++) {
            let cellDiv = document.createElement("div");
            cellDiv.setAttribute("id", `${i},${j}`);
            cellDiv.setAttribute("class", "cell");
            cellDiv.style.width = `${divSideLen}%`;
            cellDiv.style.height = "0";
            cellDiv.style.paddingTop = `${divSideLen}%`;
            // cellDiv.style.transitionDuration = "250ms";
            if (i == 0) {
                cellDiv.style.borderTopWidth = "1px";
            }
            if (j == size - 1) {
                cellDiv.style.borderRightWidth = "1px";
                if (i == size - 1) {
                    cellDiv.style.borderRightWidth = "1px";
                }
            }
            rowDiv.appendChild(cellDiv);
        }
        let main = document.getElementById("main");
        main.appendChild(rowDiv);
    }
}

function clearBoard() {
    grid = new Array(size)
    for (let i = 0; i < size; i++) {
        grid[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            grid[i][j] = new Cell(document.getElementById(`${i},${j}`));
        }
    }
    initSnakeAndFood();
}

function addAllEventListener() {
    // document.addEventListener("keydown", moveSnake);
    // document.getElementById("clear-board-btn").onclick = clearBoard;
    document.getElementById("play-btn").onclick = startPlaying;
    // document.getElementById("computer-btn").onclick = createMaze;
}

function startPlaying() {
    // removeAllEventListener();
    loop();
    // addAllEventListener();
}

function createGraphStructure(aGrid) {
    let graphInfo = arrary2graphInfo(aGrid);
    allNodes = graphInfo.nodes;
    allEdgesAndCosts = graphInfo.edgesAndCosts;
    map = new Graph(allNodes, allEdgesAndCosts);
}

function loop() {
    if (stillAlive) {
        createGraphStructure(grid);
        let dijResult = dijkstra(); //Iterative Approach
        let shortestPath = dijResult.shortestPath[String(foodPos)];
        if (shortestPath != undefined) {
            if (shortestPath.length > 1) {
                if (shortestPath.length == 2) {
                    storedTail = [body[0][0], body[0][1]];
                }
                moveForward(dijResult.shortestPath[String(foodPos)]);
            } else if (shortestPath.length == 1) {
                growthUp();
                placeNewFood();
            }
        } else {
            // Go-Deep Strategy
            let shortestD = dijResult.shortestD;
            let maxD = 0;
            let maxTarget = null;
            for (let each in shortestD) {
                if (shortestD[each] >= maxD && shortestD[each] != Infinity) {
                    maxD = shortestD[each];
                    maxTarget = each;
                }
            }
            moveForward(dijResult.shortestPath[maxTarget]);
            // Random Strategy
            // let randomTargets = [];
            // if (headPos[0] > 0) {
            //     if (grid[headPos[0] - 1][headPos[1]].isBlank) {
            //         randomTargets.push([headPos[0] - 1, headPos[1]]);
            //     }
            // }
            // if (headPos[0] < size - 1) {
            //     if (grid[headPos[0] + 1][headPos[1]].isBlank) {
            //         randomTargets.push([headPos[0] + 1, headPos[1]]);
            //     }
            // }
            // if (headPos[1] > 0) {
            //     if (grid[headPos[0]][headPos[1] - 1].isBlank) {
            //         randomTargets.push([headPos[0], headPos[1] - 1]);
            //     }
            // }
            // if (headPos[1] < size - 1) {
            //     if (grid[headPos[0]][headPos[1] + 1].isBlank) {
            //         randomTargets.push([headPos[0], headPos[1] + 1]);
            //     }
            // }
            // moveForward([
            //     [],
            //     randomTargets[Math.floor(Math.random() * randomTargets.length)]
            // ]);
        }
        setTimeout(loop, 0);
    }
}

function moveForward(aPath) {
    if (!grid[aPath[1][0]][aPath[1][1]].isBody) {
        grid[headPos[0]][headPos[1]].setBody(document.getElementById(`${headPos[0]},${headPos[1]}`));
        body.push([headPos[0], headPos[1]]);
        headPos = [aPath[1][0], aPath[1][1]];
        grid[headPos[0]][headPos[1]].setHead(document.getElementById(`${headPos[0]},${headPos[1]}`));
        let removedBody = body.shift();
        grid[removedBody[0]][removedBody[1]].setBlank(document.getElementById(`${removedBody[0]},${removedBody[1]}`));
    } else {
        stillAlive = false;
    }
}

function growthUp() {
    grid[storedTail[0]][storedTail[1]].setBody(document.getElementById(`${storedTail[0]},${storedTail[1]}`));
    body.splice(0, 0, [storedTail[0], storedTail[1]]);
}

function placeNewFood() {
    let blankCells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j].isBlank) {
                blankCells.push([i, j]);
            }
        }
    }
    if (blankCells.length != 0) {
        let foodTarget = blankCells[Math.floor(Math.random() * blankCells.length)];
        grid[foodTarget[0]][foodTarget[1]].setFood(document.getElementById(`${foodTarget[0]},${foodTarget[1]}`));
        foodPos = [foodTarget[0], foodTarget[1]];
    } else {
        stillAlive = false;
    }

}

// function removeAllEventListener() {
//     document.removeEventListener("keydown", moveSnake);
//     // document.getElementById("clear-board-btn").onclick = null;
//     document.getElementById("play-btn").onclick = null;
//     document.getElementById("computer-btn").onclick = null;
// }

// function moveSnake(e) {
//     let nextHeadPos = headPos;
//     if (e.keyCode == '38') {
//         direction = 1;
//         nextHeadPos = [nextHeadPos[0] - 1, nextHeadPos[1]];
//     } else if (e.keyCode == '40') {
//         direction = 2;
//         nextHeadPos = [nextHeadPos[0] + 1, nextHeadPos[1]];
//     } else if (e.keyCode == '37') {
//         direction = 3;
//         nextHeadPos = [nextHeadPos[0], nextHeadPos[1] - 1];
//     } else if (e.keyCode == '39') {
//         direction = 4;
//         nextHeadPos = [nextHeadPos[0], nextHeadPos[1] + 1];
//     }
// }

function initSnakeAndFood() {
    grid[headPos[0]][headPos[1]].setHead(document.getElementById(`${headPos[0]},${headPos[1]}`));
    body.forEach(each => {
        grid[each[0]][each[1]].setBody(document.getElementById(`${each[0]},${each[1]}`))
    });
    grid[foodPos[0]][foodPos[1]].setFood(document.getElementById(`${foodPos[0]},${foodPos[1]}`));
}

setup();