
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import './shared-styles.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
class myDialog extends PolymerElement {
  static get template() {
    return html`<style include="shared-styles">
    :host {
      display: block;
  
      padding: 10px;
    }
  </style>
   <vaadin-button id="openDialog" theme="success primary" on-click="_openDialog">Open Filters</vaadin-button>
  <vaadin-dialog id="dialog">
    <template>
     <input value="Value will be Here">
     <vaadin-button id="openDialoglist" theme="success primary" on-click="_openDialoglist">...</vaadin-button>
     <my-dialoglist></my-dialoglist>
    </template>
  </vaadin-dialog>

    `;
  }
  constructor() {
    super();

  }
  static get properties() {
    return {
      
    };
  }
  _openDialog() {
    this.$.dialog.opened = true;
    
  }
  _openDialoglist() {
    import('./my-dialoglist.js');
    
  }


  ready() {
    super.ready();
    this.size = 200;
    this.dataProvider = function (params, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        callback(JSON.parse(xhr.responseText).result);
      };
      var index = params.page * params.pageSize;
      xhr.open('GET', 'https://demo.vaadin.com/demo-data/1.0/people?index=' + index + '&count=' + params.pageSize, true);
      xhr.send();
    };
  }

}

window.customElements.define('my-dialog', myDialog);
