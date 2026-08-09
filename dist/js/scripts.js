const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

const iconMenu = document.querySelector('.header-top__burger');
const headerBody = document.querySelector('.header-top__menu');
const catalogBtn = document.querySelector('.header-catalog-btn');
const catalogContainer = document.querySelector('.header-bottom__menu');

function closeAllMenus() {
  document.documentElement.classList.remove("menu-open", "catalog-open");
}

function updateScroll() {
  const isOpen = document.documentElement.classList.contains("menu-open") ||
    document.documentElement.classList.contains("catalog-open");
}

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();

    if (document.documentElement.classList.contains('catalog-open')) {
      document.documentElement.classList.remove('catalog-open');
    }

    document.documentElement.classList.toggle("menu-open");
    updateScroll();
  });
}

if (catalogBtn) {
  catalogBtn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (document.documentElement.classList.contains("menu-open")) {
      document.documentElement.classList.remove("menu-open");
    }

    document.documentElement.classList.toggle('catalog-open');
    updateScroll();
  });
}

document.addEventListener('click', function (e) {
  const isMenuOpen = document.documentElement.classList.contains("menu-open");
  const isCatalogOpen = document.documentElement.classList.contains("catalog-open");

  if (isMenuOpen) {
    const isClickInsideHeaderBody = headerBody && headerBody.contains(e.target);
    const isClickOnMenuIcon = e.target === iconMenu || (iconMenu && iconMenu.contains(e.target));

    if (!isClickInsideHeaderBody && !isClickOnMenuIcon) {
      document.documentElement.classList.remove("menu-open");
      updateScroll();
    }
  }

  if (isCatalogOpen && window.innerWidth <= 1336) {
    const isClickInsideCatalog = catalogContainer && catalogContainer.contains(e.target);
    const isClickOnCatalogBtn = e.target === catalogBtn || (catalogBtn && catalogBtn.contains(e.target));

    if (!isClickInsideCatalog && !isClickOnCatalogBtn) {
      document.documentElement.classList.remove('catalog-open');
      updateScroll();
    }
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 1336) {
    document.body.style.overflow = '';
  } else {
    updateScroll();
  }
});

//========================================================================================================================================================

//Спойлер
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    spollersArray.forEach(spollersBlock => {
      const mediaQuery = spollersBlock.dataset.spollers;
      if (mediaQuery) {
        const [maxWidth, type] = mediaQuery.split(",");
        const width = parseInt(maxWidth);

        if (type === "max" && window.innerWidth <= width) {
          if (!spollersBlock.classList.contains("_spoller-init")) {
            initSpollers([spollersBlock]);
          }
        } else if (type === "max" && window.innerWidth > width) {
          if (spollersBlock.classList.contains("_spoller-init")) {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        }
      }
    });

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);

          initCloseButtons(spollersBlock);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              if (spollerTitle.nextElementSibling) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            if (spollerTitle.nextElementSibling) {
              spollerTitle.nextElementSibling.hidden = false;
            }
          }
        }));
      }
    }

    function initCloseButtons(spollersBlock) {
      const closeButtons = spollersBlock.querySelectorAll('.cabinet-orders-spollers__button');

      closeButtons.forEach(button => {
        button.removeEventListener('click', closeSpollerHandler);
        button.addEventListener('click', closeSpollerHandler);
      });
    }

    function closeSpollerHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      const button = e.currentTarget;
      const spollersBlock = button.closest('[data-spollers]');
      const spollerItem = button.closest('.cabinet-orders-spollers__item');

      if (spollersBlock && spollerItem) {
        const spollerTitle = spollerItem.querySelector('[data-spoller]');

        if (spollerTitle && spollerTitle.classList.contains('_spoller-active')) {
          const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

          spollerTitle.classList.remove('_spoller-active');
          spollerItem.classList.remove('_spoller-active');

          const contentBlock = spollerTitle.nextElementSibling;
          _slideUp(contentBlock, spollerSpeed);
        }
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      const spollerTitle = el.closest("[data-spoller]");
      if (!spollerTitle) return;

      if (el.closest('a') && !spollerTitle.closest('a')) {
        return;
      }

      const spollerItem = spollerTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
      const spollersBlock = spollerTitle.closest("[data-spollers]");

      if (!spollersBlock) return;

      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
          hideSpollersBody(spollersBlock);
        }

        spollerTitle.classList.toggle("_spoller-active");
        if (spollerItem) spollerItem.classList.toggle("_spoller-active");

        const contentBlock = spollerTitle.nextElementSibling;
        if (contentBlock) {
          _slideToggle(contentBlock, spollerSpeed);
        }

        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        const spollerItem = spollerActiveTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");

        spollerActiveTitle.classList.remove("_spoller-active");
        if (spollerItem) spollerItem.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");

            const spollerItem = spollerClose.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
            if (spollerItem) spollerItem.classList.remove("_spoller-active");

            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}

