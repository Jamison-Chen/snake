export class Graph {
    public graph: object;
    public constructor(nodes: number[][], edgesAndCosts: { n1: number[], n2: number[], costs: number }[]) {
        this.graph = {};
        for (let i = 0; i < nodes.length; i++) {
            this.graph[String(nodes[i])] = {};
        }
        edgesAndCosts.forEach(each => {
            this.graph[String(each.n1)][String(each.n2)] = each.costs;
            this.graph[String(each.n2)][String(each.n1)] = each.costs;
        });
    }
    public getCosts(n1: number[], n2: number[]): number {
        if (this.graph[String(n1)][String(n2)] != 0) {
            return this.graph[String(n1)][String(n2)];
        } else if (n1[0] == n2[0] && n1[1] == n2[1]) {
            return 0;
        }
        return Infinity;
    }
}
