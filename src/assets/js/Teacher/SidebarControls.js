export const getLeftValue = (inputLeft, inputRight) => {
  var _this = inputLeft,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
  //console.log("input value "+inputRight.value);

  var percent = ((_this.value - min) / (max - min)) * 100;
  return percent;
};

export const getRightValue = (inputRight, inputLeft) => {
  var _this = inputRight,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  return percent;
};
