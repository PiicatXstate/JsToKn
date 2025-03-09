(function () {
    'use strict';

    setTimeout(() => {
        
        let state = true;
        let logo = document.getElementsByClassName('HeadBar_logo__z+RUw')[0];

        document.getElementsByClassName('HeadBar_logo__z+RUw')[0].addEventListener('click', function () {
            let blockbox = document.getElementById("BLINK_WORKSPACE");
            console.log('666');

            if (state == true) {
                // Code模式分支
                if (document.getElementById('JsToKn') == undefined) {
                    let bg = document.getElementsByClassName('ant-layout-header HeadBar_wrapper__vZYHC')[0];
                    bg.style.backgroundImage = 'url(http://127.0.0.1:3000/background.png)';
                    const title = document.getElementsByClassName('ant-input Input_inputNormal__XytVB WorkInput_input__D+YAd WorkInput_workNameInput__OHOO2')[0]
                    title.style.borderRadius = '8px'
                    title.style.background = 'midnightblue'
                    const save = document.getElementsByClassName('SaveButton_saveButton__h6tXk')[0]
                    save.style.borderRadius = '8px'
                    save.style.background = 'midnightblue'
                    const issue = document.getElementsByClassName('PublishButton_publishButton__SMvaJ')[0]
                    issue.style.borderRadius = '8px'
                    issue.style.background = 'midnightblue'
                    let bckg = document.getElementsByClassName('blocklyWorkspace')
                    bckg[0].id = 'background';
                    
                    const workspace2 = document.querySelector('#background');
                    if (workspace2) {
                        const iframe = document.createElement('iframe');
                        iframe.src = 'http://127.0.0.1:3002/main.html';
                        iframe.style.position = 'fixed';
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                        iframe.style.border = '0px solid black';
                        iframe.style.display = 'none'; // 初始隐藏
                        iframe.id = "JsToKn";

                        function updateIframeSize() {
                            const rect = workspace2.getBoundingClientRect();
                            iframe.style.width = rect.width + 'px';
                            iframe.style.height = rect.height + 'px';
                            iframe.style.left = rect.left + 'px';
                            iframe.style.top = rect.top + 'px';
                            console.log('Update iframe size:', iframe.style.width, iframe.style.height, iframe.style.display);
                        }

                        updateIframeSize();
                        const observer = new MutationObserver(updateIframeSize);
                        const config = { attributes: true, childList: true, subtree: true };
                        observer.observe(workspace2, config);

                        document.body.appendChild(iframe);
                    }
                }
                let b = document.getElementById('JsToKn');
                if (b) {
                    b.style.display = 'block'; // 确保设置为可见
                }

                // 清空Blocks 
                const blocklySvgWorkspace = document.getElementsByClassName('blocklySvg __web-inspector-hide-shortcut__')[0];
                if (blocklySvgWorkspace) {
                    blocklySvgWorkspace.querySelectorAll('*').forEach(el => {
                        el.style.display = 'none';
                    });
                }
                const verticalScrollbar = document.getElementsByClassName('blocklyScrollbarVertical blocklyMainWorkspaceScrollbar')[0];
                if (verticalScrollbar) {
                    verticalScrollbar.querySelectorAll('*').forEach(el => {
                        el.style.display = 'none';
                    });
                }
                const horizontalScrollbar = document.getElementsByClassName('blocklyScrollbarHorizontal blocklyMainWorkspaceScrollbar')[0];
                if (horizontalScrollbar) {
                    horizontalScrollbar.querySelectorAll('*').forEach(el => {
                        el.style.display = 'none';
                    });
                }
                const redoUndoRunner = document.getElementsByClassName('redoUndo-runner')[0];
                if (redoUndoRunner) {
                    redoUndoRunner.querySelectorAll('*').forEach(el => {
                        el.style.display = 'none';
                    });
                }
                const consolespace = document.getElementsByClassName('ConsolePanel_wrapper__jF9qq ConsolePanel_hiddenPcContainer__pPVj6 ConsolePanel_pc__D31iO')[0];
                if (consolespace) {
                    consolespace.querySelectorAll('*').forEach(el => {
                        el.style.display = 'none';
                    });
                }
                
                state = false;


            } else {
                // Blocks模式分支
                // 还原Blocks
                const blocklySvgWorkspace = document.getElementsByClassName('blocklySvg __web-inspector-hide-shortcut__')[0];
                if (blocklySvgWorkspace) {
                    blocklySvgWorkspace.querySelectorAll('*').forEach(el => {
                        el.style.display = '';
                    });
                }
                const verticalScrollbar = document.getElementsByClassName('blocklyScrollbarVertical blocklyMainWorkspaceScrollbar')[0];
                if (verticalScrollbar) {
                    verticalScrollbar.querySelectorAll('*').forEach(el => {
                        el.style.display = '';
                    });
                }
                const horizontalScrollbar = document.getElementsByClassName('blocklyScrollbarHorizontal blocklyMainWorkspaceScrollbar')[0];
                if (horizontalScrollbar) {
                    horizontalScrollbar.querySelectorAll('*').forEach(el => {
                        el.style.display = '';
                    });
                }
                const redoUndoRunner = document.getElementsByClassName('redoUndo-runner')[0];
                if (redoUndoRunner) {
                    redoUndoRunner.querySelectorAll('*').forEach(el => {
                        el.style.display = '';
                    });
                }
                const consolespace = document.getElementsByClassName('ConsolePanel_wrapper__jF9qq ConsolePanel_hiddenPcContainer__pPVj6 ConsolePanel_pc__D31iO')[0];
                if (consolespace) {
                    consolespace.querySelectorAll('*').forEach(el => {
                        el.style.display = '';
                    });
                }
                
                let b = document.getElementById('JsToKn');
                if (b) {
                    b.style.display = 'none';
                }
                state = true;
            }
        });
    }, 1000);
})();