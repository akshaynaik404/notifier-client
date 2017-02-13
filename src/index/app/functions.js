// import $ from 'jQuery';
export let functions = {
  getValue : function (inputSelector, containerSelector) {
    return $(containerSelector).find(inputSelector).val();
  }
};
