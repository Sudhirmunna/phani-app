import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  // tslint:disable-next-line:variable-name
_panelData: any;
get panelData(): any {
    return this._panelData;
}

@Input('panelData')
set panelData(value: any) {
    this._panelData = value;
    this.updateForm(value);

}
orderForm: FormGroup;
items: FormArray;

constructor(private formBuilder: FormBuilder) {}

ngOnInit() {
  // this.orderForm = this.formBuilder.group({
  //   items: this.formBuilder.array([ this.createItem() ])
  // });
}

updateForm(value) {
  this.orderForm = this.formBuilder.group({
    items: this.formBuilder.array([ this.createItem() ])
  });
  this.items = this.orderForm.get('items') as FormArray;

  if (this.orderForm) {
    console.log('in loop');
    value.forEach(x => {
      // const item =
      console.log(x);
      const item = this.formBuilder.group({
        name: x.name,
        env: x.env,
        edit: false
      });
      this.items.push(item);
    });
  }
}

createItem(): FormGroup {
  return this.formBuilder.group({
    name: '',
    env: '',
    edit: true
  });
}
addItem(): void {
  this.items = this.orderForm.get('items') as FormArray;
  this.items.push(this.createItem());
}

editItem(i) {
  const editValue = ((this.orderForm.get('items') as FormArray).controls[i] as FormGroup).controls.edit.value;
  console.log(editValue);
  ((this.orderForm.get('items') as FormArray).controls[i] as FormGroup).controls.edit.setValue(!editValue);
}

canEdit(i) {
  const editValue = ((this.orderForm.get('items') as FormArray).controls[i] as FormGroup).controls.edit.value;
  return editValue;
}

getPanelData(i) {
  const nameValue = ((this.orderForm.get('items') as FormArray).controls[i] as FormGroup).controls.name.value;
  const envValue = ((this.orderForm.get('items') as FormArray).controls[i] as FormGroup).controls.env.value;
  const editValue = ((this.orderForm.get('items') as FormArray).controls[i] as FormGroup).controls.edit.value;
  const temp = { name: nameValue, env: envValue, edit: editValue};
  return temp;
}

save(orderForm) {
  // console.log(orderForm);
}

getArrayControls() {
  return (this.orderForm.get('items') as FormArray).controls;
}



}
