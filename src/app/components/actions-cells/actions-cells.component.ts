import { Component } from '@angular/core';

@Component({
  selector: 'app-actions-cells',
  templateUrl: './actions-cells.component.html',
  styleUrls: ['./actions-cells.component.css']
})
export class ActionsCellsComponent {

  public params: any;
  public disableActions = false;
  items: any[] = [];


  agInit(params: any): void {
    this.params = params;
    if (this.params.disable != null) {
      this.changeDisable(params, params.disable);
    }

    if (this.params.actionsHaveConditions) {
      this.items = this.setConditionsOnItems(this.params.actions);
    }
  }

  public executeAction(action: any, $event: any): void {
    // Actions render conditionally
    if (this.params.actionsHaveConditions) {
      this.params.clicked({
        event: $event,
        rowData: this.params.node.data,
        action
      });
      return;
    }

    // Default
    console.log('action: ', action);
    console.log('$event: ', $event);
    if (action.function instanceof Function) {
      const paramsFunction = {
        event: $event,
        rowData: this.params.node.data
      };
      action.function(paramsFunction);
    }
  }

  refresh(): boolean {
    return false;
  }

  private changeDisable(params: any, disable: any): void {
    const parameters: any = [];
    disable.fields.forEach((field: any) => {
      parameters.push(params[field]);
    });
    this.disableActions = disable.callBack(...parameters);
  }

  setConditionsOnItems(actions: any[]): any[] {
    actions.forEach(option => {
      option.visible = option.checkShowOption ? option.checkShowOption(this.params.node) : true;
    });
    return JSON.parse((JSON.stringify(actions)));
  }

  isDisable(action: any): boolean {
    return action.disable != null ? action.disable(this.params.data): false;
  }
}
