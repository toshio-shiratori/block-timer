<my-footer>

  <footer style={ myStyle }>
    <p><a href="https://sastd.com/" target="_blank">© シンプルアップ工房</a></p>
  </footer>

  <style>
    :scope footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      /* Set the fixed height of the footer here */
      background: none;
      text-align: center;
      font-size: 10pt;
      right: 0px;
      background-color: #000000;
    }
    :scope footer p {
      margin-top: 8px;
    }
    :scope footer p a {
      color: #7f8c8d;
      border: 1px solid #7f8c8d;
      width: 80%;
      margin: 0 auto;
      padding: 5px 20px;
      border-radius: 3px;
      margin-top: 8px;
      text-decoration: none;
    }
  </style>

  <script>
    const myTagName = TAG_CONTENT_FOOTER
    var self = this

    self.myStyle = {
      height: opts.height+'px'
    }    
  </script>

</my-footer>