spollers();
window.addEventListener('resize', function () {
  spollers();
});

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      if (targetElement.value.trim()) {
        targetElement.classList.add('filled');
        targetElement.parentElement.classList.add('filled');
      } else {
        targetElement.classList.remove('filled');
        targetElement.parentElement.classList.remove('filled');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });
  document.body.addEventListener("input", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (targetElement.value.trim()) {
        targetElement.classList.add('filled');
        targetElement.parentElement.classList.add('filled');
      } else {
        targetElement.classList.remove('filled');
        targetElement.parentElement.classList.remove('filled');
      }
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});

let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');

        el.classList.remove('_form-success');
        el.parentElement.classList.remove('_form-success');

        el.parentElement.classList.remove('filled');
        el.classList.remove('filled');

        formValidate.removeError(el);

        if (el.classList.contains('telephone') && el.clearFilled) {
          el.clearFilled();
        }
      }

      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
          checkbox.classList.remove('_form-success');
          checkbox.closest('.checkbox')?.classList.remove('_form-success');
        }
      }

      if (modules_flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            modules_flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }
  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert("Помилка");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }
  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));

    const telephoneInputs = form.querySelectorAll('.telephone');
    telephoneInputs.forEach(input => {
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
      }
    });

    setTimeout(() => {
      if (modules_flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? modules_flsModules.popup.open(popup) : null;
      }
    }, 0);

    formValidate.formClean(form);
  }
}
formSubmit();

//========================================================================================================================================================

//Показать еще
function showMore() {
  window.addEventListener("load", function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;
    if (showMoreBlocks.length) {
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
        return !item.dataset.showmoreMedia;
      });
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

      document.addEventListener("click", showMoreActions);
      window.addEventListener("resize", showMoreActions);

      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach(showMoreBlock => {
        initItem(showMoreBlock, matchMedia);
      });
    }
    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
      let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
      showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
      showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, showMoreBlock.classList.contains('_showmore-active') ? getOriginalHeight(showMoreContent) : hiddenHeight);
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore || 'size';

      if (showMoreType === 'items') {
        const itemsToShow = parseInt(showMoreContent.dataset.showmoreContent) || 3;
        const children = Array.from(showMoreContent.children);

        if (children.length === 0) return 0;

        let actualGap = 0;
        if (children.length >= 2) {
          const firstChildRect = children[0].getBoundingClientRect();
          const secondChildRect = children[1].getBoundingClientRect();

          if (firstChildRect.top < secondChildRect.top) {
            const firstBottom = firstChildRect.top + firstChildRect.height;
            actualGap = secondChildRect.top - firstBottom;
          } else if (firstChildRect.left < secondChildRect.left) {
            const firstRight = firstChildRect.left + firstChildRect.width;
            actualGap = secondChildRect.left - firstRight;
          }
        }

        if (actualGap <= 0) {
          const computedStyle = getComputedStyle(showMoreContent);
          actualGap = parseFloat(computedStyle.gap) ||
            parseFloat(computedStyle.rowGap) ||
            parseFloat(computedStyle.columnGap) || 0;
        }

        for (let i = 0; i < Math.min(itemsToShow, children.length); i++) {
          const child = children[i];
          const styles = getComputedStyle(child);
          const marginTop = parseFloat(styles.marginTop) || 0;
          const marginBottom = parseFloat(styles.marginBottom) || 0;
          const marginLeft = parseFloat(styles.marginLeft) || 0;
          const marginRight = parseFloat(styles.marginRight) || 0;

          hiddenHeight += child.offsetHeight + marginTop + marginBottom;

          if (actualGap > 0 && i < Math.min(itemsToShow, children.length) - 1) {
            hiddenHeight += actualGap;
          }
        }

        return Math.max(hiddenHeight, 0);
      } else {
        return parseInt(showMoreContent.dataset.showmoreContent) || 150;
      }
    }

    function getOriginalHeight(showMoreContent) {
      let parentHidden;
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty('height');
      if (showMoreContent.closest(`[hidden]`)) {
        parentHidden = showMoreContent.closest(`[hidden]`);
        parentHidden.hidden = false;
      }
      let originalHeight = showMoreContent.offsetHeight;
      parentHidden ? parentHidden.hidden = true : null;
      showMoreContent.style.height = `${hiddenHeight}px`;
      return originalHeight;
    }
    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;
      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]');
          const showMoreBlock = showMoreButton.closest('[data-showmore]');
          const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
          if (!showMoreContent.classList.contains('_slide')) {
            showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
            showMoreBlock.classList.toggle('_showmore-active');
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
        mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
      }
    }
  });
}
showMore();

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
      document.documentElement.classList.add('header-scroll');
    } else {
      header.classList.remove('_header-scroll');
      document.documentElement.classList.remove('header-scroll');
    }
  });
}

