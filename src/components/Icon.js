import TemplateElement from "../util/TemplateElement.js";

class Icon extends TemplateElement {
  constructor() {
    super({
      template: `
        <span class="material-icons"></span>
      `,
      childHandler: (addedNode) => {
        this.body.textContent = addedNode;
      },
      dataHandler: {
        name: () => {
          this.body.textContent = addedNode;
        },
      },
    });
  }
}

croquis.define("icon-", Icon);

export default Icon;
