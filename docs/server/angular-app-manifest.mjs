
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/freshcart/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/freshcart/home",
    "route": "/freshcart"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/home"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/cart"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/products"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/allorders"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/productdetails/*"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/categories"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/shippingaddress/*"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/forgetpassword"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/brands"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/login"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/register"
  },
  {
    "renderMode": 0,
    "route": "/freshcart/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 30488, hash: '19a94fa6a94a2559711e2136ba16596d8515034133cf4b138fe186661488d69c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1008, hash: '349eaf92bce70655320df68b632f5c7125cdf0545af27ff4a21820af9e2f585c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-GHY3DRW6.css': {size: 196328, hash: 'PfPTTIbg95U', text: () => import('./assets-chunks/styles-GHY3DRW6_css.mjs').then(m => m.default)}
  },
};
