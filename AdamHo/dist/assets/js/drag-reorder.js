let draggedItem = null;
let placeholder = null;

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 991) { 
        initDragDrop();
    }
});

document.body.style.transition = "background-color 0.3s ease";

function initDragDrop() {
    let items = document.querySelectorAll('.col-list-item');
    items.forEach(item => {
        item.removeEventListener('dragstart', dragStartHandler);
        item.removeEventListener('dragend', dragEndHandler);
        item.removeEventListener('dragover', dragOverHandler);
        item.removeEventListener('dragleave', dragLeaveHandler);
        item.removeEventListener('drop', dropHandler);
    });

    items = document.querySelectorAll('.col-list-item');

    items.forEach(item => {
        item.setAttribute('draggable', 'true');

        item.querySelectorAll('*').forEach(child => {
            child.setAttribute('draggable', 'false');
        });
        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = "#f5f5f5";
        });
        item.addEventListener('mouseout', () => {
            item.style.backgroundColor = "";
        });
        item.addEventListener('dragstart', dragStartHandler);
        item.addEventListener('dragend', dragEndHandler);
        item.addEventListener('dragover', dragOverHandler);
        item.addEventListener('dragleave', dragLeaveHandler);
        item.addEventListener('drop', dropHandler);
    });
}
function dragStartHandler(e) {
    draggedItem = this;
    const iframe = draggedItem.querySelector('iframe');
    if (iframe) {
        placeholder = iframe.cloneNode(true);
        placeholder.style.visibility = 'hidden';
        iframe.style.display = 'none';
        draggedItem.insertBefore(placeholder, iframe);
    }
    
    document.body.style.backgroundColor = "#f5f5f5";
    draggedItem.style.opacity = '0.5';
    draggedItem.style.outline = "4px solid #0095ff";
}

function dragEndHandler(e) {
    if (placeholder) {
        placeholder.remove();
        const iframe = draggedItem.querySelector('iframe');
        if (iframe) {
            iframe.style.display = '';
        }
    }

    draggedItem.style.opacity = '1';
    draggedItem.style.outline = "";
    draggedItem = null;
    document.body.style.backgroundColor = "#ffffff";
    initDragDrop();
}

function dragOverHandler(e) {
    e.preventDefault();
    this.style.outline = "4px solid #0095ff";
}

function dragLeaveHandler(e) {
    this.style.outline = "";
}

function dropHandler(e) {
    if (draggedItem) {
        const draggedIndex = Array.from(document.querySelectorAll('.col-list-item')).indexOf(draggedItem);
        const dropIndex = Array.from(document.querySelectorAll('.col-list-item')).indexOf(this);

        if (draggedIndex < dropIndex) {
            this.parentElement.insertBefore(draggedItem, this.nextSibling);
        } else {
            this.parentElement.insertBefore(draggedItem, this);
        }
        this.style.outline = "";
    }
}
