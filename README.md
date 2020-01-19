q-card
=================

<!--[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)-->

**EXPERIMENTAL**

Use the same lovelace card in multiple places (but only one at a time).

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

Install `q-card.js` as a `module`. Ignore all other files in this repo.

```yaml
resources:
  - url: /local/q-card.js
    type: module
```

## Usage

1. Define q-cards in `ui-lovelace.yaml`

    * Either globally:
      ```yaml
      title: My awesome lovelace configuration
      resources:
        - url: /local/q-card.js
          type: module
      q_cards:
        card1:
          type: entities
          entities:
            - light.bed_light
            - light.kitchen_lights
            - light.ceiling_lights
      views:
        ...
      ```

    * Or locally in a view
      ```yaml
        views:
          - title: My first view
            q_cards:
              card2:
                type: glance
                entities:
                  - light.bed_light
                  - light.kitchen_lights
                  - light.ceiling_lights
            cards:
              ...
      ```
      > Note: Local cards takes precedence.

2. Use the card:
    ```yaml
    views:
      - title: One view
        cards:
          - type: q-card
            card: card1
      - title: Another view
        cards:
          - type: q-card
            card: card1
    ```

The same card will now show up in both views.

So what? You can already do this with:

- [decluttering-card](https://github.com/custom-cards/decluttering-card)
- [lovelace_gen](https://github.com/thomasloven/hass-lovelace_gen)
- [YAML node anchors](https://github.com/thomasloven/hass-config/wiki/Misc-tricks#node-anchors)

What's the difference?

Well, the difference is that the **SAME** card will show up in both views.
It's not an equal card - it's actually the *very same* card being moved over from one view to another.

This has two main advantages (besides simplifying your configuration as the alternatives mentioned above do):

- Memory

  By only creating and loading a card once you can preserve some RAM and performance. This could also be a great advantage e.g. for [state-switch](https://github.com/thomasloven/lovelace-state-switch) and similar cards.

- Persistance.

  Say you have a card with a [fold-entity-row](https://github.com/thomasloven/lovelace-fold-entity-row) in it. Now, you can unfold that in one view, and when you move to another view, it's still unfolded.

This also means you can only have the same q-card visible once in the same browser window.

# FAQ

### What's Q for in the name?
Quantum. You know how quantum teleportation works and how quantum particles can be in two different places at the same time*.

This is nothing like that.

\* They can't _really_...

---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
