const foodColor = "#DB4437";
const bodyColor = "#000";
const headColor = "#AAA";
export class Cell {
    constructor(DOMelement) {
        this.isBody = false;
        this.isHead = false;
        this.isFood = false;
        this.isBlank = true;
        DOMelement.style.backgroundColor = "";
        // DOMelement.style.borderColor = borderColor;
    }
    setBlank(DOMelement) {
        this.isBody = false;
        this.isHead = false;
        this.isFood = false;
        this.isBlank = true;
        DOMelement.style.backgroundColor = "";
        // DOMelement.style.borderColor = borderColor;
    }
    setHead(DOMelement) {
        this.isBody = false;
        this.isHead = true;
        this.isFood = false;
        this.isBlank = false;
        DOMelement.style.backgroundColor = headColor;
        // DOMelement.style.borderColor = borderColor;
    }
    setBody(DOMelement) {
        this.isBody = true;
        this.isHead = false;
        this.isFood = false;
        this.isBlank = false;
        DOMelement.style.backgroundColor = bodyColor;
        // DOMelement.style.borderColor = borderColor;
    }
    setFood(DOMelement) {
        this.isBody = false;
        this.isHead = false;
        this.isFood = true;
        this.isBlank = false;
        DOMelement.style.backgroundColor = foodColor;
        // DOMelement.style.borderColor = borderColor;
    }
}