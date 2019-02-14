(function (global) {



    const formsHolder = document.querySelector('[data-forms-holder]');

    document.addEventListener('click', function (e) {

        if(e.target.classList.contains('form-add')) {
            const newForm = createForm();

            formsHolder.appendChild(newForm);
        }

        if(e.target.classList.contains('form-delete')) {
            deleteForm();
        }

    });

    function createForm() {

        return 3;
    }

    function deleteForm() {

    }




})(window);