import VNode from './vdom/vnode.js';

export default {
  install(Vue) {
    Vue.property.$vnode = VNode;
  },
};
