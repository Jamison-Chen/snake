const foodColor = "#DB4437";
const bodyColor = "#000";
const borderColor = "#AAA";
export class Cell {
    constructor(DOMelement) {
        this.isBody = false;
        this.isFood = false;
        DOMelement.style.backgroundColor = "";
        DOMelement.style.borderColor = borderColor;
    }
    setBlank(DOMelement) {
        this.isBody = false;
        this.isFood = false;
        DOMelement.style.backgroundColor = "";
        DOMelement.style.borderColor = borderColor;
    }
    setBody(DOMelement) {
        this.isBody = true;
        this.isFood = false;
        DOMelement.style.backgroundColor = bodyColor;
        DOMelement.style.borderColor = borderColor;
    }
    setFood(DOMelement) {
        this.isBody = false;
        this.isFood = true;
        DOMelement.style.backgroundColor = foodColor;
        DOMelement.style.borderColor = borderColor;
    }
}
