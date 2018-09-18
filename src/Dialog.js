
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import './shared-styles.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
class dialog extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

   <vaadin-dialog opened>

      <vaadin-grid  id="employeeFilterListGrid" data-provider="[[dataProviderEmployee]]" size="[[size]]">

<vaadin-grid-column id="rowIDD">
      <template id="rowID">
         [[item.RowID]] 
     </template>
 </vaadin-grid-column>


          </vaadin-dialog>
    `;
  }
  constructor() {
    super();
    this.EmployeePageObject = {
        "pageNumber": 0,
        "pageLength": 0
    };

}
  static get properties() {
    return {
      EmployeePageObject: Object,
      filterObject: {
          type: Object,

      }   
       
    };
}

  _test(){

  }

  ready() {
    super.ready();
    this.size = 2000;

    let that = this;
    this.dataProviderEmployee = function (params, callback) {

        var url = 'http://www.legalsuiteonline.co.za/ApiService.svc/Employees/Filter'
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        };
        xhr.open('GET', url, true);
        that.EmployeePageObject.pageNumber = params.page;
        that.EmployeePageObject.pageLength = params.pageSize;
        // if (that.$.browseFilters.filterObject.filters.length !== 0) {
        //     console.log("apiObject was sent");

        //     xhr.setRequestHeader("filter", JSON.stringify(that.apiObject));

        // } else {
        xhr.setRequestHeader("filter", JSON.stringify(that.EmployeePageObject));
        // }
        xhr.send();
    };
}
}

window.customElements.define('my-dialog', dialog);
