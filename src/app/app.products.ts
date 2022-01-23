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
    // testItem2!: any;
    items: Array<any>;
    productsToAdd: Array<any>;

    constructor() {
        this.items = [];
        this.productsToAdd =
            [{ 'item': 'Apples', 'price': 3.99 },
            { 'item': 'Peaches', 'price': 4.99 },
            { 'item': 'Pears', 'price': 2.99 },
            { 'item': 'Plums', 'price': 5.99 },
            ];
    }

    // @Input()
    // lastName!: string;

    // VARIABLES FOR DROPDOWN

    @Input()  // Reference to parent function. Ref provided by parent.
    callParentFromProduct!: Function;

    submitProductInput() {
        this.callParentFromProduct(this.productQuantity, this.productName);
    }
}

// <select id="productName">
// <!-- <select formControlName="country"> -->
// <!-- <option [ngValue]="null" disabled>Select Country</option> -->
// <!-- <option *ngFor="let product of product" [ngValue]="product.item">{{product.item}}</option> -->
// <option [ngValue]="productName" value="Apples">Apples </option>
// <option [ngValue]="productName" value="Peaches">Peaches  </option>
// <option [ngValue]="productName" value="Pears">Pears  </option>
// <option [ngValue]="productName" value="Plums">Plums ></option>
// {{productName}}
// </select>
