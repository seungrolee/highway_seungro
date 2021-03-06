import TemplateElement from "../util/TemplateElement.js";

class Collapse extends TemplateElement {
  constructor() {
    super({
      template: `
        <div class="collapse">
          <button class="collapse-trigger">toggle</button>
          <div class="collapse-content"></div>
        </div>
      `,
      templateHandler: () => {
        this.head = this.fromTemplate(".collapse-trigger");
        this.content = this.fromTemplate(".collapse-content");
        this._height = 0;
        this._headHeight = 0;
        this._contentHeight = 0;
        this._closed = false;

        this.head.addEventListener("click", () => {
          this.body.classList.toggle("closed");

          this.getSizes();

          if (this._closed) {
            this.body.setAttribute("style", `height: ${this._height}px`);
          } else {
            this.body.setAttribute("style", `height: ${this._headHeight}px`);
          }

          this._closed = !this._closed;
        });
      },
      childHandler: (addedNode) => {
        this.content.appendChild(addedNode);

        setTimeout(() => {
          this.getSizes();

          if (this._closed) {
            this.body.setAttribute("style", `height: ${this._headHeight}px`);
          } else {
            this.body.setAttribute("style", `height: ${this._height}px`);
          }
        }, 1);
      },
      dataHandler: {
        closed: (newValue) => {
          this._closed = newValue;
        },
        title: (newValue) => {
          this._title = newValue;
          this.head.textContent = newValue;
          this._height = this._headHeight + this._contentHeight;
        },
      },
    });
  }

  getSizes() {
    let contentStyles = window.getComputedStyle(this.content);
    this._contentHeight = Number(
      contentStyles.getPropertyValue("height").replace("px", "")
    );

    contentStyles = window.getComputedStyle(this.head);
    this._headHeight = Number(
      contentStyles.getPropertyValue("height").replace("px", "")
    );

    this._height = this._headHeight + this._contentHeight;
  }
}

croquis.define("collapse-", Collapse);

export default Collapse;
