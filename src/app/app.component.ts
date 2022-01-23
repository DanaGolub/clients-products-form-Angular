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
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{orderedProduct.totalToPay}} 
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

  `
})
export class AppComponent {

  clientFuncRef!: Function;
  productFuncRef!: Function;
  operations!:    Array<any>;
  dataFromClient!: string;
  dataFromProduct!: string;
  orderedProductsArray!: Array<any>;

  removeItem(item: any) {
    for (var i = 0; i < this.orderedProductsArray.length; i++) {
      if (this.orderedProductsArray[i].id == item.id) {
        this.orderedProductsArray.splice(i, 1); // remove 1 item at ith place
      }
    }
  }

  public ngOnInit() { 
    this.clientFuncRef = this.clientCallBackFunction.bind(this);
    this.productFuncRef = this.productCallBackFunction.bind(this);
    this.orderedProductsArray = [];
  }

  // This function can be called by child.
  public clientCallBackFunction(firstName:string, lastName:string, streetAddress:string) {
    this.dataFromClient = 
          "Order for " + firstName + " " + lastName + " " + "at: " + "StreetAddress: " + streetAddress;
  }

  public productCallBackFunction(quantity:number, productName:string, productsToAdd: Array<any>) {

    for (var i = 0; i < productsToAdd.length; i++) {
      if (productsToAdd[i].item == productName) {
          let newItem = {
          'item': productsToAdd[i].item,
          'price': productsToAdd[i].price,
          'num': quantity,
          'totalToPay': productsToAdd[i].price * quantity, 
          'id': i + 1,
        }

        this.orderedProductsArray.push(newItem)
      }
}
console.log(this.orderedProductsArray)
}


}
