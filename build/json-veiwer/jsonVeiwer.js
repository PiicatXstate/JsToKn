(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.JSONViewer = factory());
})(this, function () {
    'use strict';

    const defaultStyles = `
        .json-viewer {
            font-family: 'consolas';
            font-size:13px;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 4px;
        }
        .json-key { color: #92278f; }
        .json-string { color: #3ab54a; }
        .json-number { color: #25aae2; }
        .json-boolean { color: #f98280; }
        .json-null { color: #f1592a; }
        .json-toggle { 
            cursor: pointer; 
            margin-right: 6px;
            display: inline-block;
            width: 10px;
            color: rgba(0,0,0,0.2);
            font-size: 8px;
            font-family: '';
        }
        .json-collapsed { color: #666; }
        .json-hidden { display: none; }
    `;

    class JSONViewer {
        constructor(options = {}) {
            this.options = {
                container: '#json-container',
                theme: 'default',
                expandDepth: 1,
                ...options
            };
            
            this._injectStyles();
            this.init();
        }

        _injectStyles() {
            if (!document.querySelector('#json-viewer-styles')) {
                const style = document.createElement('style');
                style.id = 'json-viewer-styles';
                style.textContent = defaultStyles;
                document.head.appendChild(style);
            }
        }

        init() {
            this.container = document.querySelector(this.options.container);
            if (!this.container) {
                console.error(`Container ${this.options.container} not found`);
                return;
            }
            this.container.classList.add('json-viewer');
        }

        show(data) {
            this.container.innerHTML = '';
            this._parseObject(data, this.container, 0);
        }

        destroy() {
            this.container.innerHTML = '';
        }

        _createItem(value, isCollapsible = false) {
            const elem = document.createElement('div');
            elem.className = 'json-item';
            
            if (isCollapsible) {
                const toggle = document.createElement('span');
                toggle.className = 'json-toggle';
                toggle.innerHTML = '▶';
                toggle.addEventListener('click', () => this._toggleCollapse(elem));
                elem.appendChild(toggle);
            }
            
            return elem;
        }

        _toggleCollapse(element) {
            const toggle = element.querySelector('.json-toggle');
            const children = element.querySelector('.json-children');
            children.classList.toggle('json-hidden');
            toggle.innerHTML = children.classList.contains('json-hidden') ? '▶' : '▼';
        }

        _formatValue(value) {
            const type = typeof value;
            const elem = document.createElement('span');
            
            if (value === null) {
                elem.className = 'json-null';
                elem.textContent = 'null';
            } else if (Array.isArray(value)) {
                elem.textContent = `Array(${value.length})`;
            } else if (type === 'object') {
                elem.textContent = 'Object';
            } else if (type === 'string') {
                elem.className = 'json-string';
                elem.textContent = `"${value}"`;
            } else if (type === 'number') {
                elem.className = 'json-number';
                elem.textContent = value;
            } else if (type === 'boolean') {
                elem.className = 'json-boolean';
                elem.textContent = value ? 'true' : 'false';
            }
            
            return elem;
        }

        _parseObject(obj, parentElement, level = 0) {
            Object.entries(obj).forEach(([key, value]) => {
                const isObject = typeof value === 'object' && value !== null;
                const item = this._createItem(value, isObject);
                item.style.marginLeft = `${level * 20}px`;

                // Add key
                const keyElem = document.createElement('span');
                keyElem.className = 'json-key';
                keyElem.textContent = `${key}: `;
                item.appendChild(keyElem);

                // Add value
                const valueElem = this._formatValue(value);
                item.appendChild(valueElem);

                // Add children
                if (isObject) {
                    const children = document.createElement('div');
                    children.className = 'json-children';
                    if (level >= this.options.expandDepth) {
                        children.classList.add('json-hidden');
                    }
                    this._parseObject(value, children, level + 1);
                    item.appendChild(children);
                }

                parentElement.appendChild(item);
            });
        }
    }

    return JSONViewer;
});