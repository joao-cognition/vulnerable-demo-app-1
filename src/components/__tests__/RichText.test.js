/**
 * @jest-environment jsdom
 */
const Vue = require("vue/dist/vue.common.js");

const RichTextComponent = {
  name: "RichText",
  props: {
    html: {
      type: String,
      required: true,
    },
  },
  template: '<section class="rich-text"><div class="content" v-html="html"></div></section>',
};

describe("RichText component", () => {
  it("should have the correct component name", () => {
    expect(RichTextComponent.name).toBe("RichText");
  });

  it("should require the html prop as a String", () => {
    expect(RichTextComponent.props.html.required).toBe(true);
    expect(RichTextComponent.props.html.type).toBe(String);
  });

  it("should render html content via v-html", () => {
    const vm = new Vue({
      render(h) {
        return h(RichTextComponent, { props: { html: "<p>Hello World</p>" } });
      },
    }).$mount();

    const content = vm.$el.querySelector(".content");
    expect(content.innerHTML).toBe("<p>Hello World</p>");
  });

  it("should wrap content in a section.rich-text element", () => {
    const vm = new Vue({
      render(h) {
        return h(RichTextComponent, { props: { html: "<span>Test</span>" } });
      },
    }).$mount();

    expect(vm.$el.tagName).toBe("SECTION");
    expect(vm.$el.classList.contains("rich-text")).toBe(true);
  });

  it("should render raw HTML including nested elements", () => {
    const complexHtml = '<ul><li>Item 1</li><li>Item 2</li></ul>';
    const vm = new Vue({
      render(h) {
        return h(RichTextComponent, { props: { html: complexHtml } });
      },
    }).$mount();

    const items = vm.$el.querySelectorAll("li");
    expect(items.length).toBe(2);
  });
});
