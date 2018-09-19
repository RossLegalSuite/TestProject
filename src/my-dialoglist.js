
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import './shared-styles.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
class myDialogList extends PolymerElement {
  static get template() {
    return html`<style include="shared-styles">
    :host {
      display: block;
  
      padding: 10px;
    }
  </style>
  
  <vaadin-dialog id="dialog" opened>
    <template>
      <vaadin-grid id="dialogGrid" aria-label="Remote Data Example" data-provider="[[dataProvider]]" size="[[size]]" active-item="{{activeItem}}">
  
        <vaadin-grid-column width="60px" flex-grow="0">
          <template class="header">#</template>
          <template>[[index]]</template>
        </vaadin-grid-column>
  
        <vaadin-grid-column>
          <template class="header">First Name</template>
          <template>[[item.firstName]]</template>
        </vaadin-grid-column>
  
        <vaadin-grid-column>
          <template class="header">Last Name</template>
          <template>[[item.lastName]]</template>
        </vaadin-grid-column>
  
      </vaadin-grid>
    </template>
  </vaadin-dialog>

    `;
  }
  constructor() {
    super();

  }
  static get properties() {
    return {
      activeItem: {
        observer: '_activeItemChanged'
      }

    };
  }

  _activeItemChanged(item) {
    const grid = this.$.dialog.$.overlay.content.querySelector('vaadin-grid')
    grid.selectedItems = item ? [item] : [];
    
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

window.customElements.define('my-dialoglist', myDialogList);
