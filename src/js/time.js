(function (global) {



    const formsHolder = document.querySelector('[data-forms-holder]');

    document.addEventListener('click', function (e) {

        if(e.target.classList.contains('form-add')) {
            const newForm = createForm();

            formsHolder.appendChild(newForm);
        }

        if(e.target.classList.contains('form-delete')) {
            deleteForm(e.target);
        }

    });

    function createForm() {

        const template = document.querySelector('#form-template'),
            form = document.importNode(template.content, true),
            fragment = document.createDocumentFragment();

        let formNumber = formsHolder.querySelectorAll('.time-form').length;

        form.querySelectorAll('[id], [for]').forEach((item, i) => {
            changeTemplateElementsIds(item, formNumber);
        });

        fragment.appendChild(form);

        return fragment;
    }

    function changeTemplateElementsIds(item, formNumber) {
        const attrId = item.getAttribute('id');
        const attrFor = item.getAttribute('for');

        if(attrId) {
            item.setAttribute('id', attrId + '_' + formNumber);
        }

        if(attrFor) {
            item.setAttribute('for', attrFor + '_' + formNumber );
        }
    }

    function deleteForm(element) {
        const form = element && element.closest('.time-form');
        if(form) {
            form.remove();
        }
    }

    function writeDataToLocalStorage() {

    }

})(window);