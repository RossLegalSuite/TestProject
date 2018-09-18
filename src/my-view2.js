
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import './shared-styles.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';

class MyView2 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
      <vaadin-button on-click="test"></vaadin-button>
      <vaadin-grid id="grid" data-provider="[[dataProvider]]"  size="[[size]]">

<vaadin-grid-column >
     <template class="header">
         <vaadin-grid-sorter path="RowID">RowID</vaadin-grid-sorter>
     </template>
     <template>
     <vaadin-checkbox aria-label="Select Row" checked="{{selected}}" value="[[item.RowID]]" ID="CheckBoxGrid"></vaadin-checkbox>
    
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column>

     <template class="header">

         <vaadin-grid-sorter path="fileRef" direction="asc">File Ref</vaadin-grid-sorter>
     </template>
     <template>
         [[item.FileRef]]
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column>
     <template class="header">
         <vaadin-grid-sorter path="description" >Description</vaadin-grid-sorter>
     </template>
  <template>
         [[item.Description]]
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column>
     <template class="header">
         <vaadin-grid-sorter path="BelongsTo" >BelongsTo</vaadin-grid-sorter>
     </template>
  <template>
         [[item.BelongsTo]]
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column >
     <template class="header">
         <vaadin-grid-sorter path="Client" >Client</vaadin-grid-sorter>
     </template>
  <template>
         [[item.Client]]
     </template>
 </vaadin-grid-column>
 <vaadin-grid-column >
     <template class="header">
         <vaadin-grid-sorter path="TheirRef" >TheirRef</vaadin-grid-sorter>
     </template>
  <template>
         [[item.TheirRef]]
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column >
     <template class="header">
         <vaadin-grid-sorter path="MatterType" >MatterType</vaadin-grid-sorter>
     </template>
  <template>
         [[item.MatterType]]
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column >
     <template class="header">
         <vaadin-grid-sorter path="LinkedMatter" >LinkedMatter</vaadin-grid-sorter>
     </template>
  <template>
         [[item.LinkedMatter]]
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column>
     <template class="header">
         <vaadin-grid-sorter path="Instructed" >Instructed</vaadin-grid-sorter>
     </template>
  <template>
         [[item.Instructed]]
     </template>
 </vaadin-grid-column>

 <vaadin-grid-column>
     <template class="header">
         <vaadin-grid-sorter path="DocumentSet" >DocumentSet</vaadin-grid-sorter>
     </template>
  <template>
         [[item.DocumentSet]]
     </template>
 </vaadin-grid-column>

</vaadin-grid>
<vaadin-grid-column id="rowIDD">
      <template id="rowID">
         [[item.RowID]] 
     </template>
 </vaadin-grid-column>

<my-dialog></my-dialog>
          </div>
    `;
  }
  constructor() {
    super();
    this.pageObject = {
      "pageNumber": 0,
      "pageLength": 0
  };

}
  static get properties() {
    return {
      pageObject: Object,
      filterObject: {
          type: Object,

      }   
       
    };
}

  test(){
    import('./Dialog.js');

  }

  ready() {
    super.ready();
    this.size = 2000;

    let that = this;
    this.dataProvider = function (params, callback) {

      var url = 'http://www.legalsuiteonline.co.za/ApiService.svc/matters'
      var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        };
        xhr.open('GET', url, true);
        that.pageObject.pageNumber = params.page;
            that.pageObject.pageLength = params.pageSize;
        // if (that.$.browseFilters.filterObject.filters.length !== 0) {
        //     console.log("apiObject was sent");

        //     xhr.setRequestHeader("filter", JSON.stringify(that.apiObject));

        // } else {
        xhr.setRequestHeader("filter", JSON.stringify(that.pageObject));
        // }
        xhr.send();
    };
}
}

window.customElements.define('my-view2', MyView2);
