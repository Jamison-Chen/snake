const foodColor: string = "#DB4437";
const bodyColor: string = "#000";
const borderColor: string = "#AAA";
export class Cell {
    public isBody: boolean;
    public isFood: boolean;
    public constructor(DOMelement: HTMLElement) {
        this.isBody = false;
        this.isFood = false;
        DOMelement.style.backgroundColor = "";
        DOMelement.style.borderColor = borderColor;
    }
    public setBlank(DOMelement: HTMLElement): void {
        this.isBody = false;
        this.isFood = false;
        DOMelement.style.backgroundColor = "";
        DOMelement.style.borderColor = borderColor;
    }
    public setBody(DOMelement: HTMLElement): void {
        this.isBody = true;
        this.isFood = false;
        DOMelement.style.backgroundColor = bodyColor;
        DOMelement.style.borderColor = borderColor;
    }
    public setFood(DOMelement: HTMLElement): void {
        this.isBody = false;
        this.isFood = true;
        DOMelement.style.backgroundColor = foodColor;
        DOMelement.style.borderColor = borderColor;
    }
}