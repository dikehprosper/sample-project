// SmartsuppChat.js
const SmartsuppChat = () => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = 'ec5a5afd5ee1df6eda98d539ac8d742c12cb972f';
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        `,
      }}
    />
    <noscript>
      {" "}
      Powered by{" "}
      <a href='https://www.smartsupp.com' target='_blank'>
        Smartsupp
      </a>
    </noscript>
  </>
);

export default SmartsuppChat;
