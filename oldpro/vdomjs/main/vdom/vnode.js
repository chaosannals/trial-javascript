export class VNode {
    constructor(tag, props, children) {
        this.tag = tag;
        this.props = props;
        this.children = children || [];
    }

    render() {
        let e = document.createElement(this.tag);
        for(let p in this.props) {
            let pv = this.props[p];
            e.setAttribute(p, pv);
        }
        for(let child of this.children) {
            let ce = child instanceof VNode
                ? child.render()
                : document.createTextNode(child);
            e.appendChild(ce);
        }
        return e;
    }
}

export default VNode;
