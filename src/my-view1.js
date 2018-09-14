
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import './shared-styles.js';
import '@polymer/iron-ajax/iron-ajax.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <vaadin-button theme="success primary" on-click="_test"></vaadin-button>
 

      <iron-ajax auto url="https://demo.vaadin.com/demo-data/1.0/people?count=200" handle-as="json" last-response="{{users}}"></iron-ajax>

<!-- The array is set as the <vaadin-grid>'s "items" property -->
<vaadin-grid id="grid" aria-label="Basic Binding Example" items="[[users.result]]">

  <vaadin-grid-column width="50px" flex-grow="0">
    <template class="header">#</template>
    <template>[[index]]</template>
  </vaadin-grid-column>

  <vaadin-grid-column>
        <template>
          <vaadin-checkbox aria-label="Select Row" checked="{{selected}}"  ID="[[item.firstName]]">[[item.firstName]]</vaadin-checkbox>
        </template>
      </vaadin-grid-column>
  
  <vaadin-grid-column>
    <template class="header">Last Name</template>
    <template>[[item.lastName]]</template>
  </vaadin-grid-column>

  <vaadin-grid-column width="150px">
    <template class="header">Address</template>
    <template>
      <p style="white-space: normal">[[item.address.street]], [[item.address.city]]</p>
    </template>
  </vaadin-grid-column>
 
</vaadin-grid>


          </div>
    `;
  }

  
  _test(){
    //This part I need to get right
    this.$.grid.selectItem("Grace");;
  }

  
}

window.customElements.define('my-view1', MyView1);
