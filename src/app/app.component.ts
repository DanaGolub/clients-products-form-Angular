import { Component } from '@angular/core';

// This component consumes the re-usable service.
@Component({
  selector: 'app-root',
  template: `

  <clientForm [callParentFromClient]="clientFuncRef"></clientForm>
  <productForm [callParentFromProduct]="productFuncRef"></productForm >
  {{dataFromClient}}
  {{dataFromProduct}}

  <table >
    <tr>
        <td></td>
        <td>&nbsp;&nbsp;</td>
        <td>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>&nbsp;&nbsp;Qty</td>
        <td>&nbsp;&nbsp;</td>
        <td>&nbsp;&nbsp;</td>
        <td>Unit Price</td>
        <td>&nbsp;&nbsp;</td>
        <td>&nbsp;&nbsp;</td>
        <td>Amount</td>
    </tr>
</table>

  <ul *ngFor="let orderedProduct of orderedProductsArray;let i = index">

<table>
    <tr>
      <td>
          {{orderedProduct.item}} 
      </td>
      <td>
      &nbsp;&nbsp;{{orderedProduct.num}} 
      </td>
      <td>
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{orderedProduct.price}} 
      </td>
      <td>
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{orderedProduct.totalSingleOrder}} 
      </td>
      <td>
      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='delete' (click)=removeItem(orderedProduct)>
      </td>
      </tr>
    </table>
  <!-- <li>{{orderedProduct.item}} {{orderedProduct.num}} {{orderedProduct.price}}  -->
    <!-- <input type='button' value='delete' (click)=removeItem(item)> -->
  <!-- </li> -->
  </ul>

  <table>
      <!-- this table should be hidden if there's no items in the new product array -->
      <tr>
        <td>Subtotal</td>
        <td> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td> &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td> {{this.totalFullOrderNoTax}}</td>
      </tr>
      <tr>
        <td>Taxes 7%</td>
        <td></td>
        <td></td>
        <td>{{this.totalTaxAmount}}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td></td>
        <td></td>
        <td>{{this.totalFullOrderWithTax}}</td>
      </tr>
    </table>

  `
})
export class AppComponent {

  clientFuncRef!: Function;
  productFuncRef!: Function;
  operations!: Array<any>;
  dataFromClient!: string;
  dataFromProduct!: string;
  orderedProductsArray!: Array<any>;
  totalFullOrderNoTax!: number;
  totalTaxAmount!: number;
  totalFullOrderWithTax!: number;
  tax!: number;
  globalCounter!: number;


  public ngOnInit() {
    this.clientFuncRef = this.clientCallBackFunction.bind(this);
    this.productFuncRef = this.productCallBackFunction.bind(this);
    this.orderedProductsArray = [];
    this.totalFullOrderNoTax = 0
    this.totalTaxAmount = 0
    this.totalFullOrderWithTax = 0
    this.tax = 0.07
    this.globalCounter = 0
  }

  removeItem(item: any) {
    for (var i = 0; i < this.orderedProductsArray.length; i++) {
      if (this.orderedProductsArray[i].id == item.id) {
        
        let totalSingleOrder = this.orderedProductsArray[i].price * this.orderedProductsArray[i].num
        this.totalFullOrderNoTax = this.totalFullOrderNoTax - totalSingleOrder
        this.totalTaxAmount = this.totalFullOrderNoTax * this.tax
        this.totalFullOrderWithTax = this.totalFullOrderNoTax + this.totalTaxAmount

        this.orderedProductsArray.splice(i, 1); // remove 1 item at ith place
      }
    }
    return this.totalFullOrderNoTax, this.totalTaxAmount, this.totalFullOrderWithTax
  }

  public clientCallBackFunction(firstName: string, lastName: string, streetAddress: string) {
    this.dataFromClient =
      "Order for " + firstName + " " + lastName + " " + "at: " + "StreetAddress: " + streetAddress;
  }

  public productCallBackFunction(quantity: number, productName: string, productsToAdd: Array<any>) {
    this.globalCounter = (this.globalCounter + 1)

    for (var i = 0; i < productsToAdd.length; i++) {
      if (productsToAdd[i].item == productName) {
        let totalSingleOrder = productsToAdd[i].price * quantity
        this.totalFullOrderNoTax += totalSingleOrder
        this.totalTaxAmount = this.totalFullOrderNoTax * this.tax
        this.totalFullOrderWithTax = this.totalFullOrderNoTax + this.totalTaxAmount

        let newItem = {
          'item': productsToAdd[i].item,
          'price': productsToAdd[i].price,
          'num': quantity,
          'totalSingleOrder': totalSingleOrder,
          'totalFullOrderNoTax': totalSingleOrder,
          'id': this.globalCounter,
          'totalTaxAmount': this.totalTaxAmount,
          'totalFullOrderWithTax': this.totalFullOrderWithTax
        }
        this.orderedProductsArray.push(newItem)
      }
    }
    console.log(this.orderedProductsArray)
  }


}
