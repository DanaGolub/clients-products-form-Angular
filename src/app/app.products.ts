import { Component, Input } from '@angular/core';

@Component({
  selector: 'productForm',
  template: `
    <table>
    <tr>
        <td></td>
        <td></td>
        <td><input value="Add Item" type="submit" text="Add Item" (click)="submitProductInput()"/></td>

        <td>&nbsp;&nbsp;</td>
        <!-- THIS WILL BE THE DROPDOWN -->
        <!-- <td><input type='text' [(ngModel)]="firstName"></td> -->
        <td>Qty</td>
        <td>&nbsp;&nbsp;</td>
        <td><input type='text' [(ngModel)]="productQuantity"></td>
    </tr>
    </table>
  `
})
export class ProductComponent {
    productQuantity!: number;
    
    // @Input()
    // firstName!: string;

    // @Input()
    // lastName!: string;

    // VARIABLES FOR DROPDOWN

    @Input()  // Reference to parent function. Ref provided by parent.
    callParentFromProduct!: Function;

    submitProductInput() {
        this.callParentFromProduct(this.productQuantity);
    }
}
