import { LitElement } from "card-tools/src/lit-element";
import {lovelace} from "card-tools/src/hass";
import {createCard} from "card-tools/src/lovelace-element";

class QCard extends LitElement {

  setConfig(config) {
    this.name = config.card;
    this.localname = `__local_${lovelace().current_view}_${config.card}`;
    if(!window.qCards)
      window.qCards = {};

    const globals = lovelace().config.q_cards;
    const locals = lovelace().config.views[lovelace().current_view].q_cards;

    if(globals && globals[this.name] && !window.qCards[this.name]) {
      window.qCards[this.name] = createCard(globals[this.name]);
    }
    if(locals && locals[this.name] && !window.qCards[this.localname]) {
      window.qCards[this.localname] = createCard(locals[this.name]);
    }

    window.addEventListener("location-changed", () => this.update());
    this.update();
  }

  connectedCallback() {
    this.update();
  }

  update() {
    window.setTimeout(() => {
      if(!window.qCards || Object.keys(window.qCards).length === 0) return;
      if(!this.shadowRoot.firstElementChild && this.offsetParent)
        this.shadowRoot.appendChild(window.qCards[this.localname]
          || window.qCards[this.name]);
      if(this.shadowRoot.firstElementChild) this.shadowRoot.firstElementChild.hass = this._hass;
    }, 1);
  }

  set hass(hass) {
    this._hass = hass;
    this.update();
  }
}

if(!customElements.get("q-card"))
  customElements.define("q-card", QCard);
