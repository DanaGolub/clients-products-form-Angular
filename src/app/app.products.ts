import { Component, Input } from '@angular/core';

@Component({
    selector: 'productForm',
    template: `
    <table>
    <tr>
        <td></td>
        <td></td>
        <td>
        <button (click)="submitProductInput()">Add item</button></td>
        <td><select [(ngModel)]="productName">
       <option *ngFor="let p of productsToAdd">
           {{p.item}}
        </option>
    </select></td>
        <td>Qty</td>
        <td>&nbsp;&nbsp;</td>
        <td><input type='text' [(ngModel)]="productQuantity"></td>
    </tr>
    </table>
  `
})
export class ProductComponent {
    productQuantity!: number;

    @Input()
    productName!: string;

    //////////////////////////
    quantityOfItems!: any;
    productsToAdd: Array<any>;

    constructor() {
        this.productsToAdd =
            [{ 'item': 'Apples', 'price': 3.00 },
            { 'item': 'Peaches', 'price': 4.00 },
            { 'item': 'Pears', 'price': 2.00 },
            { 'item': 'Plums', 'price': 5.00 },
            ];
    }

    // @Input()
    // lastName!: string;

    // VARIABLES FOR DROPDOWN

    @Input()  // Reference to parent function. Ref provided by parent.
    callParentFromProduct!: Function;

    submitProductInput() {
        this.callParentFromProduct(this.productQuantity, this.productName, this.productsToAdd);
    }
}
