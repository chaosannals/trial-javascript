import VNode from './vdom/vnode.js';

export default {
  install(app) {
    app.config.globalProperties.$vnode = VNode;
  },
};
