<template>
    <section class="rich-text">
      <div class="content" v-html="sanitizedHtml"></div>
    </section>
  </template>
  
  <script>
  import DOMPurify from 'dompurify';

  export default {
    name: "RichText",
    props: {
      html: {
        type: String,
        required: true,
      },
    },
    computed: {
      sanitizedHtml() {
        // Sanitize HTML to prevent XSS attacks
        // Only allow safe tags and attributes
        return DOMPurify.sanitize(this.html, {
          ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre', 'span', 'div'],
          ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
          ALLOW_DATA_ATTR: false,
          ADD_ATTR: ['target'],
          FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
          FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .rich-text .content { line-height: 1.6; }
  </style>
  