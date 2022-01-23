import { Component } from '@angular/core';

// This component consumes the re-usable service.
@Component({
  selector: 'app-root',
  template: `

  <clientForm [callParentFromClient]="clientFuncRef"></clientForm>
  <productForm [callParentFromProduct]="productFuncRef"></productForm >
  {{dataFromClient}}
  {{dataFromProduct}}
  `
})
export class AppComponent {

  clientFuncRef!: Function;
  productFuncRef!: Function;
  operations!:    Array<any>;
  dataFromClient!: string;
  dataFromProduct!: string;
  

  // This function is called by the Angular framework after
  // the constructor executes.
  public ngOnInit() { 
    this.clientFuncRef = this.clientCallBackFunction.bind(this);
    this.productFuncRef = this.productCallBackFunction.bind(this);
  }

  // This function can be called by child.
  public clientCallBackFunction(firstName:string, lastName:string, streetAddress:string) {
    this.dataFromClient = 
          "FName: " + firstName + "   " +
          "LName: " + lastName + "   " +
          "StreetAddress: " + streetAddress;
  }

  public productCallBackFunction(quantity:number, productName:string) {
    this.dataFromProduct = 
          "Product Chosen: " + productName + " " +
          "quantity: " + quantity;
  }
}