//========================================================================================================================================================

if (document.querySelector('.block-section__slider')) {
  const sectionSwiper = new Swiper('.block-section__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.section-arrow-prev',
      nextEl: '.section-arrow-next',
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1330: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });
}

//========================================================================================================================================================

const favoritesElements = document.querySelectorAll('.favorites');

if (favoritesElements) {
  favoritesElements.forEach(element => {
    element.addEventListener('click', function (e) {
      e.preventDefault();

      this.classList.toggle('active');

      e.stopPropagation();
    });
  });
}

//========================================================================================================================================================

const cards = document.querySelectorAll('.card-product.card-product-size');

if (cards.length) {
  function updateCardHeights() {
    if (window.innerWidth < 993) {
      cards.forEach(function (card) {
        card.style.removeProperty('--bottom-height');
      });
      return;
    }

    const currentCards = document.querySelectorAll('.card-product.card-product-size');

    currentCards.forEach(function (card) {
      const bottom = card.querySelector('.card-product__bottom');
      if (!bottom) return;

      const originalMaxHeight = bottom.style.maxHeight;
      const originalOpacity = bottom.style.opacity;
      const originalPointerEvents = bottom.style.pointerEvents;

      bottom.style.maxHeight = 'none';
      bottom.style.opacity = '1';
      bottom.style.pointerEvents = 'auto';

      const height = bottom.scrollHeight;

      bottom.style.maxHeight = originalMaxHeight || '';
      bottom.style.opacity = originalOpacity || '';
      bottom.style.pointerEvents = originalPointerEvents || '';

      card.style.setProperty('--bottom-height', (height + 13) + 'px');
    });
  }

  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  if (document.readyState === 'complete') {
    setTimeout(updateCardHeights, 100);
  } else {
    window.addEventListener('load', function () {
      setTimeout(updateCardHeights, 100);
    });
  }

  const debouncedUpdate = debounce(updateCardHeights, 250);
  window.addEventListener('resize', debouncedUpdate);

  const observer = new MutationObserver(debouncedUpdate);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
}

//========================================================================================================================================================

function rangeInit() {
  const ratingFilter = document.querySelector('.block-catalog-filter__range');
  if (ratingFilter) {
    noUiSlider.create(ratingFilter, {
      start: [0, 165760],
      connect: true,
      range: {
        'min': [0],
        'max': [600000]
      },
      format: wNumb({
        decimals: 0,
        thousand: ' ',
      })
    });

    const priceStart = document.getElementById('price-start');
    const priceEnd = document.getElementById('price-end');

    priceStart.addEventListener('change', function () {
      ratingFilter.noUiSlider.set([this.value, null]);
    });

    priceEnd.addEventListener('change', function () {
      ratingFilter.noUiSlider.set([null, this.value]);
    });

    ratingFilter.noUiSlider.on('update', function (values, handle) {
      var value = values[handle];
      if (handle) {
        priceEnd.value = value;
      } else {
        priceStart.value = value;
      }
    });
  }
};
rangeInit();

//========================================================================================================================================================

