import { Component, Input } from '@angular/core';

@Component({
  selector: 'clientForm',
  template: `
    <table>
    <tr>
        <td>First Name: </td>
        <td>&nbsp;&nbsp;</td>
        <td><input type='text' [(ngModel)]="firstName"></td>
    </tr>
    <tr>
        <td>Last Name: </td>
        <td>&nbsp;&nbsp;</td>
        <td><input type='text' [(ngModel)]="lastName"></td>
    </tr>
    <tr>
        <td>Street Address: </td>
        <td>&nbsp;&nbsp;</td>
        <td><input type='text' [(ngModel)]="streetAddress"></td>
    </tr>
    <tr>
        <td><input value="Submit Address" type="submit" (click)="submitClientInput()"/></td>
    </tr>
    <tr>
    <td>&nbsp;&nbsp;</td>
    </tr>
    </table>
  `
})
export class ClientComponent {
    streetAddress!: string;
    
    @Input()
    firstName!: string;

    @Input()
    lastName!: string;

    @Input()  // Reference to parent function. Ref provided by parent.
    callParentFromClient!: Function;

    submitClientInput() {
        this.callParentFromClient(this.firstName, this.lastName, this.streetAddress);
    }
}
