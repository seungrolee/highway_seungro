import TemplateElement from "../util/TemplateElement.js";

class Modal extends TemplateElement {
  constructor() {
    super({
      template: `
        <div class="modal">
          <div class="modal-backdrop"></div>
          <div class="modal-main box-shadow-s">
            <div class="modal-title">&nbsp;</div>
            <div class="modal-body">&nbsp;</div>
            <div class="modal-footer">
              <div class="button-wrap flex align-right">
                <button class="cancel-btn">취소</button>
                <button class="submit-btn">확인</button>
              </div>
            </div>
          </div>
        </div>
      `,
      templateHandler: () => {
        this.head = this.fromTemplate(".modal-title");
        this.content = this.fromTemplate(".modal-body");
        this.cancleBtn = this.fromTemplate(".cancel-btn");
        this.submitBtn = this.fromTemplate(".submit-btn");

        this.cancleBtn.addEventListener("click", () => {
          let parent = this.body.parentElement;
          parent.removeChild(this.body);
        });

        this.body.removeSubmitAction = (callback) => {
          this.submitBtn.removeEventListener(callback);
        };

        this.body.close = () => {
          let parent = this.body.parentElement;
          parent.removeChild(this.body);
        };

        this.body.onSubmit = this.onSubmit;
        document.body.appendChild(this.body);
      },
      childHandler: (addedNode) => {
        this.content.innerHTML = "";
        this.content.appendChild(addedNode);
      },
      dataHandler: {
        title: (newVal) => {
          this._title = newVal;
          this.head.textContent = newVal;
        },
      },
    });
  }

  onSubmit(callback) {
    this.submitBtn.addEventListener("click", callback);
  }

  close() {
    let parent = this.body.parentElement;
    parent.removeChild(this.body);
  }

  static newInstance(id, title, content, callback) {
    let a = new Modal();
    a.setAttribute("id", id);
    a.dataset.title = title;
    a.innerHTML = content;

    document.body.appendChild(a);

    if (typeof callback == "function") {
      a.onSubmit(callback.bind(a));
    }

    return a;
  }
}

croquis.newModal = ({ id, title, content, callback }) => {
  let m = Modal.newInstance(id, title, content, callback);

  return m;
};

croquis.define("modal-", Modal);

export default Modal;