function initDesktopFilter() {
  const filterColumns = document.querySelectorAll('.block-catalog-filter__column');
  const resetButton = document.querySelector('.btn-reset');
  const ratingFilter = document.querySelector('.block-catalog-filter__range');
  const filterColumnsBlock = document.querySelector('.block-catalog-filter__columns');

  const filterTitle = document.querySelector('.block-catalog-filter__title');
  const filterClose = document.querySelector('.block-catalog-filter__close');
  const filterBody = document.querySelector('.block-catalog-filter__body');
  const filterContent = document.querySelector('.block-catalog-filter__content');

  let activeColumnIndex = null;

  function isDesktop() {
    return window.innerWidth >= 1331;
  }

  function isMobile() {
    return window.innerWidth <= 1330;
  }

  function getActiveColumnIndex() {
    let index = null;
    filterColumns.forEach((col, idx) => {
      if (col.classList.contains('active')) {
        index = idx;
      }
    });
    return index;
  }

  function saveCurrentState() {
    activeColumnIndex = getActiveColumnIndex();
    return activeColumnIndex;
  }

  function closeAllColumns() {
    filterColumns.forEach((column) => {
      column.classList.remove('active');
    });
    activeColumnIndex = null;
  }

  function openColumn(index) {
    if (index === null || !filterColumns[index]) return;

    const column = filterColumns[index];

    closeAllColumns();

    column.classList.add('active');
    activeColumnIndex = index;
  }

  function openMobileFilter() {
    if (isMobile()) {
      document.documentElement.classList.add('filter-open');
    }
  }

  function closeMobileFilter() {
    document.documentElement.classList.remove('filter-open');
  }

  function resetSystemSpollers() {
    if (!filterColumnsBlock) return;

    const spollerTitles = filterColumnsBlock.querySelectorAll('[data-spoller]');

    spollerTitles.forEach(title => {
      title.classList.remove('_spoller-active');

      const item = title.closest('.spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item');
      if (item) {
        item.classList.remove('_spoller-active');
      }

      if (title.nextElementSibling) {
        title.nextElementSibling.hidden = false;
        title.nextElementSibling.style.display = '';
        title.nextElementSibling.style.height = '';
        title.nextElementSibling.style.overflow = '';
      }
    });

    if (filterColumnsBlock) {
      filterColumnsBlock.classList.remove('_spoller-init');
    }
  }

  filterColumns.forEach((column, index) => {
    const button = column.querySelector('.block-catalog-filter__button');
    if (!button) return;

    button.addEventListener('click', function (e) {
      if (!isDesktop()) {
        return;
      }

      const parentColumn = this.closest('.block-catalog-filter__column');

      if (parentColumn.classList.contains('active')) {
        parentColumn.classList.remove('active');
        activeColumnIndex = null;
      } else {
        openColumn(index);
      }
    });
  });

  if (filterTitle) {
    filterTitle.addEventListener('click', function (e) {
      if (isMobile()) {
        e.stopPropagation();
        openMobileFilter();
      }
    });
  }

  if (filterClose) {
    filterClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMobileFilter();
    });
  }

  document.addEventListener('click', function (e) {
    if (!isMobile()) return;

    const isClickInsideFilter = filterContent && filterContent.contains(e.target);
    const isClickOnTitle = filterTitle && filterTitle.contains(e.target);

    if (isClickOnTitle) return;
    if (isClickInsideFilter) return;

    closeMobileFilter();
  });

  if (filterBody) {
    filterBody.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  function resetFilter() {
    const allCheckboxes = document.querySelectorAll('.block-catalog-filter__columns input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    const priceStart = document.getElementById('price-start');
    const priceEnd = document.getElementById('price-end');

    if (priceStart) priceStart.value = '0';
    if (priceEnd) priceEnd.value = '165 760';

    if (ratingFilter && ratingFilter.noUiSlider) {
      ratingFilter.noUiSlider.set([0, 165760]);
    }

    closeAllColumns();
  }

  if (resetButton) {
    resetButton.addEventListener('click', resetFilter);
  }

  let isRestoring = false;

  window.addEventListener('resize', function () {
    const isDesktopNow = isDesktop();
    const isMobileNow = isMobile();

    const currentActive = getActiveColumnIndex();

    if (isMobileNow) {
      saveCurrentState();
      closeAllColumns();
    }

    if (isDesktopNow) {
      resetSystemSpollers();

      if (activeColumnIndex !== null && !isRestoring) {
        isRestoring = true;
        setTimeout(() => {
          const currentActive = getActiveColumnIndex();
          if (currentActive === null) {
            openColumn(activeColumnIndex);
          } else if (currentActive !== activeColumnIndex) {
            closeAllColumns();
            setTimeout(() => {
              openColumn(activeColumnIndex);
            }, 50);
          }
          isRestoring = false;
        }, 150);
      }
    }
  });

  window.addEventListener('orientationchange', function () {
    setTimeout(() => {
      const isDesktopNow = isDesktop();

      if (isDesktopNow) {
        resetSystemSpollers();

        if (activeColumnIndex !== null && !isRestoring) {
          isRestoring = true;
          setTimeout(() => {
            const currentActive = getActiveColumnIndex();
            if (currentActive === null) {
              openColumn(activeColumnIndex);
            }
            isRestoring = false;
          }, 200);
        }
      } else {
        saveCurrentState();
        closeAllColumns();
      }
    }, 300);
  });

  if (isDesktop()) {
    resetSystemSpollers();
  }

  closeAllColumns();
  closeMobileFilter();
}

document.addEventListener('DOMContentLoaded', function () {
  initDesktopFilter();
});

//========================================================================================================================================================

//Количество
function formQuantity() {
  document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
      const quantityElement = targetElement.closest('[data-quantity]');
      const valueElement = quantityElement.querySelector('input[type="text"]');
      let value = parseInt(valueElement.value) || 0;

      if (targetElement.closest('[data-quantity-plus]')) {
        value++;
        if (quantityElement.dataset.quantityMax && +quantityElement.dataset.quantityMax < value) {
          value = quantityElement.dataset.quantityMax;
        }
      } else {
        value--;
        if (quantityElement.dataset.quantityMin) {
          if (+quantityElement.dataset.quantityMin > value) {
            value = quantityElement.dataset.quantityMin;
          }
        } else if (value < 1) {
          value = 1;
        }
      }
      valueElement.value = value;
    }
  });
}
formQuantity();